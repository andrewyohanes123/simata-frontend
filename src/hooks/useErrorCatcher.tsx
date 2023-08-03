import { useMemo, useCallback } from "react";
import { showNotification } from "@mantine/notifications";
import { FeathersError } from "types/global";
import { IconX } from "@tabler/icons-react";

export const useErrorCatcher = () => {
  const errorCatcher = useCallback((error: FeathersError | any) => {
    if ("code" in error) {
      if (error.code === 401) {
        showNotification({
          title: "Login Failed",
          message: "Please check your username or password",
          icon: <IconX size={18} />,
          color: "red",
        });
      } else {
        showNotification({
          title: "Something went wrong!",
          message: error.message ?? error.error,
          icon: <IconX size={18} />,
          color: "red",
        });
      }
    } else {
      if ("error" in error) {
        showNotification({
          title: "Something went wrong!",
          message: error.error,
          icon: <IconX size={18} />,
          color: "red",
        });
      } else {
        showNotification({
          title: "Something went wrong!",
          message: error.toString(),
          icon: <IconX size={18} />,
          color: "red",
        });
      }
    }
  }, []);

  return useMemo(() => ({ errorCatcher }), [errorCatcher]);
};
