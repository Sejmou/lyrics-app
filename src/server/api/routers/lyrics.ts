import { z } from "zod";
import { env } from "~/env.mjs";

const geniusAPIUrl = "https://api.genius.com";

async function makeGeniusAPIRequest(endpoint: string) {
  const response = await fetch(`${geniusAPIUrl}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${env.GENIUS_ACCESS_TOKEN}`,
    },
  });
  return response.json() as unknown;
}

const songDataReponse = z.object({
  response: z.object({
    song: z.object({
      id: z.number(),
      title: z.string(),
      url: z.string(),

      primary_artist: z.object({
        id: z.number(),
        name: z.string(),
        url: z.string(),
      }),
    }),
  }),
});

async function fetchSongData(songId: number) {
  const data = await makeGeniusAPIRequest(`/songs/${songId}`);
  const parsed = songDataReponse.parse(data);

  return parsed.response;
}

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const lyricsRouter = createTRPCRouter({
  findLyrics: publicProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ input }) => {
      const data = await fetchSongData(378195);
      return {
        lyrics:
          "Lyrics for " +
          data.song.title +
          " by " +
          data.song.primary_artist.name +
          " will soon appear here.",
      };
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
