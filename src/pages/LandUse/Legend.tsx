import { FC, ReactElement } from "react";
import { Box, Button, createStyles } from "@mantine/core";
import { IconMap } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { When } from "react-if";
import { landTypes } from "consts";
import { LegendItem } from "components/atoms";

const useStyles = createStyles((theme) => ({
  container: {
    padding: theme.spacing.sm,
    borderRadius: theme.radius.md,
    position: "absolute",
    zIndex: 300,
    background: theme.fn.rgba(theme.white, 0.75),
    backdropFilter: "blur(10px)",
    right: 10,
    top: 10,
    border: `1px solid ${theme.fn.rgba(theme.colors.gray[0], 0.2)}`,
    boxShadow: theme.shadows.md,
    overflowY: "auto",
    overflowX: "visible",
    maxHeight: "calc(100% - 30px)",
  },
}));

const SearchCoordinate: FC = (): ReactElement => {
  const { classes } = useStyles();
  const [search, { toggle }] = useDisclosure();

  return (
    <Box className={classes.container}>
      <Button
        leftIcon={<IconMap />}
        onClick={toggle}
        color="pink"
        variant="light"
      >
        Lihat legenda peta
      </Button>
      <When condition={search}>
        {landTypes.map((type) => (
          <LegendItem
            color={type[1]}
            label={type[0]}
            key={`${type[0]}-${type[1]}`}
          />
        ))}
      </When>
    </Box>
  );
};

export default SearchCoordinate;
