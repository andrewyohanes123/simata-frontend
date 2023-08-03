import {
  AuthControllerResult,
  useAuthController,
} from "hooks/useAuthController";
import { useClient } from "hooks/useClient";
import { createContext, FC, ReactElement, ReactNode } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const initialContext: any = {
  isLoggedIn: false,
  user: null,
};

export const Auth = createContext<AuthControllerResult>(initialContext);

const AuthProvider: FC<AuthProviderProps> = ({ children }): ReactElement => {
  const { client } = useClient();
  const value = useAuthController({ client });

  return <Auth.Provider value={value}>{children}</Auth.Provider>;
};

export default AuthProvider;

export interface AuthProviderProps {
  children?: ReactNode;
}
