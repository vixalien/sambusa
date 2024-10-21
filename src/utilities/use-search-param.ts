import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { debounce } from "lodash-es";

/**
 * Bind a search parameter to a given value. This means that as the value
 * changes, the search parameter will be updated directly.
 *
 * This is different to Next.js's `useSearchParams` in that it allows you
 * to change the value of a specific search parameter.
 *
 * Updates to the search parameter will also be debounced
 *
 * @param key The name of the search param to bind
 * @param onUpdate A function that will be executed when the search param
 * is changed
 */
export function useSearchParam(key: string, onUpdate?: () => void) {
  const router = useRouter();
  const params = useSearchParams();

  const [query, setQuery] = useState<string | undefined>(
    params.get(key) ?? undefined,
  );

  const updateSearchParam = useCallback(async (value?: string) => {
    const url = new URL(window.location.href);

    // change the value if it's defined, and delete it otherwise
    if (value) {
      url.searchParams.set(key, value);
    } else {
      url.searchParams.delete(key);
    }

    history.replaceState(null, "", url.href);
    router.push(url.href);

    onUpdate?.();
  }, [key, router, onUpdate]);

  // Debounce updateSearchParam so that it only gets called every 1 second
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUpdateSearchParam = useCallback(
    debounce(updateSearchParam, 250, { leading: true }),
    [],
  );

  const actualUpdateSearchParam = useCallback((value?: string) => {
    setQuery(value);
    return debouncedUpdateSearchParam(value);
  }, [debouncedUpdateSearchParam]);

  return [
    query,
    actualUpdateSearchParam,
  ] as const;
}
