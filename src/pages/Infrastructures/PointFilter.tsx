import { FC, ReactElement, useCallback } from "react";
import { Group, Select, Text, createStyles } from "@mantine/core";
import { mapIcons } from "consts";
import { IconFilter } from "@tabler/icons-react";
import { useSearchParams } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  wrapper: {
    padding: theme.spacing.sm,
    borderRadius: theme.radius.md,
    position: "absolute",
    zIndex: 300,
    background: theme.fn.rgba(theme.white, 0.75),
    backdropFilter: "blur(10px)",
    top: 10,
    left: 10,
    border: `1px solid ${theme.fn.rgba(theme.colors.gray[0], 0.2)}`,
    boxShadow: theme.shadows.md,
  },
}));

const pointTypes = mapIcons.map((icon) => icon.name.toUpperCase()).sort();

const PointFilter: FC = (): ReactElement => {
  const [searchParams, setSearchParams] = useSearchParams();

  const onChangeSelect = useCallback(
    (val: string | null) => {
      if (val !== null) {
        searchParams.set("filter", val);
      } else {
        searchParams.delete("filter");
      }
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );

  const { classes } = useStyles();
  return (
    <Group spacing="xs" className={classes.wrapper}>
      <IconFilter />
      <Text>Filter</Text>
      <Select
        zIndex={12}
        data={pointTypes}
        placeholder="Filter"
        searchable
        clearable
        onChange={onChangeSelect}
        value={searchParams.get("filter")}
      />
    </Group>
  );
};

export default PointFilter;
