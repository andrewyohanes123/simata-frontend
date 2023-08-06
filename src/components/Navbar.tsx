import { FC, ReactElement, useCallback, useMemo } from "react";
import {
  Button,
  Center,
  Group,
  SegmentedControl,
  SegmentedControlItem,
  Title,
  createStyles,
} from "@mantine/core";
import FlexContainer from "./atoms/FlexContainer";
import { useNavigate, useSearchParams } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  container: {
    padding: theme.spacing.sm,
    borderBottom: `1px solid ${theme.colors.gray[1]}`,
  },
  mapSelectorContainer: {
    flex: 1,
  },
}));

const mapSelector: SegmentedControlItem[] = [
  {
    value: "infras",
    label: "Peta Infrastruktur",
  },
  {
    value: "landuse",
    label: "Pola Ruang",
  },
];

const Navbar: FC = (): ReactElement => {
  const { classes, theme } = useStyles();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedMap = useMemo(
    () => searchParams.get("map") ?? "infras",
    [searchParams]
  );
  const navigate = useNavigate();

  const onMapChange = useCallback(
    (value: string) => {
      searchParams.set("map", value);
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );

  return (
    <FlexContainer
      alignItems="center"
      spacing={theme.spacing.sm}
      className={classes.container}
    >
      <Title variant="gradient" order={4}>
        Simataruang
      </Title>
      <Center className={classes.mapSelectorContainer}>
        <SegmentedControl
          onChange={onMapChange}
          defaultValue={selectedMap}
          color="pink"
          data={mapSelector}
        />
      </Center>
      <Group>
        <Button onClick={() => navigate('/login')} variant="outline">Login</Button>
        <Button onClick={() => navigate('/daftar')} variant="outline" color="blue">Daftar</Button>
      </Group>
    </FlexContainer>
  );
};

export default Navbar;
