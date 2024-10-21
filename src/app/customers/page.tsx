import { Metadata } from "next";
import { searchParams } from "next-extra/pathname";

import { getCustomers } from "~/api/customers";

import { CustomersTable } from "./table";

export default async function Home() {
  const params = searchParams()
  const page = Number(params.get("page")) || 0;
  const search = params.get("search") ?? undefined;

  const props = await getCustomers({ page, search });

  return <CustomersTable {...props} />;
}

export const metadata: Metadata = {
  title: "Customers - Sambusa",
  description: "All Sambusa Customers",
};
