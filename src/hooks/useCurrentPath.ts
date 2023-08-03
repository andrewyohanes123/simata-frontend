import { useMemo } from "react";
import { matchRoutes, useLocation } from "react-router-dom";

export const useCurrentPath = () => {
  const location = useLocation();
  const routes = matchRoutes([], location);

  return useMemo(() => routes, [routes]);
};
