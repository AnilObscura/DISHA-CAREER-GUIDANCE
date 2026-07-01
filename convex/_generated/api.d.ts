/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as assessments from "../assessments.js";
import type * as careers from "../careers.js";
import type * as chatbot from "../chatbot.js";
import type * as colleges from "../colleges.js";
import type * as dashboard from "../dashboard.js";
import type * as gemini from "../gemini.js";
import type * as init from "../init.js";
import type * as notifications from "../notifications.js";
import type * as test from "../test.js";
import type * as users from "../users.js";
import type * as usersJson from "../usersJson.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  assessments: typeof assessments;
  careers: typeof careers;
  chatbot: typeof chatbot;
  colleges: typeof colleges;
  dashboard: typeof dashboard;
  gemini: typeof gemini;
  init: typeof init;
  notifications: typeof notifications;
  test: typeof test;
  users: typeof users;
  usersJson: typeof usersJson;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
