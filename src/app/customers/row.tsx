"use client";

import { IndexTable, Link, Text } from "@shopify/polaris";

import { Customer } from "~/api/customers";

export interface CustomerRowProps {
  customer: Customer;
  index: number;
  selected: boolean;
}

export function CustomerRow(
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
        <Link
          dataPrimaryLink
          url={`/customers/${id}`}
        >
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {name}
          </Text>
        </Link>
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
