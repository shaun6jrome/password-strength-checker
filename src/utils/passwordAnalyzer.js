/**
 * passwordAnalyzer.js
 * 
 * Core password analysis engine.
 * Evaluates passwords using regex-based validation and returns
 * a comprehensive analysis including score, strength level,
 * character statistics, and security recommendations.
 */

// ─── Common Password Patterns ─────────────────────────────────────
// Regex patterns that match commonly used (weak) password patterns
const COMMON_PATTERNS = [
  /^password/i,
  /^123456/,
  /^qwerty/i,
  /^abc123/i,
  /^letmein/i,
  /^welcome/i,
  /^admin/i,
  /^login/i,
  /^master/i,
  /^dragon/i,
  /^monkey/i,
  /^shadow/i,
  /^sunshine/i,
  /^trustno1/i,
  /^iloveyou/i,
  /^football/i,
  /^baseball/i,
  /^access/i,
  /^hello/i,
  /^charlie/i,
  /^(0{4,}|1{4,}|2{4,}|3{4,}|4{4,}|5{4,}|6{4,}|7{4,}|8{4,}|9{4,})/,  // repeated digits
  /^(abcd|efgh|ijkl|mnop|qrst|uvwx)/i,                                   // sequential letters
  /^(1234|2345|3456|4567|5678|6789|7890)/,                                // sequential numbers
];

// ─── Regex Validators ──────────────────────────────────────────────
const VALIDATORS = {
  hasUppercase: /[A-Z]/,
  hasLowercase: /[a-z]/,
  hasNumbers: /[0-9]/,
  hasSpecial: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/,
  hasExcessiveRepetition: /(.)\1{2,}/,  // 3+ same character in a row
};

/**
 * Counts characters matching a given regex pattern in the password.
 * @param {string} password - The password to analyze
 * @param {RegExp} pattern - Regex pattern to match against
 * @returns {number} Count of matching characters
 */
function countMatches(password, pattern) {
  const matches = password.match(new RegExp(pattern.source, 'g'));
  return matches ? matches.length : 0;
}

/**
 * Checks if the password matches any common/weak patterns.
 * @param {string} password - The password to check
 * @returns {boolean} True if password contains a common pattern
 */
function hasCommonPattern(password) {
  return COMMON_PATTERNS.some(pattern => pattern.test(password));
}

/**
 * Calculates the password strength score (0–100).
 * 
 * Scoring breakdown:
 * - Length:     up to 25 points (8+ = 15pts, 12+ = 20pts, 16+ = 25pts)
 * - Uppercase:  up to 15 points
 * - Lowercase:  up to 15 points
 * - Numbers:    up to 15 points
 * - Symbols:    up to 20 points
 * - Bonus:      up to 10 points (diversity + length)
 * - Penalties:  common patterns (-25), excessive repetition (-15)
 * 
 * @param {string} password - The password to score
 * @returns {number} Score between 0 and 100
 */
function calculateScore(password) {
  if (!password) return 0;

  let score = 0;
  const length = password.length;

  // ── Length Score (up to 25 points) ──
  if (length >= 16) score += 25;
  else if (length >= 12) score += 20;
  else if (length >= 8) score += 15;
  else if (length >= 6) score += 8;
  else if (length >= 4) score += 4;

  // ── Character Type Scores ──
  if (VALIDATORS.hasUppercase.test(password)) {
    score += countMatches(password, /[A-Z]/) >= 2 ? 15 : 10;
  }
  if (VALIDATORS.hasLowercase.test(password)) {
    score += countMatches(password, /[a-z]/) >= 2 ? 15 : 10;
  }
  if (VALIDATORS.hasNumbers.test(password)) {
    score += countMatches(password, /[0-9]/) >= 2 ? 15 : 10;
  }
  if (VALIDATORS.hasSpecial.test(password)) {
    score += countMatches(password, /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/) >= 2 ? 20 : 15;
  }

  // ── Bonus Points (up to 10) ──
  const typesUsed = [
    VALIDATORS.hasUppercase.test(password),
    VALIDATORS.hasLowercase.test(password),
    VALIDATORS.hasNumbers.test(password),
    VALIDATORS.hasSpecial.test(password),
  ].filter(Boolean).length;

  if (typesUsed >= 4) score += 5;
  if (length >= 14) score += 5;

  // ── Penalties ──
  if (hasCommonPattern(password)) score -= 25;
  if (VALIDATORS.hasExcessiveRepetition.test(password)) score -= 15;
  if (length < 8) score -= 10;

  // Clamp between 0 and 100
  return Math.max(0, Math.min(100, score));
}

