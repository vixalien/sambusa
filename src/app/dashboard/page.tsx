import { Metadata } from "next";

import { DashboardPage } from "./dashboard";

export default function Home() {
  return <DashboardPage />;
}

export const metadata: Metadata = {
  title: "Dashboard - Sambusa",
  description: "Access all your metrics at a glance",
};
