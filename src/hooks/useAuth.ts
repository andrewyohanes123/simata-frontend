import { useContext } from "react";
import { Auth } from "contexts/AuthContext";
import { AuthControllerResult } from "./useAuthController";

export const useAuth = (): AuthControllerResult => {
  return useContext(Auth);
};
