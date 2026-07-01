import { mutation } from "./_generated/server";
import { api } from "./_generated/api";

// Initialize the application with sample data
export const initializeApp = mutation({
  args: {},
  handler: async (ctx) => {
    // Add sample colleges
    await ctx.runMutation(api.colleges.addSampleColleges);
    
    // Add sample notifications
    await ctx.runMutation(api.notifications.addSampleNotifications);
    
    return "Application initialized with sample data";
  },
});