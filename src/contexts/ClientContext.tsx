import { createContext, FC, ReactElement, ReactNode } from "react";
import {
  ClientControllerResult,
  useClientController,
} from "hooks/useClientController";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const initialValues: any = {};

export const ClientContext =
  createContext<ClientControllerResult>(initialValues);

export interface ClientProviderProps {
  children?: ReactNode;
}

const ClientProvider: FC<ClientProviderProps> = ({
  children,
}: ClientProviderProps): ReactElement => {
  const value = useClientController();
  return (
    <ClientContext.Provider value={value}>{children}</ClientContext.Provider>
  );
};

export default ClientProvider;
