"use client";

import { ReactNode, useState } from "react";
import { AppProvider, Frame } from "@shopify/polaris";

import { AppLink } from "../link-component";
import { AppTopBar } from "./top-bar";
import { AppNavigation } from "./navigation";

export function AppFrame({ children }: { children: ReactNode }) {
  const [showNavigation, setShowNavigation] = useState(false);
  const toggleNavigation = () => setShowNavigation((show) => !show);
  const dismissNavigation = () => setShowNavigation(false);

  return (
    <AppProvider i18n={{}} linkComponent={AppLink}>
      <Frame
        topBar={<AppTopBar onNavigationToggle={toggleNavigation} />}
        logo={{
          topBarSource:
            "/images/android-chrome-192x192.png",
          width: 86,
          url: "/",
          accessibilityLabel: "Sambusa",
        }}
        navigation={<AppNavigation />}
        showMobileNavigation={showNavigation}
        onNavigationDismiss={dismissNavigation}
      >
        {children}
      </Frame>
    </AppProvider>
  );
}
