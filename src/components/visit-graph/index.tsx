import { Bleed, BlockStack, Card, Text } from "@shopify/polaris";
import { Color, DataSeries, LineChart } from "@shopify/polaris-viz";

import { getLastMonthData } from "~/utilities/date";
import { prettyDate, prettyString } from "~/utilities/format";

import visitStats from "~/data/visit_stats2.json";

export interface VisitGraphProps {
  metric: "unique_visitors" | "page_views";
  label: string;
  color?: Color;
}

export function VisitGraph({ metric, label, color }: VisitGraphProps) {
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
