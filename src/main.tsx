/**
 Copyright (c) 2023 MIW
 */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import { ThemeProvider } from "styled-components";
import {
  ThemeProvider as MaterialThemeProvider,
  createTheme,
  StyledEngineProvider,
} from "@mui/material/styles";
import App from "./App";
import { Theme } from "./theme/default";
import { UserContextProvider } from "./contexts/userInfo";
import keycloak from "./utils/keycloak";
import "./index.scss";

const materialUiTheme = createTheme({
  palette: {
    primary: {
      main: Theme.colors.primary,
    },
    secondary: {
      main: Theme.colors.secondary,
    },
    success: {
      main: Theme.colors.success,
    },
    warning: {
      main: Theme.colors.warning,
    },
    error: {
      main: Theme.colors.error,
    },
    text: {
      primary: Theme.colors.fontColorPrimary,
    },
  },
  typography: {
    fontFamily: Theme.fontFamily.primary,
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ReactKeycloakProvider
    authClient={keycloak}
    initOptions={{ checkLoginIframe: false }}
  >
    <StyledEngineProvider injectFirst>
      <MaterialThemeProvider theme={materialUiTheme}>
        <ThemeProvider theme={Theme}>
          <UserContextProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </UserContextProvider>
        </ThemeProvider>
      </MaterialThemeProvider>
    </StyledEngineProvider>
  </ReactKeycloakProvider>
);
