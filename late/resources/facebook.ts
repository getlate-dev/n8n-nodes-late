import type { LateResourceModule } from "../types";
import {
  buildProfileIdField,
  buildTempTokenField,
  buildUserProfileFields,
  buildAccountIdField,
  buildSelectorField,
} from "../utils/commonFields";

export const facebookResource: LateResourceModule = {
  operations: [
    {
      name: "List Pages",
      value: "listPages",
      action: "List Facebook pages",
      routing: {
        request: {
          method: "GET",
          url: "/connect/facebook/select-page",
          qs: {
            profileId: "={{ $parameter.profileId }}",
            tempToken: "={{ $parameter.tempToken }}",
          },
        },
      },
    },
    {
      name: "Select Page",
      value: "selectPage",
      action: "Select Facebook page",
      routing: {
        request: {
          method: "POST",
          url: "/connect/facebook/select-page",
          body: {
            profileId: "={{ $parameter.profileId }}",
            pageId: "={{ $parameter.pageId }}",
            tempToken: "={{ $parameter.tempToken }}",
            userProfile:
              "={{ { id: $parameter.userProfileId || '', name: $parameter.userProfileName || '', email: $parameter.userProfileEmail || '', picture: $parameter.userProfilePicture || '', accessToken: $parameter.userProfileAccessToken || '' } }}",
          },
        },
      },
    },
    {
      name: "List Account Pages",
      value: "listAccountPages",
      action: "List Facebook pages for account",
      routing: {
        request: {
          method: "GET",
          url: "=/accounts/{{ $parameter.accountId }}/facebook-page",
        },
      },
    },
    {
      name: "Update Page",
      value: "updatePage",
      action: "Update Facebook page",
      routing: {
        request: {
          method: "PUT",
          url: "=/accounts/{{ $parameter.accountId }}/facebook-page",
          body: {
            selectedPageId: "={{ $parameter.selectedPageId }}",
          },
        },
      },
    },
  ],

  fields: [
    // Common fields using reusable builders
    buildProfileIdField("facebook", ["listPages", "selectPage"]),
    buildTempTokenField("facebook", ["listPages", "selectPage"]),
    buildSelectorField(
      "facebook",
      ["selectPage"],
      "pageId",
      "Page ID",
      "Facebook page ID to select",
      undefined,
      true
    ),

    // User profile fields for OAuth
    ...buildUserProfileFields("facebook", ["selectPage"], "facebook"),

    // Account-based operations
    buildAccountIdField(
      "facebook",
      ["listAccountPages", "updatePage"],
      "Account ID",
      "Facebook account ID"
    ),
    buildSelectorField(
      "facebook",
      ["updatePage"],
      "selectedPageId",
      "Selected Page ID",
      "New page ID to select",
      undefined,
      true
    ),
  ],
};
