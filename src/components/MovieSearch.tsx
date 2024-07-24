import { FC } from "react";
import { GET_MOVIES } from "@/graphql/queries/getMovies";
import { useApi } from "@/graphql/useApi";

interface Movie {
  title: string;
  genres: {
    title: string;
  }[];
}

interface Movies {
  movies: {
    nodes: Movie[];
  };
}

/**
 * This component is a container for the movie search component, to
 * provide a consistent layout.
 */
const MovieSearchContainer: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="p-4 bg-white">{children}</div>;
};

/**
 * This component fetches and displays a list of movies based on
 * the query params provided to the API.
 *
 * @returns {React.ReactNode} the movie search component.
 */
export const MovieSearch = () => {
  const { data, error, isLoading, loadingMessage } = useApi<Movies>({
    query: GET_MOVIES,
  });

  if (isLoading) {
    return <MovieSearchContainer>{loadingMessage}</MovieSearchContainer>;
  }

  if (error) {
    return <MovieSearchContainer>Error: {error.message}</MovieSearchContainer>;
  }

  return data ? (
    <MovieSearchContainer>
      {data.movies.nodes.map((movie) => {
        return <div key={movie.title}>{movie.title}</div>;
      })}
    </MovieSearchContainer>
  ) : null;
};
