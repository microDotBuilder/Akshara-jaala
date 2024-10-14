// scripts/runSeedData.ts

import { ConvexHttpClient } from "convex/browser"; // or 'convex/node' if running in Node.js
import seedData from "./seed";

async function runSeed() {
  const convex = new ConvexHttpClient(process.env.CONVEX_URL!);

  try {
    await convex.mutation("seedData", {});
    console.log("Data seeding completed successfully.");
  } catch (error) {
    console.error("Error during data seeding:", error);
  }
}

runSeed();
