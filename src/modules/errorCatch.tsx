/* eslint-disable @typescript-eslint/no-explicit-any */
import { showNotification } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import { FeathersError } from "types/global";

export const errorCatch = (error: FeathersError | any) => {
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
};
