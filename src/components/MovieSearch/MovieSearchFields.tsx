import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { FC } from "react";
import { useDebouncedCallback } from "use-debounce";

/**
 * This component provides the search input field for the movie search.
 *
 * @param {React.Dispatch<string>} setSearchTerm the search term setter.
 * @returns {React.ReactNode} the movie search component.
 */
export const MovieSearchFields: FC<{
  setSearchTerm: React.Dispatch<string>;
}> = ({ setSearchTerm }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /**
   * This function handles the search input field changes.
   * It debounces the input to prevent too many API calls.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} evt the input event.
   */
  const handleSearch = useDebouncedCallback((evt) => {
    const params = new URLSearchParams(searchParams);

    if (evt.target.value) {
      params.set("search", evt.target.value);
      setSearchTerm(evt.target.value);
    } else {
      params.delete("search");
      setSearchTerm("");
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="mb-2 mt-10">
      <input
        type="text"
        placeholder="Search for a movie..."
        onInput={handleSearch}
        className="text-black p-2 rounded-md"
      />
    </div>
  );
};