/**
 * Maps a numeric score to a strength label.
 * @param {number} score - Score from 0–100
 * @returns {string} Strength label
 */
function getStrengthLabel(score) {
  if (score >= 90) return 'Very Strong';
  if (score >= 70) return 'Strong';
  if (score >= 50) return 'Good';
  if (score >= 30) return 'Fair';
  return 'Weak';
}

/**
 * Returns the Tailwind color class associated with a strength label.
 * @param {string} label - Strength label
 * @returns {string} CSS color string
 */
function getStrengthColor(label) {
  const colors = {
    'Very Strong': '#39ff14',   // neon green
    'Strong': '#00f0ff',        // neon cyan
    'Good': '#4d7cff',          // neon blue
    'Fair': '#ffaa00',          // amber
    'Weak': '#ff3355',          // red
  };
  return colors[label] || '#ff3355';
}

/**
 * Generates dynamic security recommendations based on current password.
 * @param {string} password - The password to analyze
 * @returns {string[]} Array of recommendation strings
 */
function getRecommendations(password) {
  const recs = [];
  if (!password) return ['Start typing to see recommendations.'];

  if (password.length < 8) {
    recs.push('🔑 Use at least 8 characters for basic security.');
  }
  if (password.length < 12) {
    recs.push('📏 Consider using 12+ characters for stronger protection.');
  }
  if (!VALIDATORS.hasUppercase.test(password)) {
    recs.push('🔠 Add uppercase letters (A–Z) to increase complexity.');
  }
  if (!VALIDATORS.hasLowercase.test(password)) {
    recs.push('🔡 Include lowercase letters (a–z).');
  }
  if (!VALIDATORS.hasNumbers.test(password)) {
    recs.push('🔢 Add numbers (0–9) to diversify character types.');
  }
  if (!VALIDATORS.hasSpecial.test(password)) {
    recs.push('✨ Include special characters (!@#$%^&*) for maximum strength.');
  }
  if (hasCommonPattern(password)) {
    recs.push('⚠️ Avoid common words and predictable patterns.');
  }
  if (VALIDATORS.hasExcessiveRepetition.test(password)) {
    recs.push('🔄 Reduce repeated characters (e.g., "aaa" or "111").');
  }

  if (recs.length === 0) {
    recs.push('✅ Excellent! Your password meets all recommended criteria.');
  }

  return recs;
}

/**
 * Main analysis function — returns a full report for a given password.
 * @param {string} password - The password to analyze
 * @returns {Object} Complete analysis result
 */
export function analyzePassword(password) {
  const score = calculateScore(password);
  const strengthLabel = getStrengthLabel(score);

  return {
    score,
    strengthLabel,
    strengthColor: getStrengthColor(strengthLabel),
    stats: {
      length: password.length,
      uppercase: countMatches(password, /[A-Z]/),
      lowercase: countMatches(password, /[a-z]/),
      numbers: countMatches(password, /[0-9]/),
      symbols: countMatches(password, /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/),
    },
    checks: {
      minLength: password.length >= 8,
      hasUppercase: VALIDATORS.hasUppercase.test(password),
      hasLowercase: VALIDATORS.hasLowercase.test(password),
      hasNumbers: VALIDATORS.hasNumbers.test(password),
      hasSpecial: VALIDATORS.hasSpecial.test(password),
      noCommonPatterns: !hasCommonPattern(password),
      noExcessiveRepetition: !VALIDATORS.hasExcessiveRepetition.test(password),
    },
    recommendations: getRecommendations(password),
  };
}
