/**
 * Get the API endpoint for the given resource
 */
export function getEndpointURL(schema: "customers" | "visit_stats") {
  const schema_id = schema === "customers"
    ? process.env.MOCKAROO_SCHEMA_CUSTOMERS
    : process.env.MOCKAROO_SCHEMA_VISIT_STATS;

  return `https://api.mockaroo.com/api/${schema_id}?count=1000&key=${process.env.MOCKAROO_API_KEY}`;
}
