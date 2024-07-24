import { apiEndpoint } from "./endpoints";
import { useQuery } from "@tanstack/react-query";

export const useBearerToken = () => {
  const getBearerToken = async () => {
    const res = await fetch(apiEndpoint.auth);
    return res.json();
  };

  const { data } = useQuery({
    queryKey: ["bearerToken"],
    queryFn: getBearerToken,
    retry: 2,
  });

  return data?.token;
};
