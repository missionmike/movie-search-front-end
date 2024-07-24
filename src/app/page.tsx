"use client";

import { Movies } from "@/components/Movies";
import { QueryProvider } from "@/context/QueryProvider";

/**
 * Main page component for the app. This is a basic SPA, so this is the only page.
 *
 * @returns {React.ReactNode} the main page component.
 */
export default function Home() {
  return (
    <QueryProvider>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1 className="text-4xl font-bold">Welcome to Movie Search</h1>
        <Movies />
        <p className="text-lg">Search for your favorite movies!</p>
      </main>
    </QueryProvider>
  );
}
