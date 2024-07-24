import { FC } from "react";
import Image from "next/image";
import { Movie } from "./MovieSearch";

export const MovieTile: FC<Movie> = ({
  title,
  datePublished,
  ratingValue,
  directors,
  writers,
  posterUrl,
  summary,
  genres,
}) => {
  return (
    <div className="grid p-2 bg-slate-100">
      <h2 className="text-lg">{title}</h2>
      <p className="mt-2 text-sm italic">
        {genres.length > 0 ? genres[0].title : "No genre"} |
        {datePublished
          ? ` ${new Date(datePublished).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`
          : null}
      </p>
      {posterUrl ? (
        <Image
          src={posterUrl}
          alt={`Movie poster for: ${title}`}
          width={200}
          height={300}
        />
      ) : null}
      <p className="mt-4">{summary?.substring(0, 100)}...</p>
      <p className="mt-4">
        <strong>Rating:</strong> {ratingValue}
      </p>
      {directors?.length > 0 ? (
        <p className="mt-4">
          <strong>Directors:</strong> {directors.join(", ")}
        </p>
      ) : null}
      {writers?.length > 0 ? (
        <p>
          <strong>Writers:</strong> {writers.join(", ")}
        </p>
      ) : null}
    </div>
  );
};
