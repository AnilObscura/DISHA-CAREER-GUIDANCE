// convex/colleges.ts

import { query, mutation } from "./_generated/server";
import { ConvexError } from "convex/values";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

// Get colleges with filtering and pagination
export const getColleges = query({
  args: {
    paginationOpts: paginationOptsValidator,
    city: v.optional(v.string()),
    state: v.optional(v.string()),
    stream: v.optional(v.string()),
    searchQuery: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let query;
    
    // Correctly build the query conditionally
    if (args.city && args.state && args.city !== 'all' && args.state !== 'all') {
      query = ctx.db
        .query("colleges")
        .withIndex("by_location", (q) => q.eq("city", args.city!).eq("state", args.state!));
    } else {
      query = ctx.db.query("colleges");
    }
    
    let allColleges = await query.collect();
    
    // Apply remaining filters in JavaScript
    const filteredColleges = allColleges.filter(college => {
      if (args.searchQuery) {
        const searchLower = args.searchQuery.toLowerCase();
        if (!college.name.toLowerCase().includes(searchLower) && !college.city.toLowerCase().includes(searchLower)) {
          return false;
        }
      }

      if (args.stream && args.stream !== 'all') {
        if (!college.courses.some(course => course.stream === args.stream)) {
            return false;
        }
      }

      return true;
    });

    // Manual pagination after in-memory filtering
    const { numItems, cursor } = args.paginationOpts;
    const startIndex = cursor ? parseInt(cursor) : 0;
    const page = filteredColleges.slice(startIndex, startIndex + numItems);
    const isDone = startIndex + page.length >= filteredColleges.length;
    const newCursor = isDone ? "end" : (startIndex + page.length).toString();

    return {
      page,
      isDone,
      continueCursor: newCursor
    };
  },
});


// Add sample colleges (for development/testing)
export const addSampleColleges = mutation({
  args: {},
  handler: async (ctx) => {
    const existingColleges = await ctx.db.query("colleges").take(1);
    if (existingColleges.length > 0) {
      return "Sample colleges already exist";
    }

    const sampleColleges = [
      {
        name: "Government College of Arts and Science",
        location: "Central District",
        city: "Mumbai",
        state: "Maharashtra",
        type: "Government",
        establishedYear: 1962,
        affiliation: "University of Mumbai",
        courses: [
          { name: "B.A. (English)", stream: "Arts", duration: "3 years", eligibility: "10+2", cutoff: "85", fees: "15000" },
          { name: "B.Com", stream: "Commerce", duration: "3 years", eligibility: "10+2", cutoff: "88", fees: "18000" },
          { name: "B.Sc. (Mathematics)", stream: "Science", duration: "3 years", eligibility: "10+2 with Science", cutoff: "90", fees: "20000" }
        ],
        facilities: ["Library", "Hostel", "Computer Lab", "Sports Complex", "WiFi"],
        contact: {
          phone: "+91 22 1234 5678",
          email: "info@gcas-mumbai.edu.in",
          website: "www.gcas-mumbai.edu.in"
        },
        rating: 4.2
      },
      {
        name: "Dr. A.P.J. Abdul Kalam Government College",
        location: "Tech Park Area",
        city: "Bangalore",
        state: "Karnataka",
        type: "Government",
        establishedYear: 1995,
        affiliation: "Bangalore University",
        courses: [
          { name: "B.Sc. Computer Science", stream: "Science", duration: "3 years", eligibility: "10+2 with Mathematics", cutoff: "92", fees: "25000" },
          { name: "B.Com (Hons)", stream: "Commerce", duration: "3 years", eligibility: "10+2", cutoff: "90", fees: "22000" },
          { name: "BBA", stream: "Commerce", duration: "3 years", eligibility: "10+2", cutoff: "87", fees: "28000" }
        ],
        facilities: ["Digital Library", "Hostel", "Computer Lab", "Innovation Center", "WiFi", "Canteen"],
        contact: {
          phone: "+91 80 9876 5432",
          email: "admissions@apjgc-blr.edu.in",
          website: "www.apjgc-bangalore.edu.in"
        },
        rating: 4.5
      }
    ];

    for (const college of sampleColleges) {
      // The type of 'college' here matches the schema exactly now
      await ctx.db.insert("colleges", college as any); // Using 'as any' to bypass strict type check for seeding
    }

    return "Sample colleges added successfully";
  },
});

// ... your other functions in colleges.ts