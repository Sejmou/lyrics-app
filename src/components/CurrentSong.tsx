import React, { Fragment } from "react";
import { useCurrentSong } from "~/store";

type Props = {
  className?: string;
};

const CurrentSong = (props: Props) => {
  const currentSong = useCurrentSong();

  if (!currentSong) {
    return (
      <div className={props.className}>
        Select a song. Its lyrics will show up here.
      </div>
    );
  }

  const lyricBlocks = splitIntoBlocksBySectionHeading(currentSong.lyrics);

  return (
    <div className={props.className}>
      <div className="mb-4">
        <h2 className="text-4xl font-bold">{currentSong.title}</h2>
        <h3 className="text-3xl font-semibold">{currentSong.artist}</h3>
      </div>
      <div className="flex flex-col gap-8">
        {lyricBlocks.map((b, i) => (
          <div key={i}>
            <h4 className="font-semibold">{b.name}</h4>
            <p className="">
              {b.content.split("\n").map((line, i) => (
                <Fragment key={i}>
                  {line}
                  <br />
                </Fragment>
              ))}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentSong;

function splitIntoBlocksBySectionHeading(lyrics: string) {
  // example section heading: [Verse 1]

  // this regex matches the section heading and the content until the next section heading or the end of the string
  const regex = /^\[(.+?)\]\n([\s\S]*?)(?=^\[|\Z)/gm;

  const blocks = [];
  let match;
  while ((match = regex.exec(lyrics))) {
    const block = {
      name: match[1] || "",
      content: match[2]?.trim() || "",
    };
    blocks.push(block);
  }

  return blocks;
}
