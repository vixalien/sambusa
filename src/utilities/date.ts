import { isAfter, isBefore, subDays } from "date-fns";

import visitStats from "~/data/visit_stats2.json";

/**
 * This function gets the data for the last 30 days
 * @param stats
 */
export function getLastMonthData(stats: typeof visitStats) {
  const today = new Date();

  return stats.filter((stat) => {
    return isAfter(
      stat.date,
      // 30 days ago
      subDays(today, 30),
    ) && isBefore(stat.date, today);
  });
}
