import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import useDebounce from "./useDebounce";

export type useSearchWithQueryParamValue = [
  searchValue: string | null,
  debbouncedValue: string | number | null,
  setSearchValue: (val: string) => void,
  clearSearchValue: () => void
];

export const useSearchWithQueryParam = (
  key: string,
  defaultValue: string | null = null
): useSearchWithQueryParamValue => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = useMemo(() => searchParams.get(key), [key, searchParams]);
  const debouncedValue = useDebounce(searchValue, 350);

  const clearSearchValue = useCallback(() => {
    searchParams.delete(key);
    setSearchParams(searchParams);
  }, [key, searchParams, setSearchParams]);

  const onChange = useCallback(
    (value: string | null) => {
      if (value !== null && value.length > 0) {
        searchParams.set(key, value);
        setSearchParams(searchParams);
      } else {
        clearSearchValue();
      }
    },
    [clearSearchValue, key, searchParams, setSearchParams]
  );

  return useMemo(
    (): useSearchWithQueryParamValue => [
      searchValue ?? defaultValue,
      debouncedValue ?? defaultValue,
      onChange,
      clearSearchValue,
    ],
    [clearSearchValue, debouncedValue, defaultValue, onChange, searchValue]
  );
};
