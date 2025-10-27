/**
 * BERT-based Local Analyzer - Orchestrator
 * Routes content to appropriate BERT analyzer (message or URL)
 * ALL rule-based analysis has been replaced with BERT models
 */

import { analyzeMessage } from './message-analyzer';
import { analyzeURL } from './url-analyzer';

export type AnalysisClassification = 'Legitimate' | 'Suspicious' | 'Phishing';

export interface AnalysisResult {
  classification: AnalysisClassification;
  riskScore: number;
  summary: string;
  explanation: string;
  indicators: string[];
}

/**
 * Detect if content is a URL or a message
 * More sophisticated detection than before
 */
const isUrl = (content: string): boolean => {
  // Clean up the content
  const trimmed = content.trim();
  
  // Check for obvious URL patterns
  if (/^https?:\/\//i.test(trimmed)) {
    return true;
  }
  
  // Check for domain-like structure
  if (/^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,}(:[0-9]{1,5})?(\/.*)?$/i.test(trimmed)) {
    return true;
  }
  
  // Try to parse as URL
  try {
    // Add http:// if no protocol
    const testUrl = trimmed.startsWith('http') ? trimmed : `http://${trimmed}`;
    const parsed = new URL(testUrl);
    
    // Must have a valid hostname with at least one dot
    if (parsed.hostname.includes('.') && !trimmed.includes(' ')) {
      // Check if it looks more like a sentence than a URL
      const words = trimmed.split(/\s+/);
      if (words.length > 5) {
        // Too many words, probably a message
        return false;
      }
      return true;
    }
  } catch (_) {
    return false;
  }
  
  return false;
};

/**
 * Main analysis function - Routes to appropriate BERT analyzer
 * NO RULE-BASED ANALYSIS - Pure BERT
 */
export async function analyzeContentLocally(content: string): Promise<AnalysisResult> {
  try {
    // Detect content type
    const contentType = isUrl(content) ? 'url' : 'message';
    
    console.log(`Analyzing as ${contentType} using BERT model...`);
    
    // Route to appropriate BERT analyzer
    if (contentType === 'url') {
      // Use fine-tuned BERT model for URL analysis
      const result = await analyzeURL(content);
      return {
        classification: result.classification,
        riskScore: result.riskScore,
        summary: result.summary,
        explanation: result.explanation,
        indicators: result.indicators,
      };
    } else {
      // Use pre-trained BERT with zero-shot classification for messages
      const result = await analyzeMessage(content);
      return {
        classification: result.classification,
        riskScore: result.riskScore,
        summary: result.summary,
        explanation: result.explanation,
        indicators: result.indicators,
      };
    }
  } catch (error) {
    console.error('BERT analysis failed:', error);
    
    // Return error result
    return {
      classification: 'Suspicious',
      riskScore: 50,
      summary: 'Unable to complete AI analysis',
      explanation: `Our AI models encountered an error: ${error instanceof Error ? error.message : 'Unknown error'}. This could be due to model loading issues or browser compatibility. Please try again, and if the problem persists, ensure you're using a modern browser with JavaScript enabled.`,
      indicators: ['AI analysis temporarily unavailable'],
    };
  }
}
