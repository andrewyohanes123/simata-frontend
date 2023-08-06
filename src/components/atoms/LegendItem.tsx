import { Group, Text, createStyles } from "@mantine/core";
import { FC, ReactElement } from "react";

interface props {
  color: string;
  label: string;
}

const useStyles = createStyles((theme, { color }: { color: string }) => ({
  colorDisplay: {
    width: 20,
    height: 20,
    borderRadius: theme.radius.sm,
    background: color,
    border: `1px solid ${theme.fn.darken(color, 0.2)}`,
  },
}));

const LegendItem: FC<props> = ({ label, color }): ReactElement => {
  const { classes } = useStyles({ color });
  return (
    <Group my="xs" spacing="xs">
      <div className={classes.colorDisplay} />
      <Text>{label}</Text>
    </Group>
  );
};

export default LegendItem;
