// convex/chatbot.ts

import { mutation, query, internalMutation, internalQuery } from "./_generated/server";
import { v } from "convex/values";
import { ConvexError } from "convex/values";
import { api, internal } from "./_generated/api";

// PUBLIC QUERY: Gets history for the frontend UI
export const getHistory = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];
    
    return await ctx.db
      .query("chatbotMessages")
      .withIndex("by_user_id", (q) => q.eq("userId", identity.tokenIdentifier))
      .order("asc")
      .take(100);
  },
});

// INTERNAL QUERY: Gets history for the Gemini action's context
export const getHistoryInternal = internalQuery({
    args: { userId: v.string() },
    handler: async (ctx, { userId }) => {
        return await ctx.db
            .query("chatbotMessages")
            .withIndex("by_user_id", q => q.eq("userId", userId))
            .order("desc")
            .take(10); // Provide last 10 messages for context
    }
});

// PUBLIC MUTATION: Called by the frontend to start the chat process
export const sendMessage = mutation({
  args: {
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("User not authenticated");

    // Immediately save the user's message with a placeholder for the response
    await ctx.db.insert("chatbotMessages", {
        userId: identity.tokenIdentifier,
        message: args.message,
        response: "...", // Placeholder indicates AI is "thinking"
        timestamp: Date.now(),
    });

    // Schedule the Gemini action to generate and save the real response
    await ctx.scheduler.runAfter(0, api.gemini.chat, {
      message: args.message,
    });
  },
});

// INTERNAL MUTATION: Used only by the Gemini action to update the final response
export const saveMessage = internalMutation({
    args: {
        userId: v.string(),
        message: v.string(),
        response: v.string(),
    },
    handler: async (ctx, { userId, response }) => {
        const lastMessage = await ctx.db
            .query("chatbotMessages")
            .withIndex("by_user_id", q => q.eq("userId", userId))
            .order("desc")
            .first();

        if (lastMessage && lastMessage.response === "...") {
            await ctx.db.patch(lastMessage._id, { response });
        }
    }
});