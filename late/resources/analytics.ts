import type { LateResourceModule } from "../types";
import { SUPPORTED_PLATFORMS } from "../utils/platformHelpers";
import { buildAccountIdField } from "../utils/commonFields";

export const analyticsResource: LateResourceModule = {
  operations: [
    {
      name: "Get Analytics",
      value: "get",
      action: "Get post analytics",
      routing: {
        request: {
          method: "GET",
          url: "/analytics",
          qs: {
            startDate: "={{ $parameter.startDate || undefined }}",
            endDate: "={{ $parameter.endDate || undefined }}",
            platform: "={{ $parameter.platform || undefined }}",
            accountId: "={{ $parameter.accountId || undefined }}",
          },
        },
      },
    },
    {
      name: "YouTube Daily Views",
      value: "youtubeDailyViews",
      action: "Get YouTube daily views",
      routing: {
        request: {
          method: "GET",
          url: "/analytics/youtube/daily-views",
          qs: {
            accountId: "={{ $parameter.accountId }}",
            startDate: "={{ $parameter.startDate || undefined }}",
            endDate: "={{ $parameter.endDate || undefined }}",
          },
        },
      },
    },
  ],

  fields: [
    // Start date
    {
      displayName: "Start Date",
      name: "startDate",
      type: "dateTime",
      default: "",
      displayOptions: {
        show: {
          resource: ["analytics"],
          operation: ["get", "youtubeDailyViews"],
        },
      },
      description:
        "Start date for analytics range. Leave empty for default (30 days ago).",
    },

    // End date
    {
      displayName: "End Date",
      name: "endDate",
      type: "dateTime",
      default: "",
      displayOptions: {
        show: {
          resource: ["analytics"],
          operation: ["get", "youtubeDailyViews"],
        },
      },
      description: "End date for analytics range. Leave empty for today.",
    },

    // Platform filter
    {
      displayName: "Platform",
      name: "platform",
      type: "options",
      options: [
        { name: "All Platforms", value: "" },
        ...SUPPORTED_PLATFORMS.map((p) => ({
          name: p.name,
          value: p.value,
        })),
      ],
      default: "",
      displayOptions: {
        show: {
          resource: ["analytics"],
          operation: ["get"],
        },
      },
      description: "Filter analytics by platform",
    },

    // Account ID filter
    {
      ...buildAccountIdField(
        "analytics",
        ["get", "youtubeDailyViews"],
        "Account ID",
        "Filter analytics by specific account (optional for general analytics, required for YouTube daily views)"
      ),
      required: false,
    },
  ],
};
