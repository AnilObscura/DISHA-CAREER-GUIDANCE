// convex/assessments.ts
import { query, mutation } from "./_generated/server";
import { ConvexError } from "convex/values";
import { v } from "convex/values";
import { api } from "./_generated/api";

// Save assessment results
export const saveAssessment = mutation({
  args: {
    userId: v.string(),
    type: v.string(), // "aptitude", "interest", "personality"
    questions: v.array(v.object({
      questionId: v.string(),
      answer: v.union(v.string(), v.number()),
    })),
    scores: v.object({
      science: v.number(),
      commerce: v.number(),
      arts: v.number(),
      vocational: v.number(),
    }),
    recommendedStreams: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const assessmentId = await ctx.db.insert("assessments", {
      userId: args.userId,
      type: args.type,
      questions: args.questions,
      scores: args.scores,
      recommendedStreams: args.recommendedStreams,
      completedAt: Date.now(),
    });

    // Update user progress (skip if user not authenticated in Convex)
    try {
      await ctx.runMutation(api.users.updateProgress, {
        milestoneType: "assessment_completed",
        description: `Completed ${args.type} assessment`,
        selectedStream: args.recommendedStreams[0], // Set top recommended stream
      });
    } catch (error) {
      // Ignore progress update errors for now
      console.log("Progress update skipped:", error);
    }

    return await ctx.db.get(assessmentId);
  },
});


// Get user's assessment history
export const getUserAssessments = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }

    const assessments = await ctx.db
      .query("assessments")
      .withIndex("by_user_id")
      .filter((q) => q.eq(q.field("userId"), identity.tokenIdentifier))
      .order("desc")
      .collect();

    return assessments;
  },
});

// Get latest assessment by type
export const getLatestAssessment = query({
  args: {
    type: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }

    const assessment = await ctx.db
      .query("assessments")
      .withIndex("by_user_id")
      .filter((q) => 
        q.and(
          q.eq(q.field("userId"), identity.tokenIdentifier),
          q.eq(q.field("type"), args.type)
        )
      )
      .order("desc")
      .first();

    return assessment;
  },
});