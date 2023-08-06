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
  const currentLocation = window.location.pathname;
  const navigate = useNavigate();

  const {
    state: { userDetails },
  } = useUser();

  const isKeycloakLoading =
    auth.initialized === undefined || auth.initialized === false;

  const MenuList = [
    {
      tabName: "DID management",
      tabValue: ROUTES.DID_MGMT,
    },
    {
      tabName: "VC management",
      tabValue: ROUTES.VC,
    },
    {
      tabName: "wallet",
      tabValue: ROUTES.WALLET,
    },
  ];
  const onTabClick = (e: MouseEvent, item) => {
    if (typeof item.tabValue === "string") {
      navigate(`${item.tabValue}`);
    }
  };
  const selectedTab = MenuList.filter((menu) => {
    let isFound =
      currentLocation.includes(String(menu.tabValue)) &&
      typeof menu.tabValue === "string";
    return isFound;
  })?.[0]?.tabValue;
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
              selectedTab={selectedTab}
            />

            <AuthApp />
          </>
        )}
      </ErrorBoundary>
    </Suspense>
  );
}

export default App;