/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, ReactElement } from "react";
import { AppShell, Styles } from "@mantine/core";
import Sidebar from "./Sidebar";
import Router from "./Router";
import { useAuth } from "hooks";
import { Navigate } from "react-router-dom";

const dashboardStyles: Styles<"body" | "main" | "root", Record<string, any>> = {
  main: {
    paddingTop: 0,
    paddingRight: 0,
    paddingLeft: 300,
  },
};

const Layout: FC = (): ReactElement => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) return <Navigate to="/" />;

  return (
    <AppShell styles={dashboardStyles} navbar={<Sidebar />}>
      <Router />
    </AppShell>
  );
};

export default Layout;
