import type { LateResourceModule } from "../types";
import { buildProfileIdField } from "../utils/commonFields";

export const telegramResource: LateResourceModule = {
  operations: [
    {
      name: "Get Status",
      value: "getStatus",
      action: "Get Telegram connection status",
      routing: {
        request: {
          method: "GET",
          url: "/connect/telegram",
        },
      },
    },
    {
      name: "Initiate Connection",
      value: "initiate",
      action: "Start Telegram connection flow",
      routing: {
        request: {
          method: "POST",
          url: "/connect/telegram",
          body: {
            profileId: "={{ $parameter.profileId }}",
          },
        },
      },
    },
  ],

  fields: [
    // Profile ID for initiation
    {
      ...buildProfileIdField("telegram", ["initiate"]),
      description:
        "The profile ID to associate the Telegram channel with. This will initiate a connection flow that requires user interaction.",
    },
  ],
};
