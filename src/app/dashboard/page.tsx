"use client";

import { BlockStack, Page } from "@shopify/polaris";

import { Dashboard } from "~/components/dashboard";
import { VisitGraph } from "~/components/visit-graph";

export default function Home() {
  return (
    <Page title="Dashboard">
      <BlockStack gap="400">
        <Dashboard />
        <VisitGraph metric="page_views" label="Page Views" />
        <VisitGraph
          metric="unique_visitors"
          label="Unique Visitors"
          color="red"
        />
      </BlockStack>
    </Page>
  );
}
