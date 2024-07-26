import { gql } from "graphql-request";

export interface Genre {
  id: string;
  title: string;
}

export interface GenresResponse {
  genres: {
    nodes: Genre[];
  };
}

export const GET_GENRES = gql`
  query GenresQuery {
    genres {
      nodes {
        id
        title
      }
    }
  }
`;
