/**
 * @fileoverview Turkish National ID (TC Kimlik No) Validation Algorithm
 * @module lib/validators/tr-id-validator
 * @description Production-grade TR ID validation with official algorithm
 * @version 1.0.0
 */

/**
 * Validates Turkish National ID (TC Kimlik No) using official algorithm
 *
 * Algorithm:
 * 1. Must be exactly 11 digits
 * 2. First digit cannot be 0
 * 3. Sum of first 10 digits mod 10 = 11th digit
 * 4. (sum of 1st,3rd,5th,7th,9th digits * 7 - sum of 2nd,4th,6th,8th digits) mod 10 = 10th digit
 *
 * @param nationalId - The Turkish National ID to validate
 * @returns True if valid, false otherwise
 *
 * @example
 * ```typescript
 * validateTRNationalId('12345678901') // false - fails checksum
 * validateTRNationalId('11111111110') // true - valid checksum
 * ```
 */
export function validateTRNationalId(nationalId: string | number): boolean {
  // Convert to string and remove any spaces
  const id = String(nationalId).replace(/\s/g, '');

  // Must be exactly 11 digits
  if (!/^\d{11}$/.test(id)) {
    return false;
  }

  // First digit cannot be 0
  if (id[0] === '0') {
    return false;
  }

  const digits = id.split('').map(Number);

  // Calculate 10th digit validation
  // (sum of odd positions * 7 - sum of even positions) mod 10 = 10th digit
  const oddSum = digits[0] + digits[2] + digits[4] + digits[6] + digits[8];
  const evenSum = digits[1] + digits[3] + digits[5] + digits[7];
  const digit10 = ((oddSum * 7) - evenSum) % 10;

  if (digit10 !== digits[9]) {
    return false;
  }

  // Calculate 11th digit validation
  // Sum of first 10 digits mod 10 = 11th digit
  const sum10 = digits.slice(0, 10).reduce((acc, digit) => acc + digit, 0);
  const digit11 = sum10 % 10;

  if (digit11 !== digits[10]) {
    return false;
  }

  return true;
}

/**
 * Formats Turkish National ID with spaces for display
 * @param nationalId - The Turkish National ID
 * @returns Formatted ID (e.g., "123 456 789 01")
 */
export function formatTRNationalId(nationalId: string): string {
  const id = nationalId.replace(/\s/g, '');
  if (id.length !== 11) return nationalId;

  return `${id.slice(0, 3)} ${id.slice(3, 6)} ${id.slice(6, 9)} ${id.slice(9, 11)}`;
}

/**
 * Parses formatted Turkish National ID to plain string
 * @param formattedId - Formatted ID with spaces
 * @returns Plain 11-digit string
 */
export function parseTRNationalId(formattedId: string): string {
  return formattedId.replace(/\s/g, '');
}

/**
 * Generates a valid random Turkish National ID for testing
 * @returns Valid 11-digit Turkish National ID
 */
export function generateRandomTRNationalId(): string {
  // Generate first 9 digits (first cannot be 0)
  const first9 = [
    Math.floor(Math.random() * 9) + 1, // 1-9
    ...Array.from({ length: 8 }, () => Math.floor(Math.random() * 10))
  ];

  // Calculate 10th digit
  const oddSum = first9[0] + first9[2] + first9[4] + first9[6] + first9[8];
  const evenSum = first9[1] + first9[3] + first9[5] + first9[7];
  const digit10 = ((oddSum * 7) - evenSum) % 10;

  // Calculate 11th digit
  const sum10 = [...first9, digit10].reduce((acc, d) => acc + d, 0);
  const digit11 = sum10 % 10;

  return [...first9, digit10, digit11].join('');
}
