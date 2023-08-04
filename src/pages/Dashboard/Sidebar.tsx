import {
  Box,
  Center,
  createStyles,
  getStylesRef,
  Navbar,
  ScrollArea,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { FC, ReactElement, useCallback } from "react";
import {
  IconLogout,
  IconUser,
  IconFile,
  IconTower,
} from "@tabler/icons-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "hooks";
import { showNotification } from "@mantine/notifications";
import { useErrorCatcher } from "hooks/useErrorCatcher";
import { IRoutePath } from "types/global";

const links: IRoutePath[] = [
  {
    icon: IconFile,
    label: "Dokumen",
    path: "dokumen",
  },
  {
    icon: IconTower,
    label: "Infrastruktur",
    path: "infrastruktur",
  },
];

const useStyles = createStyles((theme) => {
  // const icon = getRef("icon");
  return {
    navbar: {
      // background: theme.colors.blue[6],
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },

    version: {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background ?? theme.primaryColor,
        0.1
      ),
      color: theme.white,
      fontWeight: 700,
    },

    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md,
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
      background: theme.colors.gray[3],
      height: 65,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color: theme.colorScheme === "dark" ? theme.white : theme.colors.dark[6],
      padding: theme.spacing.sm,
      borderRadius: theme.radius.md,
      // borderTopRightRadius: theme.radius.lg,
      // borderBottomRightRadius: theme.radius.lg,
      fontWeight: 500,
      width: "100%",
      transition: "all .15s ease-in-out",
      [`& .${getStylesRef("icon")}`]: {
        color: theme.colors.dark[6],
      },

      "&:hover": {
        backgroundColor: theme.fn.lighten(theme.colors.pink[5], 0.15),
        // [`& .${icon}`]: {
        //   opacity: 0.9,
        //   color: theme.colors.dark[5],
        // },
        transition: "all .15s ease-in-out",
        color: theme.colors.dark[5],
        [`& .${getStylesRef("icon")}`]: {
          transition: "all .15s ease-in-out",
          color: theme.colors.dark[6],
        },
      },
    },

    linkIcon: {
      ref: getStylesRef("icon"),
      color: theme.white,
      opacity: 0.75,
      marginRight: theme.spacing.sm,
    },

    activeLinkIcon: {
      // ref: icon,
      color: theme.colors.dark[6],
      opacity: 0.75,
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      color: theme.white,
      backgroundColor: theme.fn.lighten(theme.colors.pink[5], 0),
      "&:hover": {
        backgroundColor: theme.fn.lighten(theme.colors.pink[4], 0.25),
        // [`& .${icon}`]: {
        //   opacity: 0.9,
        //   color: theme.colors.dark[5],
        // },
      },
      // [`& .${icon}`]: {
      //   opacity: 0.9,
      //   color: theme.colors.dark[6],
      // },
      [`& .${getStylesRef("icon")}`]: {
        color: theme.white,
      },
    },
    appName: {
      display: "inline-block",
      textAlign: "center",
    },
  };
});

const Sidebar: FC = (): ReactElement => {
  const {
    classes,
    cx,
    theme: { colors, colorScheme },
  } = useStyles();
  const { account, logout } = useAuth();

  const { errorCatcher } = useErrorCatcher();

  const logoutFromDashboard = useCallback(() => {
    logout()
      .then((resp) => {
        console.log(resp);
        showNotification({
          title: "Logout berhasil",
          message: "Berhasil melakukan logout!",
          color: "blue",
        });
      })
      .catch((er) => {
        errorCatcher(er);
      });
  }, [errorCatcher, logout]);

  return (
    <Navbar width={{ sm: 300 }} className={classes.navbar}>
      <Center pt="md" className={classes.header}>
        <Title color="dark" order={3} className={classes.appName}>
          Simataruang
        </Title>
      </Center>
      <Navbar.Section component={ScrollArea} p="xs" grow>
        {links.map((route) => (
          <NavLink
            className={({ isActive }) =>
              cx(classes.link, {
                [classes.linkActive]: isActive,
              })
            }
            key={route.path}
            to={`/dashboard/${route.path}`}
          >
            <route.icon className={classes.linkIcon} stroke={1.5} />
            <span>{route.label}</span>
          </NavLink>
        ))}
      </Navbar.Section>

      <Navbar.Section px="xs" py="md" className={classes.footer}>
        <UnstyledButton className={classes.link}>
          <IconUser className={classes.linkIcon} stroke={1.5} />
          <Box>
            <Title order={4}>{account?.name}</Title>
            <Text color={colorScheme === "dark" ? "white" : colors.dark[6]}>
              {account?.username}
            </Text>
          </Box>
        </UnstyledButton>

        <UnstyledButton onClick={logoutFromDashboard} className={classes.link}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </UnstyledButton>
      </Navbar.Section>
    </Navbar>
  );
};

export default Sidebar;
