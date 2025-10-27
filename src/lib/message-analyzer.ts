/**
 * BERT-based Message Analyzer
 * Uses pre-trained transformer models for phishing detection
 * All analysis happens on-device in the browser
 */

import { pipeline, env } from '@xenova/transformers';

// Configure transformers to use browser-only backend
if (typeof window !== 'undefined') {
  env.allowLocalModels = false;
  env.useBrowserCache = true;
}

// Ensure we're in a browser environment
const isBrowser = typeof window !== 'undefined';

// Cache the loaded models
let classificationPipeline: any = null;
let sentimentPipeline: any = null;

/**
 * Load the zero-shot classification model
 * Uses facebook/bart-large-mnli for zero-shot classification
 */
async function loadClassificationModel() {
  if (!isBrowser) {
    throw new Error('BERT models can only run in browser environment');
  }

  if (classificationPipeline) {
    return classificationPipeline;
  }

  try {
    console.log('Loading BERT classification model...');
    // Use a smaller, faster model for classification
    classificationPipeline = await pipeline(
      'zero-shot-classification',
      'Xenova/distilbert-base-uncased-mnli'
    );
    console.log('Classification model loaded successfully');
    return classificationPipeline;
  } catch (error) {
    console.error('Failed to load classification model:', error);
    throw error;
  }
}

/**
 * Load the sentiment analysis model for additional context
 */
async function loadSentimentModel() {
  if (!isBrowser) {
    throw new Error('BERT models can only run in browser environment');
  }

  if (sentimentPipeline) {
    return sentimentPipeline;
  }

  try {
    console.log('Loading sentiment analysis model...');
    sentimentPipeline = await pipeline(
      'sentiment-analysis',
      'Xenova/distilbert-base-uncased-finetuned-sst-2-english'
    );
    console.log('Sentiment model loaded successfully');
    return sentimentPipeline;
  } catch (error) {
    console.error('Failed to load sentiment model:', error);
    throw error;
  }
}

/**
 * Analyze message content using BERT zero-shot classification
 */
async function classifyMessage(content: string): Promise<{
  isPhishing: boolean;
  confidence: number;
  category: string;
}> {
  const classifier = await loadClassificationModel();

  // Define phishing-related categories for classification
  const candidateLabels = [
    'phishing scam attempting to steal personal information',
    'urgent security threat requiring immediate action',
    'fraudulent prize or lottery winning notification',
    'legitimate business communication',
    'normal personal message',
    'official company notification'
  ];

  const result = await classifier(content, candidateLabels, {
    multi_label: false,
  });

  // Extract the top prediction
  const topLabel = result.labels[0];
  const topScore = result.scores[0];

  // Determine if it's phishing based on the category
  const phishingCategories = [
    'phishing scam attempting to steal personal information',
    'urgent security threat requiring immediate action',
    'fraudulent prize or lottery winning notification'
  ];

  const isPhishing = phishingCategories.includes(topLabel);

  return {
    isPhishing,
    confidence: topScore,
    category: topLabel,
  };
}

/**
 * Analyze sentiment to detect urgency and manipulation tactics
 */
async function analyzeSentiment(content: string): Promise<{
  label: string;
  score: number;
}> {
  try {
    const sentiment = await loadSentimentModel();
    const result = await sentiment(content);
    
    return {
      label: result[0].label,
      score: result[0].score,
    };
  } catch (error) {
    console.warn('Sentiment analysis failed:', error);
    return { label: 'NEUTRAL', score: 0.5 };
  }
}

/**
 * Extract key phrases that influenced the classification
 * This provides explainability by identifying suspicious patterns
 */
function extractSuspiciousPatterns(content: string): string[] {
  const patterns: string[] = [];
  const lowerContent = content.toLowerCase();

  // Split into sentences for analysis
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);

  // Analyze each sentence
  sentences.forEach(sentence => {
    const lower = sentence.toLowerCase().trim();
    
    // Check for urgency indicators
    if (/urgent|immediately|now|asap|hurry|quickly|limited time|act fast/i.test(lower)) {
      patterns.push(`Urgent language detected: "${sentence.trim()}"`);
    }

    // Check for requests for personal information
    if (/verify|confirm|update|provide|send|enter.*?(password|account|card|bank|ssn|details|information)/i.test(lower)) {
      patterns.push(`Request for sensitive information: "${sentence.trim()}"`);
    }

    // Check for prize/reward schemes
    if (/(won|winner|congratulations|prize|reward|claim|selected|chosen).*?(money|cash|gift|free|\$|₹|rs)/i.test(lower)) {
      patterns.push(`Suspicious prize/reward claim: "${sentence.trim()}"`);
    }

    // Check for threats or warnings
    if (/(suspend|lock|close|block|terminate|expire|cancelled).*?(account|access|service)/i.test(lower)) {
      patterns.push(`Threatening language: "${sentence.trim()}"`);
    }

    // Check for impersonation
    if (/official|legitimate|authorized|verified|trusted.*?(company|bank|service|organization)/i.test(lower)) {
      patterns.push(`Possible impersonation attempt: "${sentence.trim()}"`);
    }
  });

  // Check for suspicious URLs
  const urlPattern = /https?:\/\/[^\s]+/gi;
  const urls = content.match(urlPattern);
  if (urls) {
    urls.forEach(url => {
      // Check for suspicious URL characteristics
      if (/bit\.ly|tinyurl|t\.co/i.test(url)) {
        patterns.push(`URL shortener detected: "${url}"`);
      }
      if (/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(url)) {
        patterns.push(`IP address in URL: "${url}"`);
      }
      if ((url.match(/-/g) || []).length > 3) {
        patterns.push(`Suspicious URL structure: "${url}"`);
      }
    });
  }

  return patterns;
}

