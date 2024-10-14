import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    // Unique identifier for the user (provided by Convex auth or external provider)
    _id: v.id("users"),
    username: v.string(),
    email: v.string(),
    avatarUrl: v.optional(v.id("profileImageSchema")),
    diamonds: v.number(), // In-app currency
    isPlatinum: v.boolean(), // Platinum membership status
    friends: v.array(v.id("users")), // References to other users
    createdAt: v.number(), // Timestamp
    userId: v.string(),
    session: v.array(v.id("sessionTable")),
    role: v.id("roleTable"),
    updatedAt: v.number(),
    // Additional fields like stats, achievements, etc.
  }).index("by_userId", ["userId", "username", "email"]),

  profileImageSchema: defineTable({
    _id: v.id("profileImageSchema"),
    altText: v.string(),
    imageUrl: v.string(),
    userId: v.string(),
  }).index("by_userId", ["userId", "altText"]),

  sessionTable: defineTable({
    _id: v.id("sessionTable"),
    userId: v.string(),
    sessionId: v.string(),
    expiresAt: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_userId", ["userId", "sessionId"]),

  roleTable: defineTable({
    _id: v.id("roleTable"),
    userId: v.string(),
    role: v.union(v.literal("admin"), v.literal("user")),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_userId", ["userId", "role"]),

  permissionsTable: defineTable({
    action: v.union(
      v.literal("read"),
      v.literal("write"),
      v.literal("delete"),
      v.literal("create")
    ),
    access: v.union(v.literal("own"), v.literal("any")),
    description: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_action_access", ["action", "access"]),

  puzzles: defineTable({
    _id: v.id("puzzles"),
    date: v.string(), // Format: 'YYYY-MM-DD', for daily puzzles
    theme: v.string(),
    words: v.array(v.string()), // List of words in the puzzle
    grid: v.array(v.array(v.string())), // 2D array representing the puzzle grid
    createdAt: v.number(),
    updatedAt: v.number(),
    // Additional fields like hints, solution, etc.
  }).index("by_date", ["date"]), // Index for fetching today's puzzle

  leaderboards: defineTable({
    _id: v.id("leaderboards"),
    puzzleId: v.id("puzzles"),
    rankings: v.array(
      v.object({
        userId: v.id("users"),
        username: v.string(),
        score: v.number(),
        completionTime: v.number(),
      })
    ),
    updatedAt: v.number(),
  }).index("by_puzzle", ["puzzleId"]),

  userProgress: defineTable({
    _id: v.id("userProgress"),
    userId: v.id("users"),
    puzzleId: v.id("puzzles"),
    guesses: v.array(v.string()), // User's guesses
    hintsUsed: v.number(),
    completed: v.boolean(),
    completionTime: v.optional(v.number()), // Time taken to complete the puzzle (in seconds or milliseconds)
    score: v.optional(v.number()), // User's score for the puzzle
    accuracy: v.optional(v.number()), // Percentage of correct guesses
    attempts: v.number(), // Number of attempts made
    startedAt: v.number(), // Timestamp when the user started the puzzle
    completedAt: v.optional(v.number()), // Timestamp when the user completed the puzzle
    updatedAt: v.number(),
    // Additional fields can be added as needed
  }).index("by_user_puzzle", ["userId", "puzzleId"]),

  // Hints table
  hints: defineTable({
    _id: v.id("hints"),
    puzzleId: v.id("puzzles"),
    hints: v.array(
      v.object({
        wordIndex: v.number(), // Index of the word in the puzzle
        hintText: v.string(),
      })
    ),
    createdAt: v.number(),
  }),

  achievements: defineTable({
    _id: v.id("achievements"),
    userId: v.id("users"),
    achievementType: v.string(), // e.g., 'FirstPuzzleCompleted', 'PerfectScore'
    description: v.string(),
    achievedAt: v.number(),
  }).index("by_user", ["userId"]),
});
