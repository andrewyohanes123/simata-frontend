// import FeathersAuth from "@feathersjs/authentication-client";
// import FeathersSocketIOClient from "@feathersjs/socketio-client";
import { Application } from "@feathersjs/feathers";
import feathersJS from "@feathersjs/client";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { DocumentService, FileService, UserService } from "types/global";
// import authentication from "@feathersjs/authentication-client";

const REACT_APP_BASEURL: string = import.meta.env.VITE_APP_BASEURL;

const feathers: Application<ServiceTypes> = feathersJS();
const socket: SocketIOClient.Socket = io(`${REACT_APP_BASEURL}`);

const timeout = 60 * 3 * 1000;
const featherAuth = feathersJS.authentication({
  // jwtStrategy: "local",
  // storage: window.localStorage,
  storageKey: 'accessToken',
});

feathers.configure(feathersJS.socketio(socket, { timeout }));
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
feathers.configure(featherAuth);

export const useClientController = (): ClientControllerResult => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const listener = [() => setIsConnected(true), () => setIsConnected(false)];
    socket.on("connect", listener[0]);
    socket.on("disconnect", listener[1]);
    return () => {
      socket.off("connect", listener[0]);
      socket.off("disconnect", listener[1]);
    };
  }, []);

  return {
    client: feathers,
    socket,

    isConnected,
  };
};

export interface ServiceTypes {
  users: UserService;
  documents: DocumentService;
  files: FileService;
}

export interface ClientControllerResult {
  client: Application<ServiceTypes>;
  socket: SocketIOClient.Socket;

  isConnected: boolean;
}
