import type { LateResourceModule } from "../types";

export const invitesResource: LateResourceModule = {
  operations: [
    {
      name: "Create Token",
      value: "create",
      action: "Create invite token",
      routing: {
        request: {
          method: "POST",
          url: "/invite/tokens",
          body: {
            scope: "={{ $parameter.scope }}",
            profileIds: "={{ $parameter.scope === 'profiles' ? $parameter.profileIds.split(',').map(s => s.trim()).filter(s => s) : undefined }}",
          },
        },
      },
    },
  ],

  fields: [
    // Scope
    {
      displayName: "Scope",
      name: "scope",
      type: "options",
      options: [
        {
          name: "All Profiles",
          value: "all",
          description: "Grant access to all current and future profiles",
        },
        {
          name: "Specific Profiles",
          value: "profiles",
          description: "Grant access only to specific profiles",
        },
      ],
      default: "profiles",
      displayOptions: {
        show: {
          resource: ["invites"],
          operation: ["create"],
        },
      },
      description:
        "Access scope for the invite. 'All' grants access to all profiles, 'Specific Profiles' restricts to selected profiles.",
      required: true,
    },

    // Profile IDs
    {
      displayName: "Profile IDs",
      name: "profileIds",
      type: "string",
      default: "",
      displayOptions: {
        show: {
          resource: ["invites"],
          operation: ["create"],
          scope: ["profiles"],
        },
      },
      description:
        "Comma-separated list of profile IDs to grant access to. Get profile IDs from 'Profiles > List'.",
      placeholder: "64f0a1b2c3d4e5f6a7b8c9d0,64f0a1b2c3d4e5f6a7b8c9d1",
      required: true,
    },
  ],
};
