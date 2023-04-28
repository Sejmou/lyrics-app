import { type NextPage } from "next";
import Head from "next/head";

import { useEffect, useState } from "react";
import { Input, useMIDI, useMIDINote } from "@react-midi/hooks";
import AddSong from "~/components/AddSong";
import dynamic from "next/dynamic";

// would get hydration error if not loading as dynamic component
// reason: store state is local to the user's device and not available to the server (and hence different than what server renders initially)
const Songs = dynamic(() => import("~/components/Songs"), {
  ssr: false,
});

const CurrentSong = dynamic(() => import("~/components/CurrentSong"), {
  ssr: false,
});

const Home: NextPage = () => {
  const [rotateScreen, setRotateScreen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && rotateScreen) {
      document.body.setAttribute("style", "transform: rotate(-90deg);");
    } else {
      document.body.removeAttribute("style");
    }
  }, [rotateScreen]);

  const { inputs } = useMIDI(); // Initially returns [[], []]
  console.log("MIDI inputs", inputs);
  const selectedInput = inputs?.[1]; // TODO: make this configurable

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
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            My <span className="text-[hsl(280,100%,70%)]">Song</span>Book
          </h1>
          <CurrentSong />
          <Songs />
          <AddSong />
          {selectedInput && (
            <div className="flex flex-col items-center gap-4">
              <span>Current MIDI device: {selectedInput.name}</span>
              <MIDINoteLog input={selectedInput} />
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;

const MIDINoteLog = ({ input }: { input: Input }) => {
  const event = useMIDINote(input); // Intially returns undefined
  if (!event) {
    return <div>Waiting for note...</div>;
  }
  const { on, note, velocity, channel } = event;
  return (
    <div>
      Note {note} {on ? "on" : "off"} ({velocity}) on channel {channel}
    </div>
  );
};
