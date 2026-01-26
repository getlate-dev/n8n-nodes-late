import type { LateResourceModule } from "../types";
import {
  buildProfileIdField,
  buildAccountIdField,
} from "../utils/commonFields";

export const blueskyResource: LateResourceModule = {
  operations: [
    {
      name: "Connect with Credentials",
      value: "connect",
      action: "Connect Bluesky account with credentials",
      routing: {
        request: {
          method: "POST",
          url: "/connect/bluesky/credentials",
          body: {
            profileId: "={{ $parameter.profileId }}",
            handle: "={{ $parameter.handle }}",
            appPassword: "={{ $parameter.appPassword }}",
          },
        },
      },
    },
    {
      name: "Disconnect",
      value: "disconnect",
      action: "Disconnect Bluesky account",
      routing: {
        request: {
          method: "DELETE",
          url: "=/accounts/{{ $parameter.accountId }}",
        },
      },
    },
  ],

  fields: [
    // Profile ID for connection
    buildProfileIdField("bluesky", ["connect"]),

    // Bluesky handle
    {
      displayName: "Handle",
      name: "handle",
      type: "string",
      default: "",
      displayOptions: {
        show: {
          resource: ["bluesky"],
          operation: ["connect"],
        },
      },
      description:
        "Your Bluesky handle (e.g., username.bsky.social or custom domain)",
      placeholder: "username.bsky.social",
      required: true,
    },

    // App password
    {
      displayName: "App Password",
      name: "appPassword",
      type: "string",
      typeOptions: {
        password: true,
      },
      default: "",
      displayOptions: {
        show: {
          resource: ["bluesky"],
          operation: ["connect"],
        },
      },
      description:
        "App password from Bluesky settings (Settings > App Passwords). Do not use your main password.",
      placeholder: "xxxx-xxxx-xxxx-xxxx",
      required: true,
    },

    // Account ID for disconnect
    buildAccountIdField(
      "bluesky",
      ["disconnect"],
      "Account ID",
      "The Bluesky account ID to disconnect"
    ),
  ],
};
