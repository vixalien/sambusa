"use client";

import {
  Card,
  FooterHelp,
  IndexTable,
  Page,
  useIndexResourceState,
} from "@shopify/polaris";

import { CustomersResult } from "~/api/customers";

import { usePaginationProps } from "./pagination";
import { CustomersIndexFilters } from "./filters";
import { CustomerRow } from "./row";

export function CustomersTable(
  { customers, ...paginationProps }: CustomersResult,
) {
  const pagination = usePaginationProps({ customers, ...paginationProps });

  const resourceName = {
    singular: "customer",
    plural: "customers",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(customers, {
      resourceIDResolver(resource) {
        return resource.id.toString();
      },
    });

  return (
    <Page title="Customers">
      <Card padding="0">
        <CustomersIndexFilters />
        <IndexTable
          resourceName={resourceName}
          itemCount={customers.length}
          selectedItemsCount={allResourcesSelected
            ? "All"
            : selectedResources.length}
          onSelectionChange={handleSelectionChange}
          headings={[
            { title: "ID", alignment: "end" },
            { title: "Name" },
            { title: "Email" },
            { title: "Signup Date", alignment: "end" },
            { title: "Last Activity", alignment: "end" },
          ]}
          hasZebraStriping
          pagination={pagination}
        >
          {customers.map((customer, index) => {
            return (
              <CustomerRow
                key={customer.id}
                customer={customer}
                index={index}
                selected={selectedResources.includes(customer.id.toString())}
              />
            );
          })}
        </IndexTable>
      </Card>
      <FooterHelp />
    </Page>
  );
}
