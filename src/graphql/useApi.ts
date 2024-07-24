import { apiEndpoint } from "./endpoints";
import request from "graphql-request";
import { useBearerToken } from "./useBearerToken";
import { useQuery } from "@tanstack/react-query";

/**
 * The useApi hook is a wrapper that handles the API call to the
 * GraphQL endpoint. It also handles the token acquisition and
 * loading state.
 *
 * @param query the query to run against the API.
 * @param variables the variables to pass to the query.
 * @returns the data, error, and loading state of the API call.
 */
export const useApi = <T>({
  query,
  variables = {},
}: {
  query: string;
  variables?: object;
}) => {
  const { token, tokenError, loadingToken } = useBearerToken();

  const { data, error, isLoading } = useQuery<T>({
    queryKey: ["api", query, variables],
    queryFn: async () =>
      request(apiEndpoint.graphql, query, variables, {
        Authorization: `Bearer ${token}`,
      }),
    retry: 1,
    enabled: !!token, // Only run the query if the token is available.
  });

  const isApiOrTokenLoading = isLoading || loadingToken;
  const isApiOrTokenError = error || tokenError;
  const loadingMessage = loadingToken ? "Acquiring token..." : "Loading...";

  return {
    data,
    error: isApiOrTokenError,
    isLoading: isApiOrTokenLoading,
    loadingMessage,
  };
};
