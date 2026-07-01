// convex/auth.config.js

export default {
  providers: [
    {
      // Using a custom passwordless provider
      domain: process.env.CONVEX_SITE,
      applicationID: "convex",
    },
  ]
};