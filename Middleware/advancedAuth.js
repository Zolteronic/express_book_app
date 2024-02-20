import { auth, requiredScopes } from "express-oauth2-jwt-bearer";

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: "https://book-store-api",
  issuerBaseURL: `https://dev-dxzfqx250lzkp7gk.us.auth0.com/`,
});

export default checkJwt;
