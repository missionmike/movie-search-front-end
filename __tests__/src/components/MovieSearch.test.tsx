import { MovieSearch, MoviesResponse } from "@/components/MovieSearch";
import { render, screen, waitFor } from "@testing-library/react";

import { TokenResponse } from "@/graphql/useBearerToken";
import { useQuery } from "@tanstack/react-query";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

describe("MovieSearch", () => {
  const moviesResponse: MoviesResponse = {
    movies: {
      nodes: [
        { title: "Movie 1", genres: [{ title: "Genre 1" }] },
        { title: "Movie 2", genres: [{ title: "Genre 2" }] },
      ],
    },
  };

  it("renders without crashing", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });
    render(<MovieSearch />);
  });

  it("displays loading state for acquiring token", () => {
    (useQuery as jest.Mock).mockReturnValueOnce({
      data: null,
      isLoading: true,
      error: null,
    });
    render(<MovieSearch />);
    expect(screen.getByText(/Acquiring token/i)).toBeInTheDocument();
  });

  it("displays loading state after acquiring token", async () => {
    const tokenResponse: TokenResponse = { token: "abc123" };

    (useQuery as jest.Mock).mockReturnValueOnce({
      data: tokenResponse,
      isLoading: false,
      error: null,
    });

    (useQuery as jest.Mock).mockReturnValueOnce({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<MovieSearch />);

    await waitFor(() => {
      expect(screen.queryByText(/Acquiring token/i)).toBeNull();
      expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    });
  });

  it("displays error state", async () => {
    (useQuery as jest.Mock).mockReturnValue({
      error: new Error("An error occurred"),
      status: "error",
    });
    render(<MovieSearch />);
    await waitFor(() => expect(screen.getByText(/error/i)).toBeInTheDocument());
  });

  it("displays data when available", async () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: moviesResponse,
      status: "success",
    });
    render(<MovieSearch />);
    await waitFor(() =>
      expect(screen.getByText(/Movie 1/i)).toBeInTheDocument(),
    );
    await waitFor(() =>
      expect(screen.getByText(/Movie 2/i)).toBeInTheDocument(),
    );
  });

  it("displays no data when empty", async () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: { movies: { nodes: [] } },
      status: "success",
    });
    render(<MovieSearch />);
    await waitFor(() =>
      expect(screen.getByText(/No movies found/i)).toBeInTheDocument(),
    );
  });
});
