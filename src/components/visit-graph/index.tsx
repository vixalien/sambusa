import { Bleed, BlockStack, Card, Text } from "@shopify/polaris";
import { Color, DataSeries, LineChart } from "@shopify/polaris-viz";

import visitStats from "~/data/visit_stats2.json";
import { prettyMonthDate, prettyString } from "~/utilities/format";

export interface VisitGraphProps {
  metric: "unique_visitors" | "page_views";
  label: string;
  color?: Color;
}

export function VisitGraph({ metric, label, color }: VisitGraphProps) {
  const data = groupVisitStatsByMonth(visitStats)
    // now we convert the above data into a format understandable by the
    // `LineChart` component
    .reduce((acc, curr) => {
      const data = acc[0];
      return [{
        ...data,
        data: [
          ...data.data,
          { key: curr.date.toString(), value: curr[metric] },
        ],
      }];
    }, [
      { name: label, data: [], color },
    ] as DataSeries[]);

  return (
    <Card>
      <BlockStack gap="400">
        <Text as="h2" variant="headingLg">
          {label}
        </Text>
        <Bleed marginInline="400">
          <LineChart
            data={data}
            xAxisOptions={{ labelFormatter: prettyMonthDate }}
            yAxisOptions={{ labelFormatter: prettyString }}
            tooltipOptions={{
              valueFormatter: prettyString,
              titleFormatter: prettyMonthDate,
            }}
          />
        </Bleed>
      </BlockStack>
    </Card>
  );
}

/**
 * This function groups the given stats by month and year. Meaning it will
 * return the aggregate of all stats for each month of a year.
 * @param stats
 */
function groupVisitStatsByMonth(stats: typeof visitStats) {
  return stats
    // group the data by month
    .reduce((acc, curr) => {
      // find if there's already data with the item's month
      const item = acc.find((item) => {
        const currDate = new Date(curr.date);
        return currDate.getFullYear() == item.date.getFullYear() &&
          currDate.getMonth() == item.date.getMonth();
      });

      if (item) {
        // if there is, add the page_views and unique_visitors
        item.page_views += curr.page_views;
        item.unique_visitors += curr.unique_visitors;
      } else {
        // otherwise add a new record, containing the initial page_views and
        // unique_visitors
        acc.push({
          date: new Date(curr.date),
          page_views: curr.page_views,
          unique_visitors: curr.unique_visitors,
        });
      }
      return acc;
    }, [] as { date: Date; page_views: number; unique_visitors: number }[]);
}
