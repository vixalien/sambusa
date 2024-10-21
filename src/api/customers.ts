"use server";

export type Customer = {
  id: number;
  name: string;
  email: string;
  signup_date: string;
  last_activity: string;
};

export interface GetCustomersProps {
  page?: number;
  search?: string;
}

export interface CustomersResult {
  customers: Customer[];
  page: number;
  total: number;
  limit: number;
  skip: number;
}

export async function getCustomers(
  { page = 0, search }: GetCustomersProps = {},
): Promise<CustomersResult> {
  // page can only start from 1
  page = Math.max(page, 1);
  const skip = (page - 1) * LIMIT;

  const all_customers = (await import("~/data/customers.json")).default;
  const filtered_customers = filterCustomers(all_customers, search);

  return {
    customers: filtered_customers.slice(skip, skip + LIMIT),
    page,
    total: filtered_customers.length,
    limit: LIMIT,
    skip,
  };
}

function filterCustomers(customers: Customer[], search?: string) {
  if (!search) return customers;

  return customers.filter((customer) => {
    // match name
    return customer.name.toLowerCase().includes(search.toLowerCase()) ||
      // match email
      customer.email.toLowerCase().includes(search.toLowerCase());
  });
}

const LIMIT = 100;

export async function getCustomer(id: number): Promise<Customer | null> {
  if (isNaN(id)) return null;

  const all_customers = (await import("~/data/customers.json")).default;

  return all_customers.find((customer) => customer.id === id) || null;
}
