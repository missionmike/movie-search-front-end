import { apiEndpoint } from "./endpoints";
import { useQuery } from "@tanstack/react-query";

interface Token {
  token: string;
}

/**
 * The useBearerToken hook fetches the bearer token from the API.
 * This token is used to authenticate the user with the API for future
 * requests. It should only run once on page load, and the token should
 * continue to be available via the react-query cache.
 *
 * @returns the bearer token from the API, if available, as well as the
 *          loading state and any errors.
 */
export const useBearerToken = () => {
  const getBearerToken = async () => {
    const res = await fetch(apiEndpoint.auth);
    return res.json();
  };

  const { data, error, isLoading } = useQuery<Token>({
    queryKey: ["bearerToken"],
    queryFn: getBearerToken,
    retry: 2,
  });

  return { token: data?.token, tokenError: error, loadingToken: isLoading };
};
