/**
 * URL Analyzer with Pattern-Based Heuristic Detection
 * Analyzes URLs using intelligent heuristics based on structural features,
 * suspicious patterns, and common phishing indicators.
 * All analysis happens on-device in the browser.
 */

// Ensure we're in a browser environment
const isBrowser = typeof window !== 'undefined';

/**
 * Feature names from the dataset (111 features)
 */
const FEATURE_NAMES = [
  'qty_dot_url', 'qty_hyphen_url', 'qty_underline_url', 'qty_slash_url',
  'qty_questionmark_url', 'qty_equal_url', 'qty_at_url', 'qty_and_url',
  'qty_exclamation_url', 'qty_space_url', 'qty_tilde_url', 'qty_comma_url',
  'qty_plus_url', 'qty_asterisk_url', 'qty_hashtag_url', 'qty_dollar_url',
  'qty_percent_url', 'qty_tld_url', 'length_url', 'qty_dot_domain',
  'qty_hyphen_domain', 'qty_underline_domain', 'qty_slash_domain',
  'qty_questionmark_domain', 'qty_equal_domain', 'qty_at_domain',
  'qty_and_domain', 'qty_exclamation_domain', 'qty_space_domain',
  'qty_tilde_domain', 'qty_comma_domain', 'qty_plus_domain',
  'qty_asterisk_domain', 'qty_hashtag_domain', 'qty_dollar_domain',
  'qty_percent_domain', 'qty_vowels_domain', 'domain_length',
  'domain_in_ip', 'server_client_domain', 'qty_dot_directory',
  'qty_hyphen_directory', 'qty_underline_directory', 'qty_slash_directory',
  'qty_questionmark_directory', 'qty_equal_directory', 'qty_at_directory',
  'qty_and_directory', 'qty_exclamation_directory', 'qty_space_directory',
  'qty_tilde_directory', 'qty_comma_directory', 'qty_plus_directory',
  'qty_asterisk_directory', 'qty_hashtag_directory', 'qty_dollar_directory',
  'qty_percent_directory', 'directory_length', 'qty_dot_file',
  'qty_hyphen_file', 'qty_underline_file', 'qty_slash_file',
  'qty_questionmark_file', 'qty_equal_file', 'qty_at_file',
  'qty_and_file', 'qty_exclamation_file', 'qty_space_file',
  'qty_tilde_file', 'qty_comma_file', 'qty_plus_file',
  'qty_asterisk_file', 'qty_hashtag_file', 'qty_dollar_file',
  'qty_percent_file', 'file_length', 'qty_dot_params',
  'qty_hyphen_params', 'qty_underline_params', 'qty_slash_params',
  'qty_questionmark_params', 'qty_equal_params', 'qty_at_params',
  'qty_and_params', 'qty_exclamation_params', 'qty_space_params',
  'qty_tilde_params', 'qty_comma_params', 'qty_plus_params',
  'qty_asterisk_params', 'qty_hashtag_params', 'qty_dollar_params',
  'qty_percent_params', 'params_length', 'tld_present_params',
  'qty_params', 'email_in_url', 'time_response', 'domain_spf',
  'asn_ip', 'time_domain_activation', 'time_domain_expiration',
  'qty_ip_resolved', 'qty_nameservers', 'qty_mx_servers',
  'ttl_hostname', 'tls_ssl_certificate', 'qty_redirects',
  'url_google_index', 'domain_google_index', 'url_shortened'
];

/**
 * Parse URL and extract all 111 features for pattern analysis
 */
