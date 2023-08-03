import { FC, ReactElement } from "react";
import { Box, createStyles, Text } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  detailItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
    border: `1px solid ${
      theme.colors.gray[theme.colorScheme === "dark" ? 8 : 3]
    }`,
    borderRadius: theme.radius.md,
  },
}));

interface props {
  title: string;
  value?: string | number;
}

const DetailItem: FC<props> = ({ title, value }): ReactElement => {
  const { classes } = useStyles();
  return (
    <Box className={classes.detailItem}>
      <Box>
        <Text>{title}</Text>
      </Box>
      <Box>
        <Text weight="bold">{value}</Text>
      </Box>
    </Box>
  );
};

export default DetailItem;
