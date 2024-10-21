"use client";

import { useState } from "react";
import {
  IndexFilters,
  IndexFiltersMode,
  useSetIndexFiltersMode,
} from "@shopify/polaris";
import { useSearchParam } from "~/utilities/use-search-param";

export function CustomersIndexFilters() {
  const { mode, setMode } = useSetIndexFiltersMode(IndexFiltersMode.Filtering);
  const [isLoading, setIsLoading] = useState(false);
  const [, setPage] = useSearchParam("page");
  const [queryValue, setQueryValue] = useSearchParam(
    "search",
    // this function is executed after the search has been updateds
    () => {
      setIsLoading(false);
    },
  );

  async function handleQueryValue(value: string) {
    setIsLoading(true);
    // go to the first page of results after searching
    setPage(undefined);
    setQueryValue(value);
  }

  return (
    <IndexFilters
      mode={mode}
      setMode={setMode}
      filters={[]}
      onClearAll={() => {}}
      queryPlaceholder="Search names and email"
      queryValue={queryValue}
      onQueryChange={handleQueryValue}
      onQueryClear={() => handleQueryValue("")}
      selected={0}
      tabs={[]}
      loading={isLoading}
    />
  );
}
