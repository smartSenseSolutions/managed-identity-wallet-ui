/**
 Copyright (c) 2023 MIW
 */
import React, { Suspense, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import useUser from './hooks/useUser.hook';
import RedirectToLogin from './pages/RedirectToLogin';
import { parseToken, setBrowserSession } from './utils/AuthHelper';
import ALL_ROUTES from './utils/Routes';
import { ProgressbarComp } from './stories';

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
                type: 'FETCHED_SUCCESS',
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
                userFetchStatus === 'loading' || userFetchStatus === 'failure' || userFetchStatus === 'init' ? (
                    <div className="generalLoadingBar">
                        <CircularProgress size="30px" />
                    </div>
                ) : (
                    <Suspense fallback={<ProgressbarComp sx={{ height: '3px !important' }} />}>
                        <Routes>
                            {ALL_ROUTES.map((route) => {
                                return <Route key={route.path} path={route.path} element={<route.element />} />;
                            })}
                        </Routes>
                    </Suspense>
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
