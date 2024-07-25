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
  // I'm using state for this component to manage the search term and page.
  // If the component grows to be more complex, I would consider using React
  // Context or a state management library.
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  return (
    <>
      <MovieSearchFields setSearchTerm={setSearchTerm} setPage={setPage} />
      <MovieSearchResults
        searchTerm={searchTerm}
        page={page}
        setPage={setPage}
      />
    </>
  );
};
