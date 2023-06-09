import { Fragment, useMemo } from "react";
import { useCurrentSong, useSongStore } from "~/store";
import CheckboxInput from "./CheckboxInput";

type Props = {
  className?: string;
};

const CurrentSong = (props: Props) => {
  const currentSong = useCurrentSong();

  const lyricBlocks = useMemo(
    () =>
      currentSong ? splitIntoBlocksBySectionHeading(currentSong.lyrics) : [],
    [currentSong]
  );
  const lyricBlockIds = useMemo(
    () => lyricBlocks.map((b, i) => `${b.name}-${i}`),
    [lyricBlocks]
  );

  const showSectionHeadingsOnly = useSongStore(
    (state) => state.showSectionHeadingsOnly
  );

  if (!currentSong) {
    return (
      <div className={props.className}>
        Select a song. Its lyrics will show up here.
      </div>
    );
  }

  return (
    <div className={props.className}>
      <div className="mb-4">
        <h2 className="text-4xl font-bold">{currentSong.title}</h2>
        <h3 className="text-3xl">
          by <span className="font-semibold">{currentSong.artist}</span>
        </h3>
      </div>
      <SectionHeadingsCheckbox />
      <div className="flex flex-col gap-8">
        {lyricBlocks.map((b, i) => (
          <div key={i} id={lyricBlockIds[i]}>
            <h4 className="font-semibold">{b.name}</h4>
            {!showSectionHeadingsOnly && (
              <p>
                {b.content.split("\n").map((line, i) => (
                  <Fragment key={i}>
                    {line}
                    <br />
                  </Fragment>
                ))}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const SectionHeadingsCheckbox = () => {
  const showSectionHeadingsOnly = useSongStore(
    (state) => state.showSectionHeadingsOnly
  );
  const setShowSectionHeadingsOnly = useSongStore(
    (state) => state.setShowSectionHeadingsOnly
  );

  return (
    <CheckboxInput
      id="show-section-headings-only"
      label={"Only show song structure"}
      checked={showSectionHeadingsOnly}
      onChange={(checked) => setShowSectionHeadingsOnly(checked)}
    />
  );
};

export default CurrentSong;

function splitIntoBlocksBySectionHeading(lyrics: string) {
  // example section heading: [Verse 1]

  // this regex matches the section heading and content until the next section heading or the end of the string
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

  // match final section heading without content
  const finalSectionHeading = lyrics.match(/\[(.+?)\]\n?$/);
  if (finalSectionHeading) {
    const block = {
      name: finalSectionHeading[1] || "",
      content: "",
    };
    blocks.push(block);
  }

  return blocks;
}
