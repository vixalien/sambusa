"use client";

import { BlockStack, Page } from "@shopify/polaris";
import { VisitStat } from "~/api/visit_stats";

import { Dashboard } from "~/components/dashboard";
import { VisitGraph } from "~/components/visit-graph";

export function DashboardPage({ visitStats }: { visitStats: VisitStat[] }) {
  return (
    <Page title="Dashboard">
      <BlockStack gap="400">
        <Dashboard visitStats={visitStats} />
        <VisitGraph
          metric="page_views"
          label="Page Views"
          visitStats={visitStats}
        />
        <VisitGraph
          metric="unique_visitors"
          label="Unique Visitors"
          color="red"
          visitStats={visitStats}
        />
      </BlockStack>
    </Page>
  );
}
