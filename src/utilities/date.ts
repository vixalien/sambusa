import { isAfter, isBefore, subDays } from "date-fns";
import { VisitStat } from "~/api/visit_stats";

/**
 * This function gets the data for the last 30 days
 * @param stats
 */
export function getLastMonthData(stats: VisitStat[]) {
  const today = new Date();

  return stats.filter((stat) => {
    return isAfter(
      stat.date,
      // 30 days ago
      subDays(today, 30),
    ) && isBefore(stat.date, today);
  });
}
