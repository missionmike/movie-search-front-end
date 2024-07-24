import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { FC } from "react";

const queryClient = new QueryClient();

/**
 * Query provider component to wrap the app in the query provider.
 *
 * @see https://tanstack.com/query/latest/docs/framework/react/quick-start
 *
 * @param {React.ReactNode} children to be rendered which depend on the query provider.
 * @returns {React.ReactNode} the query provider-wrapped components.
 */
export const QueryProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
