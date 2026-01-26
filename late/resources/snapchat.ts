import type { LateResourceModule } from "../types";
import { buildTempTokenField, buildSelectorField } from "../utils/commonFields";

export const snapchatResource: LateResourceModule = {
  operations: [
    {
      name: "List Profiles",
      value: "listProfiles",
      action: "List Snapchat profiles",
      routing: {
        request: {
          method: "GET",
          url: "/connect/snapchat/select-profile",
          qs: {
            tempToken: "={{ $parameter.tempToken }}",
          },
        },
      },
    },
    {
      name: "Select Profile",
      value: "selectProfile",
      action: "Select Snapchat profile",
      routing: {
        request: {
          method: "POST",
          url: "/connect/snapchat/select-profile",
          body: {
            tempToken: "={{ $parameter.tempToken }}",
            profileId: "={{ $parameter.snapchatProfileId }}",
          },
        },
      },
    },
  ],

  fields: [
    // Temp token for OAuth operations
    buildTempTokenField("snapchat", ["listProfiles", "selectProfile"]),

    // Snapchat Profile ID for selection
    buildSelectorField(
      "snapchat",
      ["selectProfile"],
      "snapchatProfileId",
      "Snapchat Profile ID",
      "The Snapchat profile ID to select. Get IDs from the 'List Profiles' operation.",
      "profile_123456789",
      true
    ),
  ],
};
