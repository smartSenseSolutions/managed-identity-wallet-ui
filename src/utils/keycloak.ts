/**
 Copyright (c) 2023 MIW
 */
import Keycloak from "keycloak-js";

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloak = new Keycloak({
  url: import.meta.env.VITE_AUTH_SERVER,
  realm: "miw_test",
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
});

export default keycloak;
