const formatter = new Intl.NumberFormat("en-UK");

/**
 * Adds the thousand limiter to numbers
 *
 * @example
 * ```ts
 * prettyNumber(10000000);
 * // returns 10,000,000
 * ```
 */
export function prettyNumber(number: number) {
  return formatter.format(number);
}
