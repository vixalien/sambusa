"use client";

import { AppFrame } from "~/components/frame";
import { PolarisVizProvider } from "@shopify/polaris-viz";

export function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppFrame>
      <PolarisVizProvider>
        {children}
      </PolarisVizProvider>
    </AppFrame>
  );
}
