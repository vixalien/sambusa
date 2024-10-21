"use client";

import { BlockStack, Card, Page, Text } from "@shopify/polaris";
import { Customer } from "~/api/customers";

export interface CustomerPageProps {
  customer: Customer;
}

export function CustomerPage({ customer }: CustomerPageProps) {
  return (
    <Page
      title="Customer"
      backAction={{ content: "All Customers", url: "/customers" }}
      secondaryActions={[
        { content: "Edit" },
        {
          content: "Delete",
          destructive: true,
        },
      ]}
    >
      <Card roundedAbove="sm">
        <BlockStack gap="400">
          <CustomerInformation title="ID" value={customer.id.toString()} />
          <CustomerInformation title="Name" value={customer.name} isTitle />
          <CustomerInformation title="Email" value={customer.email} />
          <CustomerInformation
            title="Last Activity"
            value={customer.last_activity}
          />
          <CustomerInformation
            title="Signup Date"
            value={customer.signup_date}
          />
        </BlockStack>
      </Card>
    </Page>
  );
}

export interface CustomerInformationProps {
  title: string;
  value: string;
  isTitle?: boolean;
}

function CustomerInformation(
  { title, value: subtitle, isTitle }: CustomerInformationProps,
) {
  return (
    <BlockStack gap="200">
      <Text
        as="h2"
        variant="headingSm"
        fontWeight={isTitle ? undefined : "medium"}
      >
        {title}
      </Text>
      <Text as="p" variant="bodyMd">
        {subtitle}
      </Text>
    </BlockStack>
  );
}
