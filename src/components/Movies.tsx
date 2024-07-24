import { GET_MOVIES } from "@/graphql/queries/getMovies";
import { useApi } from "@/graphql/useApi";

interface MovieNode {
  title: string;
  genres: {
    title: string;
  }[];
}

interface MoviesData {
  movies: {
    nodes: MovieNode[];
  };
}

export const Movies = () => {
  const { data, error, isLoading } = useApi<MoviesData>({
    query: GET_MOVIES,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  return (
    <div>
      {data.movies.nodes.map((movie) => {
        return <div key={movie.title}>{movie.title}</div>;
      })}
    </div>
  );
};
