import { FC, ReactElement, useCallback, useMemo } from "react";
import {
  ActionIcon,
  Button,
  Center,
  Group,
  Menu,
  SegmentedControl,
  SegmentedControlItem,
  Title,
  createStyles,
} from "@mantine/core";
import FlexContainer from "./atoms/FlexContainer";
import { Link, useSearchParams } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
import { Else, If, Then } from "react-if";
import { IconForms, IconLogin, IconMenu2 } from "@tabler/icons-react";

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
    label: "Infrastruktur",
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
  const isPhoneScreen = useMediaQuery("(max-width: 500px)");

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
      <Title variant="gradient" order={!isPhoneScreen ? 4 : 6}>
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
      <If condition={isPhoneScreen}>
        <Then>
          <Menu zIndex={500} shadow="md" withArrow position="top-end">
            <Menu.Target>
              <ActionIcon>
                <IconMenu2 />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item component={Link} to="/login" icon={<IconLogin />}>
                Login
              </Menu.Item>
              <Menu.Item component={Link} to="/daftar" icon={<IconForms />}>
                Daftar
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Then>
        <Else>
          <Group>
            <Button component={Link} to="/login" variant="outline">
              Login
            </Button>
            <Button
              component={Link}
              to="/daftar"
              variant="outline"
              color="blue"
            >
              Daftar
            </Button>
          </Group>
        </Else>
      </If>
    </FlexContainer>
  );
};

export default Navbar;
