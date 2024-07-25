import { FC, useState } from "react";

import { MovieSearchFields } from "./MovieSearchFields";
import { MovieSearchResults } from "./MovieSearchResults";

/**
 * This component fetches and displays a list of movies based on
 * the query params provided to the API.
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
