import type { LateResourceModule } from "../types";
import {
  buildProfileIdField,
  buildAccountIdField,
} from "../utils/commonFields";

export const queueResource: LateResourceModule = {
  operations: [
    {
      name: "List Slots",
      value: "list",
      action: "List queue slots",
      routing: {
        request: {
          method: "GET",
          url: "/queue/slots",
          qs: {
            profileId: "={{ $parameter.profileId || undefined }}",
            accountId: "={{ $parameter.accountId || undefined }}",
          },
        },
      },
    },
    {
      name: "Create Slot",
      value: "create",
      action: "Create queue slot",
      routing: {
        request: {
          method: "POST",
          url: "/queue/slots",
          body: {
            profileId: "={{ $parameter.profileId }}",
            accountId: "={{ $parameter.accountId || undefined }}",
            dayOfWeek: "={{ $parameter.dayOfWeek }}",
            time: "={{ $parameter.time }}",
            timezone: "={{ $parameter.timezone || 'UTC' }}",
          },
        },
      },
    },
    {
      name: "Update Slot",
      value: "update",
      action: "Update queue slot",
      routing: {
        request: {
          method: "PUT",
          url: "=/queue/slots/{{ $parameter.slotId }}",
          body: {
            dayOfWeek: "={{ $parameter.dayOfWeek || undefined }}",
            time: "={{ $parameter.time || undefined }}",
            timezone: "={{ $parameter.timezone || undefined }}",
            isActive: "={{ $parameter.isActive }}",
          },
        },
      },
    },
    {
      name: "Delete Slot",
      value: "delete",
      action: "Delete queue slot",
      routing: {
        request: {
          method: "DELETE",
          url: "=/queue/slots/{{ $parameter.slotId }}",
        },
      },
    },
    {
      name: "Preview Queue",
      value: "preview",
      action: "Preview upcoming queue posts",
      routing: {
        request: {
          method: "GET",
          url: "/queue/preview",
          qs: {
            profileId: "={{ $parameter.profileId || undefined }}",
            accountId: "={{ $parameter.accountId || undefined }}",
            days: "={{ $parameter.days || 7 }}",
          },
        },
      },
    },
    {
      name: "Get Next Slot",
      value: "nextSlot",
      action: "Get next available queue slot",
      routing: {
        request: {
          method: "GET",
          url: "/queue/next-slot",
          qs: {
            profileId: "={{ $parameter.profileId || undefined }}",
            accountId: "={{ $parameter.accountId || undefined }}",
          },
        },
      },
    },
  ],

  fields: [
    // Profile ID for filtering and creation
    {
      ...buildProfileIdField("queue", ["list", "create", "preview", "nextSlot"], false),
      description:
        "Filter queue slots by profile. Required for create operation.",
    },

    // Account ID for filtering
    {
      ...buildAccountIdField(
        "queue",
        ["list", "create", "preview", "nextSlot"],
        "Account ID",
        "Filter queue slots by specific account (optional)"
      ),
      required: false,
    },

    // Slot ID for update/delete
    {
      displayName: "Slot ID",
      name: "slotId",
      type: "string",
      default: "",
      displayOptions: {
        show: {
          resource: ["queue"],
          operation: ["update", "delete"],
        },
      },
      description: "The queue slot ID to update or delete",
      required: true,
    },

    // Day of week
    {
      displayName: "Day of Week",
      name: "dayOfWeek",
      type: "options",
      options: [
        { name: "Sunday", value: 0 },
        { name: "Monday", value: 1 },
        { name: "Tuesday", value: 2 },
        { name: "Wednesday", value: 3 },
        { name: "Thursday", value: 4 },
        { name: "Friday", value: 5 },
        { name: "Saturday", value: 6 },
      ],
      default: 1,
      displayOptions: {
        show: {
          resource: ["queue"],
          operation: ["create", "update"],
        },
      },
      description: "Day of the week for this queue slot",
    },

    // Time
    {
      displayName: "Time",
      name: "time",
      type: "string",
      default: "09:00",
      displayOptions: {
        show: {
          resource: ["queue"],
          operation: ["create", "update"],
        },
      },
      description: "Time for this queue slot in HH:MM format (24-hour)",
      placeholder: "09:00",
    },

    // Timezone
    {
      displayName: "Timezone",
      name: "timezone",
      type: "string",
      default: "UTC",
      displayOptions: {
        show: {
          resource: ["queue"],
          operation: ["create", "update"],
        },
      },
      description:
        "Timezone for the queue slot. Use standard timezone names like 'America/New_York', 'Europe/London', etc.",
      placeholder: "America/New_York",
    },

    // Is Active for update
    {
      displayName: "Is Active",
      name: "isActive",
      type: "boolean",
      default: true,
      displayOptions: {
        show: {
          resource: ["queue"],
          operation: ["update"],
        },
      },
      description: "Whether this queue slot is active",
    },

    // Days for preview
    {
      displayName: "Days",
      name: "days",
      type: "number",
      default: 7,
      displayOptions: {
        show: {
          resource: ["queue"],
          operation: ["preview"],
        },
      },
      description: "Number of days to preview (max 30)",
    },
  ],
};
