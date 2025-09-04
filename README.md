# Stucco Software Starter: SvelteKit Hybrid

This is a starter repo for building a Stucco Software application using SvelteKit's hybrid server/client approach to web applications.

## Getting Started

This repo needs to use Node v^20.0.0. No more, no less.

```
❯ cp .env.example .env
❯ npm run dev
```

### Setting Up Environment Variables

To get started, we need to look at the three variables we need for authentication:

`PUBLIC_CLIENT_ID`: This is information about the application, it's a URL. See below for more information.

`PUBLIC_HOST`: This is URL that this application runs on.

`PUBLIC_PROVIDER`: This is the default identity provider. We can also accept user-provided providers, but this allows for one-click authentication.

### Creating a Client ID

In this `.env.example` file, this application has a ClientID of `https://stucco.software/applications/sveltekit-hybrid-starter.json`.

This file resolves to a JSON object:

```
{
  "@context": [
    "https://www.w3.org/ns/solid/oidc-context.jsonld"
  ],
  "client_id": "https://stucco.software/applications/sveltekit-hybrid-starter.json",
  "client_name": "Stucco Software Starter; Hybrid SvelteKit",
  "redirect_uris": [
    "http://localhost:5173/auth/confirm"
  ],
  "post_logout_redirect_uris": [
    "http://localhost:5173"
  ],
  "grant_types": [
    "authorization_code",
    "refresh_token"
  ],
  "scope": "openid webid offline_access",
  "response_types": [
    "code"
  ],
  "token_endpoint_auth_method": "none",
  "application_type": "web",
  "require_auth_time": false
}
```

This Client ID is used to determine valid redirect URLs for security purposes, and must be accessible from the network. Stucco Software is happy to create and host this client ID for you during development.

## How Authentication Works

Authentication in this application is split between Client and Server. A user's Session and auth credentials are entirely managed in the client, and never sent to the Server. This means that the server is unable to make requests on the users behalf, and these requests must be made from the client.

However, CAN validate the any given request comes from a given user. This means that the serve can make reqeusts to it's own data store provider privatrely from the client. This is useful for handling things like "Does this user have an active subscription to this app?"

It's kinda weird, but it works!


