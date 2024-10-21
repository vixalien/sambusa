export type Customer = {
  id: number;
  name: string;
  email: string;
  signup_date: string;
  last_activity: string;
};

export interface PagePaginationProps {
  page?: number;
}

export interface CustomersResult {
  customers: Customer[];
  page: number;
  total: number;
  limit: number;
  skip: number;
}

export async function getCustomers({ page = 0 }: PagePaginationProps = {}) {
  "use server";

  const all_customers = (await import("~/data/customers.json")).default;
  const skip = Math.max(page - 1, 0) * LIMIT;

  return {
    customers: all_customers.slice(skip, skip + LIMIT),
    page,
    total: all_customers.length,
    limit: LIMIT,
    skip,
  };
}

const LIMIT = 100;
