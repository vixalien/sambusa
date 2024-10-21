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

export async function getCustomers({ page = 0 }: PagePaginationProps = {}) {
  "use server";

  const all_customers = (await import("~/data/customers.json")).default;

  return {
    customers: all_customers.slice(page * LIMIT, (page + 1) * LIMIT),
    page,
    total: all_customers.length,
    limit: LIMIT,
  };
}

const LIMIT = 100;
