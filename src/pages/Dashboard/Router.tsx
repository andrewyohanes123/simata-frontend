import LoadingPage from "components/LoadingPage";
import { FC, ReactElement, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Users = lazy(() => import("pages/Users"));
const Documents = lazy(() => import("pages/Documents"));

const Router: FC = (): ReactElement => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route path="pengguna" element={<Users />} />
        <Route path="dokumen" element={<Documents />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
