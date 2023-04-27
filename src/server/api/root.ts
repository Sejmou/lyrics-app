import { createTRPCRouter } from "~/server/api/trpc";
import { lyricsRouter } from "~/server/api/routers/lyrics";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  lyrics: lyricsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
