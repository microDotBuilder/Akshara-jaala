// convex/getTodayPuzzle.ts

import { query, QueryCtx } from "./_generated/server";

export const getTodayPuzzle = query({
  handler: async (ctx: QueryCtx) => {
    const today = new Date().toISOString().split("T")[0]; // 'YYYY-MM-DD'

    const puzzle = await ctx.db
      .query("puzzles")
      .filter((q) => q.eq(q.field("date"), today))
      .first();

    if (!puzzle) {
      throw new Error("Puzzle for today not found");
    }

    return puzzle;
  },
});
