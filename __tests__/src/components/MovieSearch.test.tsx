import { render, screen, waitFor } from "@testing-library/react";

import { MovieSearch } from "@/components/MovieSearch/MovieSearch";
import { MoviesResponse } from "@/graphql/queries/getMovies";
import { TokenResponse } from "@/graphql/useBearerToken";
import { useQuery } from "@tanstack/react-query";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

describe("MovieSearch", () => {
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

  it("displays error state", async () => {
    (useQuery as jest.Mock).mockReturnValue({
      error: new Error("An error occurred"),
      status: "error",
    });
    render(<MovieSearch />);
    await waitFor(() => expect(screen.getByText(/error/i)).toBeInTheDocument());
  });

  it("displays data when available", async () => {
    const moviesResponse: MoviesResponse = {
      movies: {
        nodes: [
          {
            title: "Movie 1",
            posterUrl: null,
            directors: ["Director 1"],
            writers: ["Writer 1"],
            datePublished: "2021-01-01",
            ratingValue: 5,
            summary: "Summary 1",
            genres: [{ title: "Genre 1" }],
          },
          {
            title: "Movie 2",
            posterUrl: null,
            directors: ["Director 2"],
            writers: ["Writer 2"],
            datePublished: "2021-01-01",
            ratingValue: 5,
            summary: "Summary 2",
            genres: [{ title: "Genre 2" }, { title: "Genre 3" }],
          },
        ],
        pagination: { page: 1, totalPages: 1 },
      },
    };

    (useQuery as jest.Mock).mockReturnValue({
      data: moviesResponse,
      status: "success",
    });

    render(<MovieSearch />);

    const expectedText = [
      "Movie 1",
      "Genre 1",
      "Movie 2",
      "Genre 2",
      "Summary 1",
      "Summary 2",
    ];
    await waitFor(async () => {
      expectedText.forEach((text) =>
        expect(screen.getByText(new RegExp(text, "i"))).toBeInTheDocument(),
      );
    });
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
