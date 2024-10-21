import { expect, test } from "vitest";

import { VisitStat } from "~/api/visit_stats";
import { getLastMonthData } from "./date";

const stats: VisitStat[] = [
  // this happened earlier this year
  {
    id: 0,
    avg_session_duration: 0,
    bounce_rate: 0,
    date: "01/01/2024",
    page_views: 0,
    unique_visitors: 0,
  },
  // this happened this month
  {
    id: 1,
    avg_session_duration: 1,
    bounce_rate: 1,
    date: "10/01/2024",
    page_views: 1,
    unique_visitors: 1,
  },
  // this happens next year
  {
    id: 2,
    avg_session_duration: 2,
    bounce_rate: 2,
    date: "01/01/2025",
    page_views: 2,
    unique_visitors: 2,
  },
];

test("getLastMonthData", () => {
  expect(getLastMonthData(stats)).toEqual([{
    id: 1,
    avg_session_duration: 1,
    bounce_rate: 1,
    date: "10/01/2024",
    page_views: 1,
    unique_visitors: 1,
  }]);
});
