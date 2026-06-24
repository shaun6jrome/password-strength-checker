/**
 * entropyCalculator.js
 * 
 * Calculates approximate password entropy using the formula:
 *   Entropy = Length × log₂(Character Set Size)
 * 
 * Also provides a human-readable "resistance level" and
 * a brief security explanation for the calculated entropy.
 */

/**
 * Determines the size of the character set used in the password.
 * Considers: lowercase (26), uppercase (26), digits (10), symbols (~33).
 * 
 * @param {string} password - The password to analyze
 * @returns {number} Total character set size
 */
function getCharacterSetSize(password) {
  let size = 0;

  if (/[a-z]/.test(password)) size += 26;     // lowercase letters
  if (/[A-Z]/.test(password)) size += 26;     // uppercase letters
  if (/[0-9]/.test(password)) size += 10;     // digits
  if (/[^a-zA-Z0-9]/.test(password)) size += 33;  // symbols/special chars

  return size;
}

/**
 * Calculates the entropy of a password in bits.
 * Formula: Entropy = Length × log₂(CharacterSetSize)
 * 
 * @param {string} password - The password to evaluate
 * @returns {number} Entropy value in bits (rounded to 1 decimal)
 */
export function calculateEntropy(password) {
  if (!password || password.length === 0) return 0;

  const charSetSize = getCharacterSetSize(password);
  if (charSetSize === 0) return 0;

  const entropy = password.length * Math.log2(charSetSize);
  return Math.round(entropy * 10) / 10;  // Round to 1 decimal
}

/**
 * Maps an entropy value to a resistance level label.
 * 
 * @param {number} entropy - Entropy in bits
 * @returns {string} Human-readable resistance level
 */
export function getResistanceLevel(entropy) {
  if (entropy >= 128) return 'Military Grade';
  if (entropy >= 80) return 'Very High';
  if (entropy >= 60) return 'High';
  if (entropy >= 40) return 'Moderate';
  if (entropy >= 28) return 'Low';
  return 'Very Low';
}

/**
 * Provides a short security explanation based on entropy.
 * 
 * @param {number} entropy - Entropy in bits
 * @returns {string} Security explanation text
 */
export function getSecurityExplanation(entropy) {
  if (entropy >= 128) {
    return 'Resistant to all known brute-force attacks. Suitable for cryptographic keys.';
  }
  if (entropy >= 80) {
    return 'Extremely resistant to brute-force attacks. Exceeds most security requirements.';
  }
  if (entropy >= 60) {
    return 'Strong against offline attacks. Meets recommended security standards.';
  }
  if (entropy >= 40) {
    return 'Provides basic protection. May be vulnerable to targeted attacks.';
  }
  if (entropy >= 28) {
    return 'Weak against automated attacks. Consider strengthening your password.';
  }
  return 'Highly vulnerable to brute-force attacks. Immediate improvement recommended.';
}

/**
 * Returns the color associated with a resistance level.
 * 
 * @param {string} level - Resistance level label
 * @returns {string} Hex color string
 */
export function getResistanceColor(level) {
  const colors = {
    'Military Grade': '#39ff14',
    'Very High': '#00f0ff',
    'High': '#4d7cff',
    'Moderate': '#ffaa00',
    'Low': '#ff8c00',
    'Very Low': '#ff3355',
  };
  return colors[level] || '#ff3355';
}
