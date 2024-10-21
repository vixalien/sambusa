import { Metadata } from "next";

import { DashboardPage } from "./dashboard";
import { getVisitStats } from "~/api/visit_stats";

export default async function Home() {
  const visitStats = await getVisitStats();

  return <DashboardPage visitStats={visitStats} />;
}

export const metadata: Metadata = {
  title: "Dashboard - Sambusa",
  description: "Access all your metrics at a glance",
};
