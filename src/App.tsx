/**
 Copyright (c) 2023 MIW
 */

import { Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { useKeycloak } from "@react-keycloak/web";
import AuthApp from "./AuthApp";
import Appbar from "./stories/components/AppBar";
import { ROUTES } from "./utils/constant";
import "./i18n";
import "./App.scss";
import { useUser } from "./hooks";
import { useTranslation } from "react-i18next";
import "react-toastify/dist/ReactToastify.css";
import { StyledToastContainer } from "./stories/components/Alert/Alert.styled";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    // TODO: need to move this component into stories
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function App() {
  const auth = useKeycloak();
  const { t } = useTranslation();
  const currentLocation = window.location.pathname;
  const navigate = useNavigate();

  const {
    state: { userDetails },
  } = useUser();

  const isKeycloakLoading =
    auth.initialized === undefined || auth.initialized === false;

  const MenuList =
    userDetails?.BPN === import.meta.env?.VITE_ROOT_BPN
      ? [
          {
            tabName: t("TABS.MY_WALLET"),
            tabValue: ROUTES.ROOT,
          },
          {
            tabName: t("TABS.WALLET"),
            tabValue: ROUTES.WALLET,
          },
          {
            tabName: t("TABS.VC_MGMT"),
            tabValue: ROUTES.VC,
          },
          {
            tabName: t("TABS.MY_CREDS"),
            tabValue: ROUTES.MY_CREDS,
          },
        ]
      : [
          {
            tabName: t("TABS.MY_WALLET"),
            tabValue: ROUTES.ROOT,
          },

          {
            tabName: t("TABS.MY_CREDS"),
            tabValue: ROUTES.MY_CREDS,
          },
        ];
  const onTabClick = (e: MouseEvent, item) => {
    if (typeof item.tabValue === "string") {
      navigate(`${item.tabValue}`);
    }
  };
  // const selectedTab = [...MenuList].find((menu) => {
  //   console.log(
  //     currentLocation + "  \ntabValue:",
  //     String(menu.tabValue.split("/")[1])
  //   );
  //   let isFound =
  //     currentLocation.includes(String(menu.tabValue.split("/")[1])) &&
  //     typeof menu.tabValue === "string";
  //   return isFound;
  // })?.tabValue;

  return (
    <Suspense fallback={"loading"}>
      <ErrorBoundary onError={(e) => {}} FallbackComponent={ErrorFallback}>
        {isKeycloakLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <Appbar
              appMenu={MenuList}
              onHeaderItemClick={onTabClick}
              selectedTab={currentLocation}
            />

            <AuthApp />
            <StyledToastContainer
              draggable={false}
              closeButton={false}
              pauseOnFocusLoss
              pauseOnHover
            />
          </>
        )}
      </ErrorBoundary>
    </Suspense>
  );
}

export default App;
