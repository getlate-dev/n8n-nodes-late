import type { LateResourceModule } from "../types";

export const apiKeysResource: LateResourceModule = {
  operations: [
    {
      name: "List",
      value: "list",
      action: "List API keys",
      routing: {
        request: {
          method: "GET",
          url: "/api-keys",
        },
      },
    },
    {
      name: "Create",
      value: "create",
      action: "Create API key",
      routing: {
        request: {
          method: "POST",
          url: "/api-keys",
          body: {
            name: "={{ $parameter.name }}",
            expiresAt: "={{ $parameter.expiresAt || undefined }}",
          },
        },
      },
    },
    {
      name: "Delete",
      value: "delete",
      action: "Delete API key",
      routing: {
        request: {
          method: "DELETE",
          url: "=/api-keys/{{ $parameter.keyId }}",
        },
      },
    },
  ],

  fields: [
    // Key ID for delete
    {
      displayName: "Key ID",
      name: "keyId",
      type: "string",
      default: "",
      displayOptions: {
        show: {
          resource: ["apiKeys"],
          operation: ["delete"],
        },
      },
      description: "The API key ID to delete. Get IDs from the 'List' operation.",
      required: true,
    },

    // Name for create
    {
      displayName: "Name",
      name: "name",
      type: "string",
      default: "",
      displayOptions: {
        show: {
          resource: ["apiKeys"],
          operation: ["create"],
        },
      },
      description: "A descriptive name for the API key (e.g., 'Production', 'n8n Integration')",
      placeholder: "My API Key",
      required: true,
    },

    // Expiration date for create
    {
      displayName: "Expires At",
      name: "expiresAt",
      type: "dateTime",
      default: "",
      displayOptions: {
        show: {
          resource: ["apiKeys"],
          operation: ["create"],
        },
      },
      description: "Optional expiration date for the API key. Leave empty for no expiration.",
    },
  ],
};
