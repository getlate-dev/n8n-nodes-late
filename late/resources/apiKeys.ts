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
          url: "/v1/api-keys",
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
          url: "/v1/api-keys",
          body: {
            name: "={{ $parameter.name }}",
            expiresIn: "={{ $parameter.expiresIn || undefined }}",
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
          url: "=/v1/api-keys/{{ $parameter.keyId }}",
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
      placeholder: "Production API Key",
      required: true,
    },

    // Expiration days for create
    {
      displayName: "Expires In (Days)",
      name: "expiresIn",
      type: "number",
      default: 0,
      displayOptions: {
        show: {
          resource: ["apiKeys"],
          operation: ["create"],
        },
      },
      description: "Optional number of days until the API key expires. Leave empty or set to 0 for no expiration.",
      placeholder: "365",
    },
  ],
};