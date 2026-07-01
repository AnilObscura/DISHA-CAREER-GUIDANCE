import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getUserByEmailAndPassword = query({
  args: { email: v.string(), password: v.string() },
  handler: async (ctx, args) => {
    // Since schema doesn't have password, this is a placeholder
    // In real auth, password is handled by Auth0
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();
    return user;
  },
});

export const addUser = mutation({
  args: {
    userId: v.string(),
    name: v.string(),
    email: v.string(),
    age: v.optional(v.number()),
    gender: v.optional(v.string()),
    currentClass: v.optional(v.string()),
    location: v.optional(v.string()),
    phone: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const createdAt = Date.now();
    const userId = await ctx.db.insert("users", { ...args, createdAt });
    return { _id: userId, ...args, createdAt };
  },
});

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;
    return await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), identity.tokenIdentifier))
      .first();
  },
});

export const getUserProgress = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;
    return await ctx.db
      .query("userProgress")
      .filter((q) => q.eq(q.field("userId"), identity.tokenIdentifier))
      .first();
  },
});

export const updateUserProfile = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    age: v.optional(v.number()),
    gender: v.optional(v.string()),
    currentClass: v.optional(v.string()),
    location: v.optional(v.string()),
    phone: v.optional(v.string()),
    bio: v.optional(v.string()),
    interests: v.optional(v.array(v.string())),
    school: v.optional(v.string()),
    stream: v.optional(v.string()),
    subjects: v.optional(v.array(v.string())),
    percentage: v.optional(v.number()),
    preferredStreams: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), identity.tokenIdentifier))
      .first();

    if (existingUser) {
      // Update existing user
      await ctx.db.patch(existingUser._id, args);
      return { _id: existingUser._id, ...args };
    } else {
      // Create new user if doesn't exist
      const createdAt = Date.now();
      const userId = await ctx.db.insert("users", {
        userId: identity.tokenIdentifier,
        ...args,
        createdAt
      });
      return { _id: userId, ...args, createdAt };
    }
  },
});

export const getUserProfile = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), identity.tokenIdentifier))
      .first();

    return user;
  },
});

export const updateProgress = mutation({
  args: {
    milestoneType: v.string(),
    description: v.string(),
    selectedStream: v.optional(v.string()),
    selectedColleges: v.optional(v.array(v.string())),
    selectedCourses: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const existingProgress = await ctx.db
      .query("userProgress")
      .filter((q) => q.eq(q.field("userId"), identity.tokenIdentifier))
      .first();

    const newMilestone = {
      type: args.milestoneType,
      date: Date.now(),
      description: args.description,
    };

    if (existingProgress) {
      const updatedMilestones = [...existingProgress.milestones, newMilestone];
      await ctx.db.patch(existingProgress._id, {
        milestones: updatedMilestones,
        selectedStream: args.selectedStream || existingProgress.selectedStream,
        selectedColleges: args.selectedColleges || existingProgress.selectedColleges,
        selectedCourses: args.selectedCourses || existingProgress.selectedCourses,
        lastActive: Date.now(),
      });
    } else {
      await ctx.db.insert("userProgress", {
        userId: identity.tokenIdentifier,
        milestones: [newMilestone],
        selectedStream: args.selectedStream,
        selectedColleges: args.selectedColleges || [],
        selectedCourses: args.selectedCourses || [],
        lastActive: Date.now(),
      });
    }
  },
});
