import { LoadingScreen } from "components";
import { useAuth, useCheckConnection } from "hooks";
// import LandUse from "pages/LandUse";
import { FC, ReactElement, Suspense, lazy, useEffect } from "react";
import { Else, If, Then, When } from "react-if";
import { RouterProvider, createHashRouter } from "react-router-dom";

const Dashboard = lazy(() => import("pages/Dashboard"));
const Login = lazy(() => import("pages/Login"));
const Register = lazy(() => import("pages/Register"));
const LandUse = lazy(() => import("pages/Home"));

const router = createHashRouter([
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "daftar",
    element: <Register />,
  },
  {
    // path: "landuse",
    index: true,
    element: <LandUse />,
  },
  {
    path: "dashboard/*",
    element: <Dashboard />,
  },
]);

const App: FC = (): ReactElement => {
  const { connected, error } = useCheckConnection();
  const { reAuthenticate } = useAuth();

  useEffect(() => {
    reAuthenticate();
  }, [reAuthenticate]);

  return (
    <If condition={connected}>
      <Then>
        <Suspense
          fallback={
            <LoadingScreen
              title="Loading Aplikasi"
              description="Harap tunggu sebentar"
            />
          }
        >
          <RouterProvider router={router} />
        </Suspense>
      </Then>
      <Else>
        <When condition={error}>
          <LoadingScreen
            title="Terjadi Kesalahan"
            description="Silakan muat ulang aplikasi"
          />
        </When>
        <When condition={!connected && !error}>
          <LoadingScreen
            title="Menghubungkan aplikasi ke server"
            description="Harap tunggu sebentar"
          />
        </When>
      </Else>
    </If>
  );
};

export default App;
