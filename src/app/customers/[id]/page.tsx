import { Metadata } from "next";

import { getCustomer } from "~/api/customers";

import { CustomerPage } from "./customer";
import { NoCustomerPage } from "./no-customer";

export default async function Customer({ params }: { params: { id: string } }) {
  const customer = await getCustomer(Number(params.id));

  if (!customer) return <NoCustomerPage />;

  return <CustomerPage customer={customer} />;
}

export const metadata: Metadata = {
  title: "Customer - Sambusa",
  description: "Sambusa Customer",
};
