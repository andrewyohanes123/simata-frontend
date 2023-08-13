import { Badge, Group, Text, createStyles } from "@mantine/core";
import { useSearchWithQueryParam } from "hooks/useSearchWtihQueryParam";
import { FC, ReactElement } from "react";

const useStyles = createStyles((theme) => ({
  wrapper: {
    padding: theme.spacing.sm,
    borderRadius: theme.radius.md,
    position: "absolute",
    zIndex: 10,
    background: theme.fn.rgba(theme.white, 0.75),
    backdropFilter: "blur(10px)",
    top: 82,
    left: 10,
    border: `1px solid ${theme.fn.rgba(theme.colors.gray[0], 0.2)}`,
    boxShadow: theme.shadows.md,
  },
}));

interface props {
  total: number;
}

const InfrasTotal: FC<props> = ({ total }): ReactElement => {
  const { classes } = useStyles();
  const [filter] = useSearchWithQueryParam("filter");

  return (
    <div className={classes.wrapper}>
      <Text>{filter}</Text>
      <Group>
        <Badge size="xl" variant="filled" color="pink">
          {total}
        </Badge>
        <Text fw="bold" size="lg">
          {" "}
          infrastruktur
        </Text>
      </Group>
    </div>
  );
};

export default InfrasTotal;
