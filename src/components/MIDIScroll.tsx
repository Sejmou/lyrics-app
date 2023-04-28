import { type Input, useMIDINote } from "@react-midi/hooks";
import { type RefObject } from "react";
import { useSongStore } from "~/store";

// allows scrolling within a DOM element via MIDI
// TODO: make this actually work with a DOM element and not just the whole page which is actually the case right now
// TODO: there MUST be a cleaner way to do this lol
const MIDIScroll = ({
  input,
  ref,
}: {
  input: Input;
  ref: RefObject<HTMLElement>;
}) => {
  useMIDIControlledScroll(input, ref);
  return <></>;
};

export default MIDIScroll;

function useMIDIControlledScroll(input: Input, ref: RefObject<HTMLElement>) {
  const screenRotated = useSongStore((state) => state.screenRotated);
  const event = useMIDINote(input);
  if (!event) return;
  const { on, note } = event;

  const element = ref && ref.current ? ref.current : undefined; // for some reason, atm ref is always undefined!?

  if (on && note === 3) {
    !screenRotated ? scrollDown(element) : scrollRight(element);
  } else if (on && note === 2) {
    !screenRotated ? scrollUp(element) : scrollLeft(element);
  }
}

function scrollDown(element: HTMLElement | Window = window) {
  element.scrollBy({
    top: window.innerHeight * 0.5,
    left: 0,
    behavior: "smooth",
  });
}

function scrollUp(element: HTMLElement | Window = window) {
  element.scrollBy({
    top: -window.innerHeight * 0.5,
    left: 0,
    behavior: "smooth",
  });
}

function scrollLeft(element: HTMLElement | Window = window) {
  element.scrollBy({
    top: 0,
    left: -window.innerWidth * 0.5,
    behavior: "smooth",
  });
}

function scrollRight(element: HTMLElement | Window = window) {
  element.scrollBy({
    top: 0,
    left: window.innerWidth * 0.5,
    behavior: "smooth",
  });
}
