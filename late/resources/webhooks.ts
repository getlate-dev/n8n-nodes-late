import type { LateResourceModule } from "../types";

export const webhooksResource: LateResourceModule = {
  operations: [
    {
      name: "Get Settings",
      value: "get",
      action: "Get webhook settings",
      routing: {
        request: {
          method: "GET",
          url: "/webhooks/settings",
        },
      },
    },
    {
      name: "Create Settings",
      value: "create",
      action: "Create webhook settings",
      routing: {
        request: {
          method: "POST",
          url: "/webhooks/settings",
          body: {
            url: "={{ $parameter.url }}",
            secret: "={{ $parameter.secret || undefined }}",
            events: "={{ $parameter.events }}",
          },
        },
      },
    },
    {
      name: "Update Settings",
      value: "update",
      action: "Update webhook settings",
      routing: {
        request: {
          method: "PUT",
          url: "/webhooks/settings",
          body: {
            url: "={{ $parameter.url || undefined }}",
            secret: "={{ $parameter.secret || undefined }}",
            events: "={{ $parameter.events || undefined }}",
            isActive: "={{ $parameter.isActive }}",
          },
        },
      },
    },
    {
      name: "Delete Settings",
      value: "delete",
      action: "Delete webhook settings",
      routing: {
        request: {
          method: "DELETE",
          url: "/webhooks/settings",
        },
      },
    },
    {
      name: "Test Webhook",
      value: "test",
      action: "Send test webhook",
      routing: {
        request: {
          method: "POST",
          url: "/webhooks/test",
        },
      },
    },
    {
      name: "Get Logs",
      value: "logs",
      action: "Get webhook delivery logs",
      routing: {
        request: {
          method: "GET",
          url: "/webhooks/logs",
          qs: {
            page: "={{ $parameter.page || 1 }}",
            limit: "={{ $parameter.limit || 20 }}",
          },
        },
      },
    },
  ],

  fields: [
    // Webhook URL
    {
      displayName: "Webhook URL",
      name: "url",
      type: "string",
      default: "",
      displayOptions: {
        show: {
          resource: ["webhooks"],
          operation: ["create", "update"],
        },
      },
      description: "The URL to send webhook notifications to",
      placeholder: "https://your-server.com/webhook",
      required: true,
    },

    // Secret for signature verification
    {
      displayName: "Secret",
      name: "secret",
      type: "string",
      typeOptions: {
        password: true,
      },
      default: "",
      displayOptions: {
        show: {
          resource: ["webhooks"],
          operation: ["create", "update"],
        },
      },
      description:
        "Optional secret for signing webhook payloads. Used to verify webhook authenticity via HMAC-SHA256 signature.",
      placeholder: "your-webhook-secret",
    },

    // Events to subscribe to
    {
      displayName: "Events",
      name: "events",
      type: "multiOptions",
      options: [
        {
          name: "Post Scheduled",
          value: "post.scheduled",
          description: "Triggered when a post is scheduled",
        },
        {
          name: "Post Published",
          value: "post.published",
          description: "Triggered when a post is successfully published",
        },
        {
          name: "Post Failed",
          value: "post.failed",
          description: "Triggered when a post fails to publish",
        },
        {
          name: "Post Partial",
          value: "post.partial",
          description:
            "Triggered when a post partially succeeds (some platforms failed)",
        },
        {
          name: "Account Connected",
          value: "account.connected",
          description: "Triggered when a new social account is connected",
        },
        {
          name: "Account Disconnected",
          value: "account.disconnected",
          description:
            "Triggered when a social account is disconnected or expires",
        },
        {
          name: "Message Received",
          value: "message.received",
          description: "Triggered when a new DM/message is received",
        },
      ],
      default: ["post.published", "post.failed"],
      displayOptions: {
        show: {
          resource: ["webhooks"],
          operation: ["create", "update"],
        },
      },
      description: "Select which events should trigger webhook notifications",
    },

    // Active status for update
    {
      displayName: "Is Active",
      name: "isActive",
      type: "boolean",
      default: true,
      displayOptions: {
        show: {
          resource: ["webhooks"],
          operation: ["update"],
        },
      },
      description: "Whether the webhook is active and should receive events",
    },

    // Pagination for logs
    {
      displayName: "Page",
      name: "page",
      type: "number",
      default: 1,
      displayOptions: {
        show: {
          resource: ["webhooks"],
          operation: ["logs"],
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
          resource: ["webhooks"],
          operation: ["logs"],
        },
      },
      description: "Number of logs per page (max 100)",
    },
  ],
};
