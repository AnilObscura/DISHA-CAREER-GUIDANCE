import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get recent notifications
export const getRecent = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const notifications = await ctx.db
      .query("notifications")
      .withIndex("by_date")
      .filter((q) => q.eq(q.field("isActive"), true))
      .order("desc")
      .take(args.limit || 10);

    return notifications;
  },
});

// Get notifications by type
export const getByType = query({
  args: {
    type: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const notifications = await ctx.db
      .query("notifications")
      .withIndex("by_type")
      .filter((q) => 
        q.and(
          q.eq(q.field("type"), args.type),
          q.eq(q.field("isActive"), true)
        )
      )
      .order("desc")
      .take(args.limit || 10);

    return notifications;
  },
});

// Get notifications for user's class/audience
export const getForUser = query({
  args: {
    targetAudience: v.array(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // Get all active notifications and filter in JavaScript
    // since complex array operations are not well supported in Convex filters
    const notifications = await ctx.db
      .query("notifications")
      .filter((q) => q.eq(q.field("isActive"), true))
      .order("desc")
      .take(args.limit ? args.limit * 2 : 40); // Get more to filter

    // Filter notifications that match any of the user's target audiences
    const filtered = notifications.filter(notification =>
      notification.targetAudience.some(audience =>
        args.targetAudience.includes(audience)
      )
    );

    return filtered.slice(0, args.limit || 20);
  },
});

// Add sample notifications
export const addSampleNotifications = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if notifications already exist
    const existing = await ctx.db.query("notifications").take(1);
    if (existing.length > 0) {
      return "Sample notifications already exist";
    }

    const sampleNotifications = [
      {
        title: "College Admission Deadline Approaching",
        description: "Last date to submit applications for government colleges is March 15, 2024",
        type: "admission",
        date: Date.now() + (3 * 24 * 60 * 60 * 1000), // 3 days from now
        targetAudience: ["class12", "undergraduate"],
        priority: "high",
        link: "/colleges",
        isActive: true
      },
      {
        title: "Scholarship Applications Open",
        description: "Merit-based scholarships for economically weaker sections now accepting applications",
        type: "scholarship", 
        date: Date.now() + (19 * 24 * 60 * 60 * 1000), // 19 days from now
        endDate: Date.now() + (45 * 24 * 60 * 60 * 1000), // 45 days from now
        targetAudience: ["class10", "class12", "undergraduate"],
        priority: "medium",
        isActive: true
      },
      {
        title: "JEE Main Registration Opens",
        description: "Joint Entrance Examination (Main) registration begins April 15, 2024",
        type: "exam",
        date: Date.now() + (33 * 24 * 60 * 60 * 1000), // 33 days from now
        targetAudience: ["class12"],
        priority: "high",
        isActive: true
      },
      {
        title: "Career Counseling Sessions",
        description: "Free career guidance sessions by industry experts every Saturday",
        type: "counseling",
        date: Date.now() - (2 * 24 * 60 * 60 * 1000), // 2 days ago (ongoing)
        targetAudience: ["class10", "class12"],
        priority: "medium",
        isActive: true
      }
    ];

    for (const notification of sampleNotifications) {
      await ctx.db.insert("notifications", notification);
    }

    return "Sample notifications added successfully";
  },
});