import { GET_MOVIES, MoviesResponse } from "@/graphql/queries/getMovies";

import { FC } from "react";
import { MovieTile } from "./MovieTile";
import { useApi } from "@/graphql/useApi";

/**
 * This component fetches and displays a list of movies based on
 * the query params provided to the API.
 *
 * @returns {React.ReactNode} the movie search component.
 */
export const MovieSearchResults: FC<{
  searchTerm: string;
  genreTitle: string;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}> = ({ searchTerm, genreTitle, page, setPage }) => {
  const { data, error, isLoading, loadingMessage } = useApi<MoviesResponse>({
    query: GET_MOVIES,
    variables: {
      where: {
        search: searchTerm,
        genre: genreTitle,
      },
      pagination: {
        perPage: 10,
        page,
      },
    },
  });

  if (isLoading) {
    return <div>{loadingMessage}</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data?.movies?.nodes?.length) return <div>No movies found.</div>;

  const handlePagination = (direction: "prev" | "next") => {
    const newPage = direction === "prev" ? page - 1 : page + 1;

    if (newPage < 1 || newPage > data.movies.pagination.totalPages) {
      return;
    }

    setPage(newPage);
  };

  return (
    <>
      <div className="p-4 mt-4 grid grid-cols-5 gap-4">
        {data.movies.nodes.map((movie) => {
          return <MovieTile key={movie.title} {...movie} />;
        })}
      </div>
      {/**
       * This pagination section is a bit simplistic. If I had more time,
       * I would consider adding a "jump to page" input. I would also extract
       * this pagination section into its own component, to make it more testable
       * and maintainable.
       */}
      <div className="p-4 mt-4 flex justify space-between">
        <span className="mr-4" onClick={() => handlePagination("prev")}>
          Previous
        </span>
        <span>
          Page {data.movies.pagination.page} of{" "}
          {data.movies.pagination.totalPages}
        </span>
        <span className="ml-4" onClick={() => handlePagination("next")}>
          Next
        </span>
      </div>
    </>
  );
};
