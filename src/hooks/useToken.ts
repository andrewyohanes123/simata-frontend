import { useLocalStorage } from "@mantine/hooks";
import { useMemo } from "react";

export const useAccessToken: () => string = (): string => {
  const [token] = useLocalStorage({ key: "accessToken", defaultValue: "" });

  return useMemo(() => token, [token]);
};