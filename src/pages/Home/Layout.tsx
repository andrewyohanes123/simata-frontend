import { createStyles } from "@mantine/core";
import { Navbar } from "components";
import LoadingPage from "components/LoadingPage";
import { FC, ReactElement, useMemo, lazy, Suspense } from "react";
import { When } from "react-if";
import { useSearchParams } from "react-router-dom";

const useStyles = createStyles(() => ({
  wrapper: {
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    position: "relative",
  },
  mapWrapper: {
    position: "relative",
    width: "100%",
    height: "calc(100% - 64.69px)",
  },
}));

const InfrasMap = lazy(() => import("pages/Infrastructures"));
const LandUseMap = lazy(() => import("pages/LandUse"));

const Layout: FC = (): ReactElement => {
  const [searchParams] = useSearchParams();
  const { classes } = useStyles();
  const selectedMap = useMemo(
    () => searchParams.get("map") ?? "infras",
    [searchParams]
  );

  return (
    <div className={classes.wrapper}>
      <Navbar />
      <div className={classes.mapWrapper}>
        <Suspense fallback={<LoadingPage />}>
          <When condition={selectedMap === "infras"}>
            <InfrasMap />
          </When>
          <When condition={selectedMap === "landuse"}>
            <LandUseMap />
          </When>
        </Suspense>
      </div>
    </div>
  );
};

export default Layout;
