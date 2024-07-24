import { gql } from "graphql-request";

// Query the API for the list of movies with GraphQL.
// @see https://tanstack.com/query/v4/docs/framework/react/graphql
export const GET_MOVIES = gql`
  query MoviesQuery($where: MovieFilterInput) {
    movies(where: $where) {
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
    }
  }
`;
