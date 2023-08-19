/**
 Copyright (c) 2023 MIW
 */

import React, { lazy } from 'react';
import { ROUTES } from './constant';
const DidManagement = lazy(() => import('@miw/pages/Didmanagement'));
const VcManagemanegement = lazy(() => import('@miw/pages/VcMAnagement'));
const Wallet = lazy(() => import('@miw/pages/Wallet'));
const MyCredentials = lazy(() => import('@miw/pages/MyCredentials'));

const ALL_ROUTES = [
    {
        path: ROUTES.ROOT,
        element: DidManagement,
        key: ROUTES.ROOT,
    },
    {
        path: ROUTES.VC,
        element: VcManagemanegement,
        key: ROUTES.VC,
    },
    {
        path: ROUTES.WALLET,
        element: Wallet,
        key: ROUTES.WALLET,
    },
    {
        path: ROUTES.MY_CREDS,
        element: MyCredentials,
        key: ROUTES.MY_CREDS,
    },
];

export default ALL_ROUTES;
