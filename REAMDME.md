# React Frontend Project

## Prerequisites

1. Node with version >= v16.16
2. Yarn (Package Manager) >=1.22

## Set Up Keycloak using Docker Compose

1. Clone the repository that contains the Docker Compose file for Keycloak:

2. Navigate to the directory containing the Docker Compose file:

3. Start the Keycloak instance using Docker Compose:

    docker-compose up -d

Configure realms, clients, and users in the Keycloak admin console for your React app.

## Project Setup

1. Clone the repository of your React app (if you haven't already):
   git clone https://github.com/smartSenseSolutions/managed-identity-wallet-ui.git

2. Navigate to the React app directory:
   cd miw

3. Open the `.env.local` file and configure Keycloak settings:
   VITE_API_BASE="http://localhost:8087/"
   VITE_KEYCLOAK_CLIENT_ID="miw_public"
   VITE_AUTH_SERVER="http://localhost:28080/"
   VITE_ROOT_BPN="BPNL000000000000"

4. Build and run the React app:

### Local build & run

    yarn
    yarn build
    yarn start

<!-- ### Local docker build & run & publish

    yarn build:docker
    yarn publish:docker
    yarn start:docker -->

## License

Distributed under the Apache 2.0 License.
See [LICENSE](./LICENSE) for more information.
