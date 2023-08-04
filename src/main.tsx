import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { MantineProvider, MantineThemeOverride } from "@mantine/core";
import {
  QueryClientProvider,
  QueryClient,
  QueryCache,
  MutationCache,
} from "@tanstack/react-query";
import "./index.css";
import "unfonts.css";
import { ClientProvider, AuthProvider } from "contexts";
import { errorCatch } from "modules/errorCatch.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import "mapbox-gl/dist/mapbox-gl.css";

const theme: MantineThemeOverride = {
  fontFamily: "Barlow, sans-serif",
  components: {
    Text: {
      styles: {
        root: {
          fontWeight: 400,
        },
      },
    },
  },
  primaryColor: "pink",
  primaryShade: 5,
  colors: {
    pink: [
      "#FEE7EF",
      "#FCBBD2",
      "#FA8FB6",
      "#F86399",
      "#F6377C",
      "#F40B60",
      "#C3094C",
      "#920739",
      "#610526",
      "#310213",
    ],
  },
  defaultGradient: { deg: 45, from: "red", to: "pink" },
  defaultRadius: "md",
};

const queryClient = new QueryClient({
  queryCache: new QueryCache({ onError: errorCatch }),
  mutationCache: new MutationCache({ onError: errorCatch }),
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ClientProvider>
        <AuthProvider>
          <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
            <ModalsProvider>
              <Notifications position="top-center" color="green" />
              <App />
            </ModalsProvider>
            <ReactQueryDevtools />
          </MantineProvider>
        </AuthProvider>
      </ClientProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
