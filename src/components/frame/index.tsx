"use client";

import { ReactNode } from "react";
import { AppProvider, Frame } from "@shopify/polaris";

import { AppLink } from "../link-component";
import { AppTopBar } from "./top-bar";

export function AppFrame({ children }: { children: ReactNode }) {
  return (
    <AppProvider i18n={{}} linkComponent={AppLink}>
      <Frame
        topBar={<AppTopBar />}
        logo={{
           
          // topBarSource:
          //   "https://cdn.shopify.com/s/files/1/2376/3301/files/Shopify_Secondary_Inverted.png",
          width: 86,
          url: "/hello",
          accessibilityLabel: "Shopify",
        }}
      >
        {children}
      </Frame>
    </AppProvider>
  );
}
