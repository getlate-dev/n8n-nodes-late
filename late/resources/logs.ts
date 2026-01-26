import type { LateResourceModule } from "../types";
import { SUPPORTED_PLATFORMS } from "../utils/platformHelpers";

export const logsResource: LateResourceModule = {
  operations: [
    {
      name: "List",
      value: "list",
      action: "List publishing logs",
      routing: {
        request: {
          method: "GET",
          url: "/logs",
          qs: {
            status: "={{ $parameter.status || undefined }}",
            platform: "={{ $parameter.platform || undefined }}",
            action: "={{ $parameter.action || undefined }}",
            postId: "={{ $parameter.postId || undefined }}",
            page: "={{ $parameter.page || 1 }}",
            limit: "={{ $parameter.limit || 20 }}",
          },
        },
      },
    },
    {
      name: "Get",
      value: "get",
      action: "Get log entry details",
      routing: {
        request: {
          method: "GET",
          url: "=/logs/{{ $parameter.logId }}",
        },
      },
    },
  ],

  fields: [
    // Log ID for get
    {
      displayName: "Log ID",
      name: "logId",
      type: "string",
      default: "",
      displayOptions: {
        show: {
          resource: ["logs"],
          operation: ["get"],
        },
      },
      description: "The log entry ID to retrieve",
      required: true,
    },

    // Status filter
    {
      displayName: "Status",
      name: "status",
      type: "options",
      options: [
        { name: "All", value: "" },
        { name: "Success", value: "success" },
        { name: "Failed", value: "failed" },
        { name: "Pending", value: "pending" },
        { name: "Skipped", value: "skipped" },
      ],
      default: "",
      displayOptions: {
        show: {
          resource: ["logs"],
          operation: ["list"],
        },
      },
      description: "Filter logs by status",
    },

    // Platform filter
    {
      displayName: "Platform",
      name: "platform",
      type: "options",
      options: [
        { name: "All", value: "" },
        ...SUPPORTED_PLATFORMS.map((p) => ({
          name: p.name,
          value: p.value,
        })),
      ],
      default: "",
      displayOptions: {
        show: {
          resource: ["logs"],
          operation: ["list"],
        },
      },
      description: "Filter logs by platform",
    },

    // Action filter
    {
      displayName: "Action",
      name: "action",
      type: "options",
      options: [
        { name: "All", value: "" },
        { name: "Publish", value: "publish" },
        { name: "Retry", value: "retry" },
        { name: "Rate Limit Pause", value: "rate_limit_pause" },
        { name: "Media Upload", value: "media_upload" },
        { name: "Token Refresh", value: "token_refresh" },
      ],
      default: "",
      displayOptions: {
        show: {
          resource: ["logs"],
          operation: ["list"],
        },
      },
      description: "Filter logs by action type",
    },

    // Post ID filter
    {
      displayName: "Post ID",
      name: "postId",
      type: "string",
      default: "",
      displayOptions: {
        show: {
          resource: ["logs"],
          operation: ["list"],
        },
      },
      description: "Filter logs by specific post ID",
      placeholder: "64f0a1b2c3d4e5f6a7b8c9d0",
    },

    // Pagination
    {
      displayName: "Page",
      name: "page",
      type: "number",
      default: 1,
      displayOptions: {
        show: {
          resource: ["logs"],
          operation: ["list"],
        },
      },
      description: "Page number for pagination",
    },
    {
      displayName: "Limit",
      name: "limit",
      type: "number",
      default: 20,
      displayOptions: {
        show: {
          resource: ["logs"],
          operation: ["list"],
        },
      },
      description: "Number of logs per page (max 100)",
    },
  ],
};
