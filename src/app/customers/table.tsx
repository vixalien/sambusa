"use client";

import {
  Card,
  FooterHelp,
  IndexTable,
  Page,
  PaginationProps,
  Text,
  useIndexResourceState,
} from "@shopify/polaris";

import { Customer } from "~/api/customers";

export interface CustomersTableProps {
  customers: Customer[];
  total: number;
  page: number;
  limit: number;
}

export function CustomersTable(
  { customers, ...paginationProps }: CustomersTableProps,
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

function usePaginationProps(
  { limit, page, total, customers: { length } }: CustomersTableProps,
): PaginationProps {
  const skip = page * limit;
  return {
    label: `${skip + 1}-${(page + 1) * limit} of ${total} customers`,
    hasPrevious: skip != 0,
    hasNext: length * page <= total,
  };
}

export interface CustomerRowProps {
  customer: Customer;
  index: number;
  selected: boolean;
}

function CustomerRow(
  {
    customer: { id, email, last_activity, name, signup_date },
    selected,
    index,
  }: CustomerRowProps,
) {
  return (
    <IndexTable.Row
      id={id.toString()}
      selected={selected}
      position={index}
    >
      <IndexTable.Cell>
        <Text as="span" alignment="end" numeric>
          {id}
        </Text>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Text variant="bodyMd" fontWeight="bold" as="span">
          {name}
        </Text>
      </IndexTable.Cell>
      <IndexTable.Cell>{email}</IndexTable.Cell>
      <IndexTable.Cell>
        <Text as="span" alignment="end" numeric>
          {signup_date}
        </Text>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Text as="span" alignment="end" numeric>
          {last_activity}
        </Text>
      </IndexTable.Cell>
    </IndexTable.Row>
  );
}