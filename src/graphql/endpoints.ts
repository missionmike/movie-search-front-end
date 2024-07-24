/**
 * Constants that are not sensitive values and can be shared
 * across the application.
 */

const apiBaseUrl = "https://0kadddxyh3.execute-api.us-east-1.amazonaws.com";

export const apiEndpoint = {
  auth: `${apiBaseUrl}/auth/token`,
  graphql: `${apiBaseUrl}/graphql`,
};
