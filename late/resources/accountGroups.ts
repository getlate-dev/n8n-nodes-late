import type { LateResourceModule } from "../types";

export const accountGroupsResource: LateResourceModule = {
  operations: [
    {
      name: "List",
      value: "list",
      action: "List account groups",
      routing: {
        request: {
          method: "GET",
          url: "/account-groups",
        },
      },
    },
    {
      name: "Get",
      value: "get",
      action: "Get account group details",
      routing: {
        request: {
          method: "GET",
          url: "=/account-groups/{{ $parameter.groupId }}",
        },
      },
    },
    {
      name: "Create",
      value: "create",
      action: "Create account group",
      routing: {
        request: {
          method: "POST",
          url: "/account-groups",
          body: {
            name: "={{ $parameter.name }}",
            accountIds: "={{ $parameter.accountIds.split(',').map(s => s.trim()).filter(s => s) }}",
          },
        },
      },
    },
    {
      name: "Update",
      value: "update",
      action: "Update account group",
      routing: {
        request: {
          method: "PUT",
          url: "=/account-groups/{{ $parameter.groupId }}",
          body: {
            name: "={{ $parameter.name || undefined }}",
            accountIds: "={{ $parameter.accountIds ? $parameter.accountIds.split(',').map(s => s.trim()).filter(s => s) : undefined }}",
          },
        },
      },
    },
    {
      name: "Delete",
      value: "delete",
      action: "Delete account group",
      routing: {
        request: {
          method: "DELETE",
          url: "=/account-groups/{{ $parameter.groupId }}",
        },
      },
    },
  ],

  fields: [
    // Group ID for get/update/delete
    {
      displayName: "Group ID",
      name: "groupId",
      type: "string",
      default: "",
      displayOptions: {
        show: {
          resource: ["accountGroups"],
          operation: ["get", "update", "delete"],
        },
      },
      description:
        "The account group ID. Get IDs from the 'List' operation.",
      required: true,
    },

    // Group name
    {
      displayName: "Name",
      name: "name",
      type: "string",
      default: "",
      displayOptions: {
        show: {
          resource: ["accountGroups"],
          operation: ["create", "update"],
        },
      },
      description: "Name for the account group",
      placeholder: "Marketing Accounts",
      required: true,
    },

    // Account IDs
    {
      displayName: "Account IDs",
      name: "accountIds",
      type: "string",
      default: "",
      displayOptions: {
        show: {
          resource: ["accountGroups"],
          operation: ["create", "update"],
        },
      },
      description:
        "Comma-separated list of account IDs to include in this group. Get account IDs from the 'Accounts > List' operation.",
      placeholder: "acc_123,acc_456,acc_789",
      required: true,
    },
  ],
};
