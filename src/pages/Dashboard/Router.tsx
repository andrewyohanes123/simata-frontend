import LoadingPage from "components/LoadingPage";
import { FC, ReactElement, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Users = lazy(() => import("pages/Users"));
const Documents = lazy(() => import("pages/Documents"));
const Infrastructures = lazy(() => import("pages/Infrastructures"));

const Router: FC = (): ReactElement => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route path="pengguna" element={<Users />} />
        <Route path="dokumen" element={<Documents />} />
        <Route path="infrastruktur" element={<Infrastructures />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
