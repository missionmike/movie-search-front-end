import { apiEndpoint } from "./endpoints";
import request from "graphql-request";
import { useBearerToken } from "./useBearerToken";
import { useQuery } from "@tanstack/react-query";

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
