import { FC, useState } from "react";

import { MovieSearchFields } from "./MovieSearchFields";
import { MovieSearchResults } from "./MovieSearchResults";

/**
 * This component fetches and displays a list of movies based on
 * the query params provided to the API. This is a container component
 * that contains the search fields and results, and handles the shared
 * state between the two.
 *
 * @returns {React.ReactNode} the movie search component.
 */
export const MovieSearch: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <MovieSearchFields setSearchTerm={setSearchTerm} />
      <MovieSearchResults searchTerm={searchTerm} />
    </>
  );
};
