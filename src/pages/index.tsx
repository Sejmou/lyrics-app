import { type NextPage } from "next";
import Head from "next/head";

import { type WheelEvent, useEffect, useRef } from "react";
import AddSong from "~/components/AddSong";
import dynamic from "next/dynamic";
import CheckboxInput from "~/components/CheckboxInput";
import { useSongStore } from "~/store";

import MIDIScroll from "~/components/MIDIScroll";

// would get hydration error if not loading as dynamic component
// reason: store state is local to the user's device and not available to the server (and hence different than what server renders initially)
const Songs = dynamic(() => import("~/components/Songs"), {
  ssr: false,
});

const CurrentSong = dynamic(() => import("~/components/CurrentSong"), {
  ssr: false,
});

const MIDIInputSelect = dynamic(() => import("~/components/MIDIInputSelect"), {
  ssr: false,
});

const Home: NextPage = () => {
  const screenRotated = useSongStore((state) => state.screenRotated);
  const setRotateScreen = useSongStore((state) => state.setRotateScreen);
  const midiInput = useSongStore((state) => state.midiInput);

  useEffect(() => {
    if (typeof window !== "undefined" && screenRotated) {
      document.body.classList.add("rotated");
    } else {
      document.body.classList.remove("rotated");
    }
  }, [screenRotated]);

  const containerRef = useRef<HTMLElement>(null);
  const handleScroll = (event: WheelEvent<HTMLElement>) => {
    // TODO: doesn't seem to work properly right now

    const container = containerRef.current;
    if (!container || !screenRotated) return;

    // if screen is rotated, we need to scroll horizontally instead of vertically lol

    const isVerticalScroll = container.scrollHeight > container.clientHeight;

    if (isVerticalScroll) {
      container.scrollLeft += event.deltaY;
    } else {
      container.scrollLeft += event.deltaX;
    }

    event.preventDefault();
  };

  return (
    <>
      <Head>
        <title>My Songbook</title>
        <meta
          name="description"
          content="A webapp for storing your favorite songs"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className="flex min-h-screen flex-col items-center justify-center"
        ref={containerRef}
        onWheel={handleScroll}
      >
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            My <span className="text-[hsl(280,100%,70%)]">Song</span>Book
          </h1>
          <CheckboxInput
            label="Rotate screen"
            id="rotate-screen"
            checked={screenRotated}
            onChange={setRotateScreen}
          />
          <CurrentSong />
          <Songs />
          <MIDIInputSelect />
          {midiInput && <MIDIScroll input={midiInput} ref={containerRef} />}
          <AddSong />
        </div>
      </main>
    </>
  );
};

export default Home;
