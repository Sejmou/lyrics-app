import { useState } from "react";
import { api } from "~/utils/api";

// TODO: Add a search bar for song lyrics and proper API for lyrics

const SongSearch = () => {
  const [query, setQuery] = useState("never gonna give you up");
  const lyrics = api.lyrics.findLyrics.useQuery({ query });

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-2xl">
        {lyrics.data ? lyrics.data.lyrics : "Loading tRPC query..."}
      </p>
    </div>
  );
};

export default SongSearch;
