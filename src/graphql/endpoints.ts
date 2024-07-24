/**
 * The base URL for the API. Should not include a trailing slash, and is the same
 * for both REST and GraphQL endpoints.
 */
const apiBaseUrl = "https://0kadddxyh3.execute-api.us-east-1.amazonaws.com";

/**
 * The endpoints for the API.
 */
export const apiEndpoint = {
  auth: `${apiBaseUrl}/auth/token`, // REST endpoint for token acquisition.
  graphql: `${apiBaseUrl}/graphql`, // GraphQL endpoint for API queries.
};
