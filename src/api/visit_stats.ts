"use server";

import { getEndpointURL } from "./base";

export type VisitStat = {
  id: number;
  date: string;
  page_views: number;
  unique_visitors: number;
  bounce_rate: number;
  avg_session_duration: number;
};

/**
 * Fetch a list of visit stats from the Mockaroo API
 */
export async function getVisitStats(): Promise<VisitStat[]> {
  const data = await fetch(getEndpointURL("visit_stats"), {
    cache: "force-cache",
  });
  return data.json();
}
