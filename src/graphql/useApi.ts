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
  const token = useBearerToken();

  const { data, error, isLoading } = useQuery<T>({
    queryKey: ["api", query, variables],
    queryFn: async () =>
      request(apiEndpoint.graphql, query, variables, {
        Authorization: `Bearer ${token}`,
      }),
    retry: 1,
    enabled: !!token, // Only run the query if the token is available.
  });

  return { data, error, isLoading };
};
