import React, { useEffect, useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { setBrowserSession } from "@miw/utils/AuthHelper";

const RedirectToLogin = () => {
  const auth = useKeycloak();
  const isAuthenticated = auth.initialized && auth.keycloak.authenticated;

  useEffect(() => {
    if (!isAuthenticated) {
      auth.keycloak.init({
        redirectUri: location.origin,
        onLoad: "login-required",
        realm: "IdentityGateway",
        checkLoginIframe: false,
      });
    } else if (auth.keycloak.token) {
      setBrowserSession(auth.keycloak.token);
    }
  }, [isAuthenticated]);
  return <div>Loading...</div>;
};

export default RedirectToLogin;
