"use client";

import {
  Card,
  FooterHelp,
  IndexTable,
  Page,
  Text,
  useIndexResourceState,
} from "@shopify/polaris";
import customersAll from "~/data/customers.json";

const customers = customersAll.slice(0, 100);

export default function Home() {
  return (
    <Page title="Customers">
      <CustomersTable />
    </Page>
  );
}

function CustomersTable() {
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

  const rowMarkup = customers.map(
    (
      { id, email, last_activity, name, signup_date },
      index,
    ) => (
      <IndexTable.Row
        id={id.toString()}
        key={id}
        selected={selectedResources.includes(id.toString())}
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
    ),
  );

  return (
    <>
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
        >
          {rowMarkup}
        </IndexTable>
      </Card>
      <FooterHelp />
    </>
  );
}