function extractURLFeatures(url: string): number[] {
  const features: number[] = new Array(111).fill(0);
  
  try {
    const urlObj = new URL(url.startsWith('http') ? url : `http://${url}`);
    
    // Remove protocol for feature extraction (dataset doesn't include protocol)
    const urlWithoutProtocol = url.replace(/^https?:\/\//, '');
    
    // Helper function to count character occurrences
    const countChar = (str: string, char: string) => (str.match(new RegExp(`\\${char}`, 'g')) || []).length;
    const countChars = (str: string, chars: string[]) => 
      chars.reduce((sum, char) => sum + countChar(str, char), 0);
    
    // URL-level features (0-18) - use URL without protocol
    features[0] = countChar(urlWithoutProtocol, '.');
    features[1] = countChar(urlWithoutProtocol, '-');
    features[2] = countChar(urlWithoutProtocol, '_');
    features[3] = countChar(urlWithoutProtocol, '/');
    features[4] = countChar(urlWithoutProtocol, '?');
    features[5] = countChar(urlWithoutProtocol, '=');
    features[6] = countChar(urlWithoutProtocol, '@');
    features[7] = countChar(urlWithoutProtocol, '&');
    features[8] = countChar(urlWithoutProtocol, '!');
    features[9] = countChar(urlWithoutProtocol, ' ');
    features[10] = countChar(urlWithoutProtocol, '~');
    features[11] = countChar(urlWithoutProtocol, ',');
    features[12] = countChar(urlWithoutProtocol, '+');
    features[13] = countChar(urlWithoutProtocol, '*');
    features[14] = countChar(urlWithoutProtocol, '#');
    features[15] = countChar(urlWithoutProtocol, '$');
    features[16] = countChar(urlWithoutProtocol, '%');
    features[17] = (urlWithoutProtocol.match(/\.[a-z]{2,}/gi) || []).length; // TLD count
    features[18] = urlWithoutProtocol.length;
    
    // Domain-level features (19-38)
    const hostname = urlObj.hostname;
    features[19] = countChar(hostname, '.');
    features[20] = countChar(hostname, '-');
    features[21] = countChar(hostname, '_');
    features[22] = 0; // slashes in domain (should be 0)
    features[23] = 0; // question marks in domain
    features[24] = 0; // equals in domain
    features[25] = 0; // @ in domain
    features[26] = 0; // & in domain
    features[27] = 0; // ! in domain
    features[28] = 0; // spaces in domain
    features[29] = 0; // ~ in domain
    features[30] = 0; // , in domain
    features[31] = 0; // + in domain
    features[32] = 0; // * in domain
    features[33] = 0; // # in domain
    features[34] = 0; // $ in domain
    features[35] = 0; // % in domain
    features[36] = (hostname.match(/[aeiou]/gi) || []).length; // vowels
    features[37] = hostname.length;
    features[38] = /^\d+\.\d+\.\d+\.\d+$/.test(hostname) ? 1 : 0; // IP address
    features[39] = 0; // server_client_domain (complex to determine)
    
    // Directory features (40-57)
    const pathname = urlObj.pathname;
    const directory = pathname.substring(0, pathname.lastIndexOf('/'));
    features[40] = countChar(directory, '.');
    features[41] = countChar(directory, '-');
    features[42] = countChar(directory, '_');
    features[43] = countChar(directory, '/');
    features[44] = countChar(directory, '?');
    features[45] = countChar(directory, '=');
    features[46] = countChar(directory, '@');
    features[47] = countChar(directory, '&');
    features[48] = countChar(directory, '!');
    features[49] = countChar(directory, ' ');
    features[50] = countChar(directory, '~');
    features[51] = countChar(directory, ',');
    features[52] = countChar(directory, '+');
    features[53] = countChar(directory, '*');
    features[54] = countChar(directory, '#');
    features[55] = countChar(directory, '$');
    features[56] = countChar(directory, '%');
    features[57] = directory.length;
    
    // File features (58-75)
    const filename = pathname.substring(pathname.lastIndexOf('/') + 1);
    features[58] = countChar(filename, '.');
    features[59] = countChar(filename, '-');
    features[60] = countChar(filename, '_');
    features[61] = 0; // slashes in filename
    features[62] = countChar(filename, '?');
    features[63] = countChar(filename, '=');
    features[64] = countChar(filename, '@');
    features[65] = countChar(filename, '&');
    features[66] = countChar(filename, '!');
    features[67] = countChar(filename, ' ');
    features[68] = countChar(filename, '~');
    features[69] = countChar(filename, ',');
    features[70] = countChar(filename, '+');
    features[71] = countChar(filename, '*');
    features[72] = countChar(filename, '#');
    features[73] = countChar(filename, '$');
    features[74] = countChar(filename, '%');
    features[75] = filename.length;
    
    // Parameters features (76-95)
    const params = urlObj.search;
    features[76] = countChar(params, '.');
    features[77] = countChar(params, '-');
    features[78] = countChar(params, '_');
    features[79] = countChar(params, '/');
    features[80] = countChar(params, '?');
    features[81] = countChar(params, '=');
    features[82] = countChar(params, '@');
    features[83] = countChar(params, '&');
    features[84] = countChar(params, '!');
    features[85] = countChar(params, ' ');
    features[86] = countChar(params, '~');
    features[87] = countChar(params, ',');
    features[88] = countChar(params, '+');
    features[89] = countChar(params, '*');
    features[90] = countChar(params, '#');
    features[91] = countChar(params, '$');
    features[92] = countChar(params, '%');
    features[93] = params.length;
    features[94] = /\.(com|org|net|edu)/i.test(params) ? 1 : 0; // TLD in params
    features[95] = urlObj.searchParams.size;
    
    // Additional features (96-110) - use neutral defaults for unavailable features
    // For heuristic analysis, these won't significantly impact the pattern detection
    features[96] = /@/.test(url) ? 1 : 0; // email in URL
    features[97] = 0; // time_response (not available in browser)
    features[98] = 0; // domain_spf (not available)
    features[99] = 0; // asn_ip (not available)
    features[100] = 0; // time_domain_activation (not available)
    features[101] = 0; // time_domain_expiration (not available)
    features[102] = 0; // qty_ip_resolved (not available)
    features[103] = 0; // qty_nameservers (not available)
    features[104] = 0; // qty_mx_servers (not available)
    features[105] = 0; // ttl_hostname (not available)
    features[106] = url.startsWith('https://') ? 1 : 0; // TLS/SSL
    features[107] = 0; // qty_redirects (not available)
    features[108] = 0; // url_google_index (not available)
    features[109] = 0; // domain_google_index (not available)
    features[110] = /(bit\.ly|tinyurl|t\.co)/i.test(url) ? 1 : 0; // URL shortened
    
  } catch (error) {
    console.error('Error extracting URL features:', error);
  }
  
  return features;
}

/**
 * Normalize features using the scaler parameters from training
 * Note: These values should be populated from the saved scaler after training
 */
/**
 * Generate explanation based on URL features and heuristic analysis
 */
function generateURLExplanation(
  url: string,
  features: number[],
  isPhishing: boolean,
  confidence: number
): { explanation: string; indicators: string[] } {
  const indicators: string[] = [];
  
  try {
    const urlObj = new URL(url.startsWith('http') ? url : `http://${url}`);
    const lowerUrl = url.toLowerCase();
    
    // Check for IP address
    if (features[38] === 1) {
      indicators.push(`IP address detected: The URL uses ${urlObj.hostname} instead of a domain name, which is highly suspicious`);
    }
    
    // Check for URL shortener
    if (features[110] === 1 || ['bit.ly', 'tinyurl', 'goo.gl', 't.co', 'ow.ly'].some(s => url.includes(s))) {
      indicators.push(`URL shortener detected: This service hides the true destination, commonly used in phishing`);
    }
    
    // Check for no HTTPS
    if (!url.startsWith('https://')) {
      indicators.push(`No HTTPS encryption: The connection is not secure and vulnerable to interception`);
    }
    
    // Check for excessive hyphens
    if (features[1] > 3 || features[20] > 2) {
      const hyphenCount = Math.max(features[1], features[20]);
      indicators.push(`Excessive hyphens detected (${hyphenCount}): Often used to mimic legitimate brand names`);
    }
    
    // Check for excessive subdomains
    if (features[19] > 3) {
      indicators.push(`Multiple subdomains (${features[19]} dots in domain): May indicate subdomain abuse or spoofing`);
    }
    
    // Check for @ symbol (phishing technique)
    if (features[6] > 0) {
      indicators.push(`URL obfuscation detected: Contains '@' symbol which can hide the true destination`);
    }
    
    // Check URL length
    if (features[18] > 150) {
      indicators.push(`Unusually long URL (${features[18]} characters): Common in phishing to hide malicious parameters`);
    } else if (features[18] > 100) {
      indicators.push(`Long URL (${features[18]} characters): May contain excessive tracking or malicious parameters`);
    }
    
    // Check for suspicious TLDs
    const suspiciousTLDs = ['.tk', '.ml', '.ga', '.cf', '.gq', '.pw', '.cc', '.xyz', '.top', '.work', '.zip', '.review', '.link', '.buzz'];
    const foundTLD = suspiciousTLDs.find(tld => lowerUrl.includes(tld));
    if (foundTLD) {
      indicators.push(`Suspicious domain extension: ${foundTLD} is commonly associated with phishing and malicious sites`);
    }
    
    // Check for suspicious keywords
    const suspiciousKeywords = ['login', 'verify', 'secure', 'account', 'update', 'confirm', 'banking', 'paypal', 'signin'];
    const foundKeywords = suspiciousKeywords.filter(keyword => lowerUrl.includes(keyword));
    if (foundKeywords.length >= 2) {
      indicators.push(`Suspicious keywords detected: "${foundKeywords.join('", "')}" - commonly used in phishing URLs`);
    }
    
    // Check for port numbers
    const portMatch = url.match(/:\d{2,5}\//);
    if (portMatch) {
      indicators.push(`Non-standard port detected: ${portMatch[0].slice(1, -1)} - unusual for legitimate websites`);
    }
    
    // Check for extremely long domain names
    const domainParts = urlObj.hostname.split('.');
    const mainDomain = domainParts[domainParts.length - 2];
    if (mainDomain && mainDomain.length > 30) {
      indicators.push(`Extremely long domain name (${mainDomain.length} characters): "${mainDomain}" - likely random character spam`);
    } else if (mainDomain && mainDomain.length > 20) {
      indicators.push(`Very long domain name (${mainDomain.length} characters): "${mainDomain}" - uncommon for legitimate sites`);
    }
    
    // Check for random-looking domain (low vowel ratio)
    if (mainDomain && mainDomain.length > 10) {
      const vowels = (mainDomain.match(/[aeiou]/gi) || []).length;
      const vowelRatio = vowels / mainDomain.length;
      
      if (vowelRatio < 0.15) {
        indicators.push(`Random character pattern detected: Domain has very few vowels (${(vowelRatio * 100).toFixed(0)}%) - typical of auto-generated phishing domains`);
      } else if (vowelRatio < 0.20) {
        indicators.push(`Unusual character pattern: Domain has low vowel count (${(vowelRatio * 100).toFixed(0)}%) - may be randomly generated`);
      }
    }
    
  } catch (error) {
    console.error('Error generating URL explanation:', error);
  }
  
  let explanation = '';
  if (isPhishing) {
    explanation = `This URL has been classified as phishing with ${(confidence * 100).toFixed(1)}% confidence based on pattern analysis of multiple security indicators. `;
    if (indicators.length > 0) {
      explanation += `\n\nKey concerns identified:\n`;
      indicators.forEach((ind, idx) => {
        explanation += `${idx + 1}. ${ind}\n`;
      });
    } else {
      explanation += `The URL's structural patterns closely match known phishing characteristics.`;
    }
  } else {
    explanation = `This URL appears legitimate with ${(confidence * 100).toFixed(1)}% confidence based on security pattern analysis. `;
    if (indicators.length > 0) {
      explanation += `\n\nHowever, note these observations:\n`;
      indicators.forEach((ind, idx) => {
        explanation += `${idx + 1}. ${ind}\n`;
      });
      explanation += `\nDespite these flags, the overall pattern suggests legitimacy. Always verify URLs through official channels.`;
    } else {
      explanation += `The URL structure matches typical patterns of legitimate websites.`;
    }
  }
  
  return { explanation, indicators };
}

/**
 * Main analysis function for URL content
 */
export async function analyzeURL(url: string): Promise<{
  riskScore: number;
  classification: 'Legitimate' | 'Suspicious' | 'Phishing';
  summary: string;
  explanation: string;
  indicators: string[];
  confidence: number;
}> {
  if (!isBrowser) {
    throw new Error('URL analysis requires browser environment');
  }

  try {
    // Extract features
    const features = extractURLFeatures(url);
    
    let riskScore: number;
    let confidence: number;
    let isPhishing: boolean;
    
    // Use feature-based heuristic scoring for pattern analysis
    let suspicionPoints = 0;
    const maxPoints = 25;
      
      // Check for IP address in domain (very high risk)
      if (features[38] === 1) suspicionPoints += 8;
      
      // Check for no HTTPS (moderate risk)
      if (!url.startsWith('https://')) suspicionPoints += 3;
      
      // Check for excessive hyphens in domain (common in phishing)
      if (features[20] >= 4) suspicionPoints += 6;
      else if (features[20] >= 3) suspicionPoints += 4;
      else if (features[20] >= 2) suspicionPoints += 2;
      
      // Check for excessive dots in domain (subdomain abuse)
      if (features[19] >= 5) suspicionPoints += 4;
      else if (features[19] >= 3) suspicionPoints += 2;
      
      // Check for @ symbol (URL obfuscation - very suspicious)
      if (features[6] > 0) suspicionPoints += 8;
      
      // Check for suspicious TLDs (commonly used for phishing)
      const suspiciousTlds = ['.tk', '.ml', '.ga', '.cf', '.gq', '.pw', '.cc', '.xyz', '.top', '.work'];
      if (suspiciousTlds.some(tld => url.toLowerCase().includes(tld))) suspicionPoints += 6;
      
      // Check for URL shorteners (moderate risk)
      const urlShorteners = ['bit.ly', 'tinyurl', 'goo.gl', 't.co', 'ow.ly', 'short.link'];
      if (urlShorteners.some(short => url.includes(short))) suspicionPoints += 4;
      
      // Check for very long URLs (common in phishing)
      if (features[18] > 150) suspicionPoints += 3;
      else if (features[18] > 100) suspicionPoints += 2;
      
      // Check for excessive special characters
      const specialCharCount = features[4] + features[5] + features[8] + features[10];
      if (specialCharCount > 8) suspicionPoints += 3;
      else if (specialCharCount > 5) suspicionPoints += 2;
      
      // Check for suspicious keywords in URL
      const suspiciousKeywords = ['login', 'verify', 'secure', 'account', 'update', 'confirm', 'banking', 'paypal', 'signin'];
      const lowerUrl = url.toLowerCase();
      const keywordMatches = suspiciousKeywords.filter(keyword => lowerUrl.includes(keyword)).length;
      if (keywordMatches >= 3) suspicionPoints += 5;
      else if (keywordMatches >= 2) suspicionPoints += 3;
      else if (keywordMatches >= 1) suspicionPoints += 1;
      
      // Check for port numbers (unusual and suspicious)
      if (url.match(/:\d{2,5}\//)) suspicionPoints += 2;
      
      // Check for extremely long domain names (random character spam)
      try {
        const urlObj = new URL(url.startsWith('http') ? url : `http://${url}`);
        const domainParts = urlObj.hostname.split('.');
        const mainDomain = domainParts[domainParts.length - 2]; // Get domain before TLD
        if (mainDomain && mainDomain.length > 30) {
          suspicionPoints += 5;
        } else if (mainDomain && mainDomain.length > 20) {
          suspicionPoints += 3;
        }
        
        // Check for random-looking domain (low vowel ratio indicates random chars)
        if (mainDomain) {
          const vowels = (mainDomain.match(/[aeiou]/gi) || []).length;
          const consonants = mainDomain.length - vowels;
          const vowelRatio = vowels / mainDomain.length;
          
          // Normal domains have 30-50% vowels, random spam has much less
          if (vowelRatio < 0.15 && mainDomain.length > 15) {
            suspicionPoints += 4;
          } else if (vowelRatio < 0.20 && mainDomain.length > 10) {
            suspicionPoints += 2;
          }
        }
      } catch (e) {
        // Invalid URL, already suspicious
      }
      
      riskScore = Math.min((suspicionPoints / maxPoints) * 100, 100);
      isPhishing = suspicionPoints >= maxPoints * 0.5;
      
      // Calculate dynamic confidence based on how many indicators were found
      const indicatorStrength = Math.min(suspicionPoints / maxPoints, 1);
      if (indicatorStrength > 0.7) {
        confidence = 0.85 + (indicatorStrength - 0.7) * 0.5; // 85-100%
      } else if (indicatorStrength > 0.4) {
        confidence = 0.70 + (indicatorStrength - 0.4) * 0.5; // 70-85%
      } else if (indicatorStrength > 0.2) {
        confidence = 0.60 + (indicatorStrength - 0.2) * 0.5; // 60-70%
      } else {
        confidence = 0.75 + (1 - indicatorStrength) * 0.2; // 75-95% for clean URLs
      }
      confidence = Math.min(Math.max(confidence, 0.6), 0.99);
    
    // Generate explanation
    const { explanation, indicators } = generateURLExplanation(
      url,
      features,
      isPhishing,
      confidence
    );
    
    // Determine classification
    let classification: 'Legitimate' | 'Suspicious' | 'Phishing';
    if (riskScore < 30) {
      classification = 'Legitimate';
    } else if (riskScore < 55) {
      classification = 'Suspicious';
    } else {
      classification = 'Phishing';
    }
    
    const summary =
      classification === 'Legitimate'
        ? `This URL appears to be safe based on our pattern analysis of its structural features.`
        : classification === 'Suspicious'
        ? `This URL shows some concerning characteristics and should be approached with caution.`
        : `This URL is very likely malicious and should be avoided.`;
    
    return {
      riskScore: Math.round(riskScore),
      classification,
      summary,
      explanation,
      indicators,
      confidence,
    };
  } catch (error) {
    console.error('URL analysis failed:', error);
    throw new Error('Failed to analyze URL. Please ensure the URL is valid.');
  }
}

/**
 * Preload the URL model for better performance
 */
/**
 * Preload function kept for compatibility (no-op for heuristic analysis)
 */
export async function preloadURLModel(): Promise<void> {
  // Heuristic analysis doesn't require preloading
  return Promise.resolve();
}
