import { Bleed, BlockStack, Card, Text } from "@shopify/polaris";
import { Color, DataSeries, LineChart } from "@shopify/polaris-viz";

import { VisitStat } from "~/api/visit_stats";
import { getLastMonthData } from "~/utilities/date";
import { prettyDate, prettyString } from "~/utilities/format";

export interface VisitGraphProps {
  metric: "unique_visitors" | "page_views";
  label: string;
  color?: Color;
  visitStats: VisitStat[];
}

export function VisitGraph(
  { metric, label, color, visitStats }: VisitGraphProps,
) {
  const data = getLastMonthData(visitStats)
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
          {label} (last 30 days)
        </Text>
        <Bleed marginInline="400">
          <LineChart
            data={data}
            xAxisOptions={{ labelFormatter: prettyDate }}
            yAxisOptions={{ labelFormatter: prettyString }}
            tooltipOptions={{
              valueFormatter: prettyString,
              titleFormatter: prettyDate,
            }}
          />
        </Bleed>
      </BlockStack>
    </Card>
  );
}
