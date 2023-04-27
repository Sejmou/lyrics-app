import classNames from "classnames";
import { ListGroup } from "flowbite-react";
import { ListGroupItem } from "flowbite-react/lib/esm/components/ListGroup/ListGroupItem";
import { useSongStore } from "~/store";
import { FaTrash } from "react-icons/fa";
import IconButton from "./IconButton";

type Props = {
  className?: string;
};

const Songs = (props: Props) => {
  const songs = useSongStore((state) => state.songs);
  const setCurrentSong = useSongStore((state) => state.setCurrentSong);
  const removeSong = useSongStore((state) => state.removeSong);

  return (
    <div className={classNames("w-full", props.className)}>
      <h2 className="text-2xl font-bold">Songs</h2>
      {songs.length === 0 ? (
        <p className="">No songs yet. Add one!</p>
      ) : (
        <ListGroup className="">
          {songs.map((song) => (
            <ListGroupItem
              key={song.id}
              onClick={() => setCurrentSong(song.id)}
              className="flex cursor-pointer gap-1"
            >
              <div className="w-full">
                <span className="font-bold">{song.title}</span> by{" "}
                <span className="font-semibold">{song.artist}</span>
              </div>
              <IconButton onClick={() => removeSong(song.id)}>
                <FaTrash />
              </IconButton>
            </ListGroupItem>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default Songs;
