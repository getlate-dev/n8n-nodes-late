import type { LateResourceModule } from "../types";
import { buildAccountIdField } from "../utils/commonFields";

export const redditResource: LateResourceModule = {
  operations: [
    {
      name: "List Subreddits",
      value: "listSubreddits",
      action: "List saved subreddits",
      routing: {
        request: {
          method: "GET",
          url: "=/accounts/{{ $parameter.accountId }}/reddit-subreddits",
        },
      },
    },
    {
      name: "Update Subreddits",
      value: "updateSubreddits",
      action: "Update saved subreddits",
      routing: {
        request: {
          method: "PUT",
          url: "=/accounts/{{ $parameter.accountId }}/reddit-subreddits",
          body: {
            subredditIds: "={{ $parameter.subredditIds.split(',').map(s => s.trim()).filter(s => s) }}",
          },
        },
      },
    },
    {
      name: "Search Communities",
      value: "search",
      action: "Search Reddit communities",
      routing: {
        request: {
          method: "GET",
          url: "/reddit/search",
          qs: {
            query: "={{ $parameter.query }}",
          },
        },
      },
    },
    {
      name: "Get Feed",
      value: "feed",
      action: "Get subreddit feed",
      routing: {
        request: {
          method: "GET",
          url: "/reddit/feed",
          qs: {
            accountId: "={{ $parameter.accountId }}",
            subreddit: "={{ $parameter.subreddit || undefined }}",
            sort: "={{ $parameter.sort || 'hot' }}",
            limit: "={{ $parameter.limit || 25 }}",
            after: "={{ $parameter.after || undefined }}",
            t: "={{ $parameter.t || undefined }}",
          },
        },
      },
    },
  ],

  fields: [
    // Account ID for subreddit operations
    buildAccountIdField(
      "reddit",
      ["listSubreddits", "updateSubreddits", "feed"],
      "Account ID",
      "The Reddit account ID"
    ),

    // Subreddit IDs for update
    {
      displayName: "Subreddit IDs",
      name: "subredditIds",
      type: "string",
      default: "",
      displayOptions: {
        show: {
          resource: ["reddit"],
          operation: ["updateSubreddits"],
        },
      },
      description:
        "Comma-separated list of subreddit IDs to save. Get IDs from the search operation.",
      placeholder: "r/programming,r/technology,r/webdev",
      required: true,
    },

    // Search query
    {
      displayName: "Search Query",
      name: "query",
      type: "string",
      default: "",
      displayOptions: {
        show: {
          resource: ["reddit"],
          operation: ["search"],
        },
      },
      description: "Search query to find Reddit communities/subreddits",
      placeholder: "programming",
      required: true,
    },

    // Feed fields
    {
      displayName: "Subreddit",
      name: "subreddit",
      type: "string",
      default: "",
      displayOptions: {
        show: {
          resource: ["reddit"],
          operation: ["feed"],
        },
      },
      description:
        "Subreddit name to fetch (without r/). Leave empty for home feed.",
      placeholder: "programming",
    },
    {
      displayName: "Sort",
      name: "sort",
      type: "options",
      options: [
        { name: "Hot", value: "hot" },
        { name: "New", value: "new" },
        { name: "Top", value: "top" },
        { name: "Rising", value: "rising" },
      ],
      default: "hot",
      displayOptions: {
        show: {
          resource: ["reddit"],
          operation: ["feed"],
        },
      },
      description: "Sort order for feed items",
    },
    {
      displayName: "Limit",
      name: "limit",
      type: "number",
      default: 25,
      displayOptions: {
        show: {
          resource: ["reddit"],
          operation: ["feed"],
        },
      },
      description: "Number of posts to fetch (max 100)",
    },
    {
      displayName: "After",
      name: "after",
      type: "string",
      default: "",
      displayOptions: {
        show: {
          resource: ["reddit"],
          operation: ["feed"],
        },
      },
      description: "Pagination cursor for fetching next page of results",
      placeholder: "t3_abc123",
    },
    {
      displayName: "Time Filter",
      name: "t",
      type: "options",
      options: [
        { name: "Hour", value: "hour" },
        { name: "Day", value: "day" },
        { name: "Week", value: "week" },
        { name: "Month", value: "month" },
        { name: "Year", value: "year" },
        { name: "All Time", value: "all" },
      ],
      default: "day",
      displayOptions: {
        show: {
          resource: ["reddit"],
          operation: ["feed"],
          sort: ["top"],
        },
      },
      description: "Time filter for top posts",
    },
  ],
};
