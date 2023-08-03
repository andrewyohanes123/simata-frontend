import { ChangeEvent, FC, ReactElement, useCallback, useMemo } from "react";
import { Box, createStyles, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useSearchParams } from "react-router-dom";

const useStyles = createStyles(() => ({
  container: {
    display: "flex",
    justifyContent: "flex-end",
  },
  searchInput: {
    width: 280,
  },
}));

interface props {
  keyword?: string;
}

const SearchBar: FC<props> = ({ keyword = "name" }): ReactElement => {
  const { classes } = useStyles();
  const [searchParams, setSearchParams] = useSearchParams();

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (value.length === 0) {
        searchParams.delete(keyword);
        setSearchParams(searchParams);
      } else {
        searchParams.set(keyword, value);
        setSearchParams(searchParams);
      }
    },
    [keyword, searchParams, setSearchParams]
  );

  const searchValue = useMemo(
    () => searchParams.get(keyword) ?? "",
    [keyword, searchParams]
  );

  return (
    <Box className={classes.container}>
      <TextInput
        onChange={onChange}
        value={searchValue}
        placeholder={`Cari ${keyword}`}
        icon={<IconSearch />}
        className={classes.searchInput}
      />
    </Box>
  );
};

export default SearchBar;
