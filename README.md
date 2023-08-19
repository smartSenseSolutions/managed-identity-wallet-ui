# [Eclipse Tractus-x Managed Identity Wallet](https://github.com/eclipse-tractusx/managed-identity-wallet) UI application

This is UI application to access APIs of [Eclipse Tractus-x Managed Identity Wallet](https://github.com/eclipse-tractusx/managed-identity-wallet)

## Prerequisites

1. Node with version >= v16.16
2. Yarn (Package Manager) >=1.22
3. Managed identity wallet must be running
4. Keycloak must be running and configured correctly
5. MIW and UI application must be using same keycloak
6. Allowed web origin must be added in keycloak public client
7. CORS must be enabled in managed identity wallet application

## Run in local

### Run keycloak

1. Go to dev-assets folder and run docker compose file, this will run keycloak and import `miw_test` realm with needed configuration
2. Test keycloak on [http://localhost:28080](http://localhost:28080)
3. There will be 2 user created as below:

   1. Username: catena-x

      password: password

      bpn: BPNL000000000000

      this user act as base wallet

   2. Username: user1

      password: password

      bpn : BPNL000000000001

      this user act as normal user(any business partner, you can create wallet using this BPN)

### Run keycloak

1. Enable CORSS in MIW application by adding below code in `SecurityConfig.java`

```
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3004"));   //changes as per your port and host name
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "OPTIONS", "PUT", "DELETE"));
        configuration.setAllowedHeaders(
                List.of("X-Requested-With", "X-HTTP-Method-Override", "Content-Type", "Authorization", "Accept",
                        "Access-Control-Allow-Credentials", "Access-Control-Allow-Origin"));
        configuration.setAllowCredentials(true);
        //configuration.addAllowedHeader("Authorization");
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
```

2. Set keycoak realted setting application.yaml.
3. Start aplication

### Run UI application

1. Update values in .env.local is needed
2. start application using `yarn start`

## Sample Demo
<video src='docs/MIW_ui_demo.webm'/>

![Demo](docs/MIW_ui_demo.webm)

## License

Distributed under the Apache 2.0 License.
See [LICENSE](./LICENSE) for more information.
