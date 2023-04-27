import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const lyricsRouter = createTRPCRouter({
  findLyrics: publicProcedure
    .input(z.object({ query: z.string() }))
    .query(({ input }) => {
      return {
        lyrics: `Hello ${input.query}`,
      };
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
