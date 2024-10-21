import { PaginationProps } from "@shopify/polaris";

import { CustomersResult } from "~/api/customers";
import { useSearchParam } from "~/utilities/use-search-param";

export function usePaginationProps(
  { limit, page, total, skip, customers: { length } }: CustomersResult,
): PaginationProps {
  const [, setPage] = useSearchParam("page");

  return {
    label: `${skip + 1}-${skip + length} of ${total} customers`,
    hasPrevious: page > 1,
    hasNext: skip + limit < total,
    onPrevious() {
      setPage((page - 1).toString());
    },
    onNext() {
      setPage((page + 1).toString());
    },
  };
}
