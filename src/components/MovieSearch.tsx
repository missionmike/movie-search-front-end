import { FC } from "react";
import { GET_MOVIES } from "@/graphql/queries/getMovies";
import { MovieTile } from "./MovieTile";
import { useApi } from "@/graphql/useApi";

export interface Movie {
  title: string;
  datePublished: string;
  ratingValue: number;
  directors: string[];
  writers: string[];
  posterUrl: string | null;
  summary: string | null;
  genres: {
    title: string;
  }[];
}

export interface MoviesResponse {
  movies: {
    nodes: Movie[];
  };
}

/**
 * This component fetches and displays a list of movies based on
 * the query params provided to the API.
 *
 * @returns {React.ReactNode} the movie search component.
 */
export const MovieSearch: FC = () => {
  const { data, error, isLoading, loadingMessage } = useApi<MoviesResponse>({
    query: GET_MOVIES,
  });

  if (isLoading) {
    return <div>{loadingMessage}</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data?.movies?.nodes?.length) return <div>No movies found.</div>;

  return (
    <div className="p-4 mt-4 bg-white grid grid-cols-5 gap-4">
      {data.movies.nodes.map((movie) => {
        return <MovieTile key={movie.title} {...movie} />;
      })}
    </div>
  );
};
