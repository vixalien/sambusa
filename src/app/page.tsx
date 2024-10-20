"use client";

import { Page } from "@shopify/polaris";

import { Dashboard } from "~/components/dashboard";

export default function Home() {
  return (
    <Page title="Dashboard">
      <Dashboard />
    </Page>
  );
}
