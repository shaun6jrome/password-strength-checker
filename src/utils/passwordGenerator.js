/**
 * passwordGenerator.js
 * 
 * Generates cryptographically random passwords with configurable
 * length and character type options.
 * Uses crypto.getRandomValues() for secure randomness.
 */

// ─── Character Pools ────────────────────────────────────────────
const CHAR_POOLS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
};

/**
 * Generates a cryptographically secure random password.
 * 
 * @param {Object} options - Configuration options
 * @param {number} options.length - Desired password length (default: 16)
 * @param {boolean} options.uppercase - Include uppercase letters (default: true)
 * @param {boolean} options.lowercase - Include lowercase letters (default: true)
 * @param {boolean} options.numbers - Include digits (default: true)
 * @param {boolean} options.symbols - Include special characters (default: true)
 * @returns {string} Generated password
 */
export function generatePassword(options = {}) {
  const {
    length = 16,
    uppercase = true,
    lowercase = true,
    numbers = true,
    symbols = true,
  } = options;

  // Build the combined character pool from selected types
  let pool = '';
  if (uppercase) pool += CHAR_POOLS.uppercase;
  if (lowercase) pool += CHAR_POOLS.lowercase;
  if (numbers) pool += CHAR_POOLS.numbers;
  if (symbols) pool += CHAR_POOLS.symbols;

  // Fallback: if nothing selected, use all
  if (pool.length === 0) {
    pool = Object.values(CHAR_POOLS).join('');
  }

  // Generate random bytes and map to characters
  const randomValues = new Uint32Array(length);
  crypto.getRandomValues(randomValues);

  let password = '';
  for (let i = 0; i < length; i++) {
    password += pool[randomValues[i] % pool.length];
  }

  // Ensure at least one character from each selected type is present
  // (shuffle one in from each required pool if missing)
  const requiredPools = [];
  if (uppercase) requiredPools.push(CHAR_POOLS.uppercase);
  if (lowercase) requiredPools.push(CHAR_POOLS.lowercase);
  if (numbers) requiredPools.push(CHAR_POOLS.numbers);
  if (symbols) requiredPools.push(CHAR_POOLS.symbols);

  const chars = password.split('');
  requiredPools.forEach((reqPool, idx) => {
    const hasType = chars.some(ch => reqPool.includes(ch));
    if (!hasType && idx < chars.length) {
      const randByte = new Uint32Array(1);
      crypto.getRandomValues(randByte);
      chars[idx] = reqPool[randByte[0] % reqPool.length];
    }
  });

  return chars.join('');
}
