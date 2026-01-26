import type { LateResourceModule } from "../types";
import {
  buildProfileIdField,
  buildAccountIdField,
} from "../utils/commonFields";

export const accountsResource: LateResourceModule = {
  operations: [
    {
      name: "List",
      value: "list",
      action: "List social accounts",
      routing: {
        request: {
          method: "GET",
          url: "/accounts",
          qs: {
            profileId: "={{ $parameter.profileId || undefined }}",
          },
        },
      },
    },
    {
      name: "Get",
      value: "get",
      action: "Get account details",
      routing: {
        request: {
          method: "GET",
          url: "=/accounts/{{ $parameter.accountId }}",
        },
      },
    },
    {
      name: "Update",
      value: "update",
      action: "Update account",
      routing: {
        request: {
          method: "PUT",
          url: "=/accounts/{{ $parameter.accountId }}",
          body: {
            displayName: "={{ $parameter.displayName || undefined }}",
            isActive: "={{ $parameter.isActive }}",
          },
        },
      },
    },
    {
      name: "Delete",
      value: "delete",
      action: "Disconnect account",
      routing: {
        request: {
          method: "DELETE",
          url: "=/accounts/{{ $parameter.accountId }}",
        },
      },
    },
    {
      name: "Get Health",
      value: "health",
      action: "Check account health",
      routing: {
        request: {
          method: "GET",
          url: "=/accounts/{{ $parameter.accountId }}/health",
        },
      },
    },
    {
      name: "Get All Health",
      value: "allHealth",
      action: "Check all accounts health",
      routing: {
        request: {
          method: "GET",
          url: "/accounts/health",
          qs: {
            profileId: "={{ $parameter.profileId || undefined }}",
          },
        },
      },
    },
    {
      name: "Get Follower Stats",
      value: "followerStats",
      action: "Get follower statistics",
      routing: {
        request: {
          method: "GET",
          url: "/accounts/follower-stats",
          qs: {
            profileId: "={{ $parameter.profileId || undefined }}",
            accountId: "={{ $parameter.accountId || undefined }}",
          },
        },
      },
    },
  ],

  fields: [
    // Profile ID for filtering (optional)
    {
      ...buildProfileIdField("accounts", ["list", "allHealth", "followerStats"], false),
      description:
        "Optional: Filter accounts by a specific profile ID. Leave empty to see all connected accounts across all profiles.",
      placeholder: "profile_123_abc",
    },

    // Account ID for operations
    {
      ...buildAccountIdField("accounts", ["get", "update", "delete", "health"]),
      description:
        "The unique ID of the social media account. You can get this from the 'List' operation.",
    },

    // Account ID for follower stats (optional)
    {
      displayName: "Account ID (Optional)",
      name: "accountId",
      type: "string",
      default: "",
      displayOptions: {
        show: {
          resource: ["accounts"],
          operation: ["followerStats"],
        },
      },
      description:
        "Optional: Filter follower stats by specific account ID. Leave empty for all accounts.",
      required: false,
    },

    // Display name for update
    {
      displayName: "Display Name",
      name: "displayName",
      type: "string",
      default: "",
      displayOptions: {
        show: {
          resource: ["accounts"],
          operation: ["update"],
        },
      },
      description: "Custom display name for the account",
      placeholder: "My Business Account",
    },

    // Is Active for update
    {
      displayName: "Is Active",
      name: "isActive",
      type: "boolean",
      default: true,
      displayOptions: {
        show: {
          resource: ["accounts"],
          operation: ["update"],
        },
      },
      description:
        "Whether the account is active. Inactive accounts won't receive scheduled posts.",
    },
  ],
};
