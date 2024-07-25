import { gql } from "graphql-request";

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
    pagination: {
      page: number;
      totalPages: number;
    };
  };
}

// Query the API for the list of movies with GraphQL.
// @see https://tanstack.com/query/v4/docs/framework/react/graphql
export const GET_MOVIES = gql`
  query MoviesQuery($where: MovieFilterInput, $pagination: PaginationInput) {
    movies(where: $where, pagination: $pagination) {
      nodes {
        title
        datePublished
        ratingValue
        directors
        writers
        posterUrl
        summary
        genres {
          title
        }
      }
      pagination {
        page
        totalPages
      }
    }
  }
`;
