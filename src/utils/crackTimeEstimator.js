/**
 * crackTimeEstimator.js
 * 
 * Estimates the time required to brute-force a password
 * based on its entropy. Assumes a modern GPU-based attack
 * at ~10 billion guesses/second (bcrypt-adjusted rate).
 */

// Assumed attack speed: 10 billion (10^10) guesses per second
// This represents a well-funded attacker with multiple GPUs
const GUESSES_PER_SECOND = 1e10;

/**
 * Estimates the time to crack a password via brute force.
 * 
 * @param {number} entropy - Password entropy in bits
 * @returns {Object} { seconds, display, color, icon }
 */
export function estimateCrackTime(entropy) {
  if (entropy <= 0) {
    return {
      seconds: 0,
      display: '—',
      color: '#6b7280',
    };
  }

  // Total possible combinations = 2^entropy
  // Average crack time = combinations / (2 * guesses_per_second)
  // The /2 accounts for average case (finding it halfway through)
  const combinations = Math.pow(2, entropy);
  const seconds = combinations / (2 * GUESSES_PER_SECOND);

  return {
    seconds,
    display: formatDuration(seconds),
    color: getCrackTimeColor(seconds),
  };
}

/**
 * Formats a duration in seconds into a human-readable string.
 * 
 * @param {number} seconds - Duration in seconds
 * @returns {string} Formatted duration string
 */
function formatDuration(seconds) {
  if (seconds < 0.001) return 'Instantly';
  if (seconds < 1) return 'Less than a second';
  if (seconds < 60) return `${Math.round(seconds)} seconds`;

  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.round(minutes)} minutes`;

  const hours = minutes / 60;
  if (hours < 24) return `${Math.round(hours)} hours`;

  const days = hours / 24;
  if (days < 30) return `${Math.round(days)} days`;

  const months = days / 30.44;
  if (months < 12) return `${Math.round(months)} months`;

  const years = days / 365.25;
  if (years < 1000) return `${Math.round(years)} years`;
  if (years < 1e6) return `${(years / 1000).toFixed(1)}K years`;
  if (years < 1e9) return `${(years / 1e6).toFixed(1)}M years`;
  if (years < 1e12) return `${(years / 1e9).toFixed(1)}B years`;
  if (years < 1e15) return `${(years / 1e12).toFixed(1)}T years`;

  return '∞ (heat death of universe)';
}

/**
 * Returns a color based on how long it takes to crack.
 * 
 * @param {number} seconds - Duration in seconds
 * @returns {string} Hex color string
 */
function getCrackTimeColor(seconds) {
  const years = seconds / (365.25 * 24 * 3600);
  if (years >= 1e6) return '#34d399';    // emerald
  if (years >= 1000) return '#60a5fa';   // blue
  if (years >= 1) return '#a78bfa';      // violet
  if (seconds >= 3600) return '#fbbf24'; // amber
  return '#f87171';                       // red
}


