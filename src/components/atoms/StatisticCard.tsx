import { FC, ReactElement } from "react";
import { Card, Group, createStyles, Title, Text } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  valueContainer: {
    display: "flex",
    alignItems: "flex-start",
    gap: theme.spacing.xs,
  },
  titleContainer: {
    display: "flex",
    flex: 1,
  },
}));

interface props {
  value?: number | string;
  valueSuffix?: string | number;
  title?: string;
}

const StatisticCard: FC<props> = ({
  value,
  valueSuffix,
  title,
}): ReactElement => {
  const { classes } = useStyles();
  return (
    <Card p="sm" withBorder>
      <Group grow>
        <div className={classes.valueContainer}>
          <Title order={1}>{value}</Title>
          <Text size="sm" color="dimmed">
            {valueSuffix}
          </Text>
        </div>
        <div className={classes.titleContainer}>
          <Title order={4}>{title}</Title>
        </div>
      </Group>
    </Card>
  );
};

export default StatisticCard;
