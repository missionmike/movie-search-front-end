import { GET_GENRES, GenresResponse } from "@/graphql/queries/getGenres";

import { FC } from "react";
import { useApi } from "@/graphql/useApi";

/**
 * This component fetches and displays a list of genres to filter. This currently
 * uses a single-select option, but could be expanded to allow multiple genres
 * to be selected via checkboxes or other UI.
 *
 * @param {React.Dispatch<React.SetStateAction<string>>} setGenreTitle the genre title state setter.
 * @returns {React.ReactNode} the movie search genre filter component.
 */
export const MovieSearchFilterGenre: FC<{
  setGenreTitle: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setGenreTitle }) => {
  const { data, error } = useApi<GenresResponse>({
    query: GET_GENRES,
  });

  if (error) {
    // Time allowing, I'd handle this error appropriately.
    return null;
  }

  if (!data?.genres?.nodes?.length) return null;

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGenreTitle(event.target.value);
  };

  return (
    <select
      className="text-black p-2 rounded-md ml-2"
      onChange={handleGenreChange}
    >
      <option value="">All Genres</option>
      {data.genres.nodes.map((genre) => (
        <option key={`option-genre-${genre.id}`} value={genre.title}>
          {genre.title}
        </option>
      ))}
    </select>
  );
};
