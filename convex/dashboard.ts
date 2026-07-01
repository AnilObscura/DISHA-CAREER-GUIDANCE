// convex/dashboard.ts

import { query } from "./_generated/server";
import { ConvexError } from "convex/values";

export const getData = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
        throw new ConvexError("User not authenticated.");
    }

    const latestAssessment = await ctx.db
      .query("assessments")
      .withIndex("by_user_id", (q) => q.eq("userId", identity.tokenIdentifier))
      .order("desc")
      .first();

    let recommendedCareers = [];
    if (latestAssessment?.recommendedStreams && latestAssessment.recommendedStreams.length > 0) {
      const topStream = latestAssessment.recommendedStreams[0];
      recommendedCareers = await ctx.db
        .query("careers")
        .withIndex("by_stream", (q) => q.eq("stream", topStream))
        .take(3);
    } else {
      recommendedCareers = await ctx.db.query("careers").take(3);
    }

    const recommendedColleges = await ctx.db
      .query("colleges")
      .take(3);

    return {
      assessment: latestAssessment,
      recommendedCareers,
      recommendedColleges,
    };
  }
});