import { FC, Suspense, useState } from "react";

import { MovieSearchFilterGenre } from "./MovieSearchFilterGenre";
import { MovieSearchResults } from "./MovieSearchResults";
import { MovieSearchText } from "./MovieSearchText";

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
  //
  // If I spent more time on this, I would check the URL queries for the
  // existence of a search query and/or genre filter. If they existed, I would
  // set the state based on those values, so that the component could be
  // bookmarked or shared with the search state intact.
  const [searchTerm, setSearchTerm] = useState("");
  const [genreTitle, setGenreTitle] = useState("");
  const [page, setPage] = useState(1);

  return (
    <>
      <Suspense>
        <div className="mb-2 mt-10">
          <MovieSearchText setSearchTerm={setSearchTerm} setPage={setPage} />
          <MovieSearchFilterGenre setGenreTitle={setGenreTitle} />
        </div>
      </Suspense>
      <MovieSearchResults
        searchTerm={searchTerm}
        genreTitle={genreTitle}
        page={page}
        setPage={setPage}
      />
    </>
  );
};
