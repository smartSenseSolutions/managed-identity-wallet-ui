/**
 Copyright (c) 2023 MIW
 */
import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import useUser from "./hooks/useUser.hook";
import Dashboard from "./pages/Dashboard";
import { ROUTES } from "./utils/constant";
import RedirectToLogin from "./pages/RedirectToLogin";
import { CircularProgress } from "@mui/material";
import { parseToken, setBrowserSession } from "./utils/AuthHelper";
import DidManagement from "./pages/Didmanagement";
import VcManagemanegement from "./pages/VcMAnagement";
import Wallet from "./pages/Wallet";
import MyCredentials from "./pages/MyCredentials";

const AuthApp = () => {
  const auth = useKeycloak();
  const prevLocation = useLocation();
  const {
    dispatch: userDispatch,
    state: { status: userFetchStatus },
  } = useUser();
  const isLoggedIn = auth.keycloak.authenticated;
  const isInitialized = auth.initialized;

  useEffect(() => {
    if (auth.keycloak.token && isLoggedIn === true) {
      setBrowserSession(auth.keycloak.token);
      const entityData = parseToken(auth.keycloak?.token);
      const { BPN, name, given_name, email } = entityData;
      userDispatch({
        type: "FETCHED_SUCCESS",
        payload: {
          email,
          BPN,
          given_name,
          name,
        },
      });
    }
  }, [isLoggedIn]);
  return (
    <section className="appSection">
      {isLoggedIn ? (
        userFetchStatus === "loading" ||
        userFetchStatus === "failure" ||
        userFetchStatus === "init" ? (
          <div className="generalLoadingBar">
            <CircularProgress size="30px" />
          </div>
        ) : (
          <Routes>
            <Route path={ROUTES.ROOT} element={<DidManagement />} />
            {/* <Route path={ROUTES.DID_MGMT} element={<DidManagement />} /> */}
            <Route path={ROUTES.VC} element={<VcManagemanegement />} />
            <Route path={ROUTES.WALLET} element={<Wallet />} />
            <Route path={ROUTES.MY_CREDS} element={<MyCredentials />} />
          </Routes>
        )
      ) : (
        <Routes>
          <Route path="*" element={<RedirectToLogin />} />
        </Routes>
      )}
    </section>
  );
};

export default AuthApp;
