// convex/schema.ts

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    userId: v.string(),
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
    createdAt: v.number(),
  }).index("by_user_id", ["userId"]),

  assessments: defineTable({
    userId: v.string(),
    type: v.string(),
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
    completedAt: v.number(),
  }).index("by_user_id", ["userId"]),

  colleges: defineTable({
    name: v.string(),
    location: v.string(),
    city: v.string(),
    state: v.string(),
    type: v.string(),
    establishedYear: v.optional(v.number()),
    affiliation: v.optional(v.string()),
    courses: v.array(v.object({
      name: v.string(),
      stream: v.string(),
      duration: v.string(),
      eligibility: v.string(),
      cutoff: v.optional(v.string()),
      fees: v.optional(v.string()),
    })),
    facilities: v.array(v.string()),
    contact: v.object({
      phone: v.optional(v.string()),
      email: v.optional(v.string()),
      website: v.optional(v.string()),
    }),
    rating: v.optional(v.number()),
  }).index("by_location", ["city", "state"]),

  careers: defineTable({
    courseName: v.string(),
    stream: v.string(),
    description: v.string(),
    duration: v.optional(v.string()),
    eligibility: v.optional(v.string()),
    eligibilityFilter: v.optional(v.string()),
    eligibilityDisplay: v.optional(v.string()),
    careerOptions: v.array(v.object({
      title: v.string(),
      description: v.string(),
      averageSalary: v.optional(v.string()),
      growthProspects: v.string(),
    })),
    higherEducation: v.array(v.object({
      course: v.string(),
      eligibility: v.string(),
      entranceExams: v.array(v.string()),
    })),
    governmentExams: v.array(v.string()),
    skillsRequired: v.array(v.string()),
    industryDemand: v.string(),
    demand_score: v.float64(),
    risk_score: v.float64(),
    averageSalary: v.optional(v.string()),
    futureScope: v.optional(v.string()),
    jobGrowth: v.optional(v.string()),
  }).index("by_stream", ["stream"]),

  notifications: defineTable({
    title: v.string(),
    description: v.string(),
    type: v.string(),
    date: v.number(),
    endDate: v.optional(v.number()),
    targetAudience: v.array(v.string()),
    priority: v.string(),
    link: v.optional(v.string()),
    isActive: v.boolean(),
  }).index("by_date", ["date"])
    .index("by_type", ["type"]),

  bookmarks: defineTable({
    userId: v.string(),
    itemType: v.string(),
    itemId: v.string(),
    createdAt: v.number(),
  }).index("by_user_id", ["userId"])
    .index("by_user_and_type", ["userId", "itemType"]),

  resources: defineTable({
    title: v.string(),
    description: v.string(),
    type: v.string(),
    category: v.string(),
    fileUrl: v.optional(v.id("_storage")),
    externalUrl: v.optional(v.string()),
    tags: v.array(v.string()),
    difficulty: v.string(),
    downloadCount: v.number(),
    isApproved: v.boolean(),
  }).index("by_category", ["category"])
    .index("by_type", ["type"]),

  userProgress: defineTable({
    userId: v.string(),
    milestones: v.array(v.object({
      type: v.string(),
      date: v.number(),
      description: v.string(),
    })),
    selectedStream: v.optional(v.string()),
    selectedColleges: v.array(v.string()),
    selectedCourses: v.array(v.string()),
    lastActive: v.number(),
  }).index("by_user_id", ["userId"]),
  
  chatbotMessages: defineTable({
    userId: v.string(),
    message: v.string(),
    response: v.string(),
    timestamp: v.number(),
  }).index("by_user_id", ["userId"]),
});