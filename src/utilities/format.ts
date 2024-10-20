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

/**
 * Formats a number, but ignores other types
 */
export function prettyString(val: unknown) {
  if (Number.isInteger(val)) return prettyNumber(val as number);
  return val as string;
}

/**
 * Converts a date into a legible date month format
 */
export function prettyDate(value: unknown) {
  if (isNaN(new Date(value as number).getTime())) return "";
  return new Date(value as Date).toLocaleString("default", {
    day: "numeric",
    month: "numeric",
  });
}
