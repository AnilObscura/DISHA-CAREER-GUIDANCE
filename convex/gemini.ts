// convex/gemini.ts

import { action } from "./_generated/server";
import { v } from "convex/values";
import { api, internal } from "./_generated/api";
import { Doc } from "./_generated/dataModel";

// Action to call the Gemini API
export const chat = action({
  args: {
    message: v.string(),
  },
  handler: async (ctx, { message }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("User not authenticated.");
    }
    const userId = identity.tokenIdentifier;

    // Fetch recent chat history and app data for context
    const recentMessages: Doc<"chatbotMessages">[] = await ctx.runQuery(
      internal.chatbot.getHistoryInternal,
      { userId }
    );
    
    // THIS LINE IS NOW CORRECTED
    const colleges = await ctx.runQuery(api.colleges.getColleges, { paginationOpts: { numItems: 5, cursor: null }});
    
    const careers = await ctx.runQuery(api.careers.get);

    const collegeNames = colleges.page.map(c => c.name).join(", ");
    const careerStreams = [...new Set(careers.map(c => c.stream))].join(", ");

    // Construct a powerful prompt for Gemini
    const systemPrompt = `You are "Disha," a friendly and expert career counselor for students in Jammu & Kashmir. Your goal is to provide helpful, encouraging, and accurate advice. Be concise.

    Here is some context about the data available in the app:
    - Available Colleges: ${collegeNames}
    - Available Career Streams: ${careerStreams}

    Do not suggest any colleges or careers not in these lists. Guide the user towards exploring the app's features like assessments, college filters, and career pages.`;
    
    const history = recentMessages.map(msg => ([
        { role: "user", parts: [{ text: msg.message }] },
        { role: "model", parts: [{ text: msg.response }] }
    ])).flat();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set in environment variables.");
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [ ...history, { role: "user", parts: [{ text: message }] } ],
          systemInstruction: { role: "system", parts: [{ text: systemPrompt }] }
        }),
      }
    );

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Gemini API call failed: ${errorText}`);
    }

    const responseData = await response.json();
    const botResponse = responseData.candidates[0].content.parts[0].text;

    // Save the complete conversation back to the database
    await ctx.runMutation(internal.chatbot.saveMessage, {
      userId,
      message,
      response: botResponse,
    });
  },
});