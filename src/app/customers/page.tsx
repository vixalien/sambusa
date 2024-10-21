"use server";

import { searchParams } from "next-extra/pathname";

import { getCustomers } from "~/api/customers";

import { CustomersTable } from "./table";

export default async function Home() {
  const page = Number(searchParams().get("page")) || 0;
  const props = await getCustomers({ page });

  return <CustomersTable {...props} />;
}
