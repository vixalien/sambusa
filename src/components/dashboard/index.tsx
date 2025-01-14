import { BlockStack, Card, InlineGrid, Text } from "@shopify/polaris";

import { VisitStat } from "~/api/visit_stats";
import { getLastMonthData } from "~/utilities/date";
import { prettyNumber } from "~/utilities/format";

export function Dashboard({ visitStats }: { visitStats: VisitStat[] }) {
  const lastMonthStats = getLastMonthData(visitStats);
  const aggregateStats = lastMonthStats
    .reduce((acc, curr) => {
      return {
        total_visitors: acc.total_visitors + curr.unique_visitors,
        avg_bounce_rate: acc.avg_bounce_rate +
          curr.bounce_rate / lastMonthStats.length,
        avg_session_duration: acc.avg_session_duration +
          curr.avg_session_duration / lastMonthStats.length,
      };
    }, { total_visitors: 0, avg_bounce_rate: 0, avg_session_duration: 0 });

  return (
    <InlineGrid columns={{ md: 3 }} gap="400">
      <MetricCard
        title="Total Visitors"
        value={aggregateStats.total_visitors}
      />
      <MetricCard
        title="Average Bounce Rate"
        value={Math.floor(aggregateStats.avg_bounce_rate * 100)}
        units="%"
      />
      <MetricCard
        title="Average Session Duration"
        value={Math.floor(aggregateStats.avg_session_duration)}
        units="min"
        spaceUnits
      />
    </InlineGrid>
  );
}

export interface MetricProps {
  title: string;
  value: number;
  units?: string;
  spaceUnits?: boolean;
}

function MetricCard({ title, value, units, spaceUnits }: MetricProps) {
  return (
    <Card>
      <BlockStack reverseOrder>
        <Text as="h2" variant="bodyMd">
          {title}
        </Text>
        <Text as="span" variant="heading2xl">
          {prettyNumber(value)}
          {spaceUnits ? " " : ""}
          {units ? units : ""}
        </Text>
      </BlockStack>
    </Card>
  );
}
