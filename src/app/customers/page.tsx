"use server";

import { getCustomers } from "~/api/customers";
import { CustomersTable } from "./table";

export default async function Home() {
  const props = await getCustomers({ page: 1 });

  return <CustomersTable {...props} />;
}
