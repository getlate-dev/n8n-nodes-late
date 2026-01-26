import type { LateResourceModule } from "../types";

export const usersResource: LateResourceModule = {
  operations: [
    {
      name: "List",
      value: "list",
      action: "List users",
      routing: {
        request: {
          method: "GET",
          url: "/users",
        },
      },
    },
    {
      name: "Get",
      value: "get",
      action: "Get user details",
      routing: {
        request: {
          method: "GET",
          url: "=/users/{{ $parameter.userId }}",
        },
      },
    },
  ],

  fields: [
    // User ID for get
    {
      displayName: "User ID",
      name: "userId",
      type: "string",
      default: "",
      displayOptions: {
        show: {
          resource: ["users"],
          operation: ["get"],
        },
      },
      description: "The user ID to retrieve. Get IDs from the 'List' operation.",
      required: true,
    },
  ],
};