/**
 * Generate human-readable explanation based on BERT analysis
 */
function generateExplanation(
  classification: { isPhishing: boolean; confidence: number; category: string },
  sentiment: { label: string; score: number },
  patterns: string[]
): string {
  let explanation = '';

  if (classification.isPhishing) {
    explanation = `This message has been classified as "${classification.category}" with ${(classification.confidence * 100).toFixed(1)}% confidence. `;
    
    if (patterns.length > 0) {
      explanation += `Our BERT model identified the following concerning elements:\n\n`;
      patterns.forEach((pattern, index) => {
        explanation += `${index + 1}. ${pattern}\n`;
      });
    } else {
      explanation += `The language patterns and structure strongly resemble known phishing attempts, even without obvious red flags.`;
    }

    if (sentiment.label === 'NEGATIVE' && sentiment.score > 0.7) {
      explanation += `\nThe message also uses negative emotional language (${(sentiment.score * 100).toFixed(1)}% confidence) which is a common manipulation tactic.`;
    }
  } else {
    explanation = `This message appears to be "${classification.category}" with ${(classification.confidence * 100).toFixed(1)}% confidence. `;
    
    if (patterns.length > 0) {
      explanation += `While some elements were flagged for caution:\n\n`;
      patterns.forEach((pattern, index) => {
        explanation += `${index + 1}. ${pattern}\n`;
      });
      explanation += `\nThe overall context suggests this is likely legitimate. However, always verify unexpected messages through official channels.`;
    } else {
      explanation += `The message doesn't exhibit typical phishing characteristics, but always exercise caution with unsolicited communications.`;
    }
  }

  return explanation;
}

/**
 * Main analysis function for message content
 * Returns comprehensive analysis with on-device generated explanations
 */
export async function analyzeMessage(content: string): Promise<{
  riskScore: number;
  classification: 'Legitimate' | 'Suspicious' | 'Phishing';
  summary: string;
  explanation: string;
  indicators: string[];
  confidence: number;
}> {
  if (!isBrowser) {
    throw new Error('Message analysis requires browser environment');
  }

  try {
    // Run parallel analysis
    const [classification, sentiment] = await Promise.all([
      classifyMessage(content),
      analyzeSentiment(content),
    ]);

    // Extract patterns for explainability
    const patterns = extractSuspiciousPatterns(content);

    // Calculate risk score (0-100)
    let riskScore = 0;
    if (classification.isPhishing) {
      // Base risk from classification confidence
      riskScore = classification.confidence * 80;
      
      // Add risk based on number of suspicious patterns
      riskScore += Math.min(patterns.length * 5, 20);
      
      // Boost risk if negative sentiment is detected
      if (sentiment.label === 'NEGATIVE' && sentiment.score > 0.7) {
        riskScore += 10;
      }
    } else {
      // Low risk for legitimate messages, but account for any patterns
      riskScore = (1 - classification.confidence) * 30 + patterns.length * 3;
    }

    riskScore = Math.min(Math.max(riskScore, 0), 100);

    // Determine classification level
    let classificationLevel: 'Legitimate' | 'Suspicious' | 'Phishing';
    if (riskScore < 30) {
      classificationLevel = 'Legitimate';
    } else if (riskScore < 60) {
      classificationLevel = 'Suspicious';
    } else {
      classificationLevel = 'Phishing';
    }

    // Generate summary
    const summary = 
      classificationLevel === 'Legitimate' 
        ? 'This message appears to be safe based on advanced AI analysis.'
        : classificationLevel === 'Suspicious'
        ? 'This message shows some warning signs and should be treated with caution.'
        : 'This message is very likely a phishing attempt and should be avoided.';

    // Generate detailed explanation
    const explanation = generateExplanation(classification, sentiment, patterns);

    return {
      riskScore: Math.round(riskScore),
      classification: classificationLevel,
      summary,
      explanation,
      indicators: patterns,
      confidence: classification.confidence,
    };
  } catch (error) {
    console.error('BERT message analysis failed:', error);
    throw new Error('Failed to analyze message with BERT model. Please try again.');
  }
}

/**
 * Preload models for better performance
 */
export async function preloadModels(): Promise<void> {
  if (!isBrowser) return;
  
  try {
    await Promise.all([
      loadClassificationModel(),
      loadSentimentModel(),
    ]);
    console.log('All BERT models preloaded successfully');
  } catch (error) {
    console.error('Failed to preload models:', error);
  }
}

/**
 * Check if models are available
 */
export async function isModelsAvailable(): Promise<boolean> {
  if (!isBrowser) return false;
  
  try {
    await loadClassificationModel();
    return true;
  } catch {
    return false;
  }
}
