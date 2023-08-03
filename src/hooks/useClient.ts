import { useContext } from "react";
import { ClientContext } from "../contexts/ClientContext";
import { ClientControllerResult } from "./useClientController";

export const useClient = (): ClientControllerResult => {
  return useContext(ClientContext);
};
