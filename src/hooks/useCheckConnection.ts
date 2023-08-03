import { ClientContext } from "contexts/ClientContext";
import { useState, useEffect, useContext, useMemo } from "react";

export const useCheckConnection = () => {
  const [connected, toggleConnected] = useState<boolean>(false);
  const [error, toggleError] = useState<boolean>(false);
  const { client, socket } = useContext(ClientContext);

  useEffect(() => {
    if (typeof client !== "undefined" && typeof socket !== "undefined") {
      console.log("main", socket);
      socket.on("connect", () => {
        console.log("connect");
        toggleConnected(true);
        toggleError(false);
      });
      socket.on("connect_error", () => {
        console.log("error");
        // toggleConnected(false);
        toggleError(true);
      });
    }
    return () => {
      if (typeof client !== "undefined" && typeof socket !== "undefined") {
        console.log("cleanup", socket);
        socket.off("connect", () => {
          toggleConnected(true);
          toggleError(false);
        });
        socket.off("connect_error", () => {
          // toggleConnected(false);
          toggleError(true);
        });
      }
    };
  }, [client, socket]);

  return useMemo(() => ({ connected, error }), [error, connected]);
};
