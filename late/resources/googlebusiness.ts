import type { LateResourceModule } from "../types";
import {
  buildTempTokenField,
  buildAccountIdField,
  buildSelectorField,
} from "../utils/commonFields";

export const googlebusinessResource: LateResourceModule = {
  operations: [
    {
      name: "List Locations",
      value: "listLocations",
      action: "List Google Business locations",
      routing: {
        request: {
          method: "GET",
          url: "/connect/googlebusiness/locations",
          qs: {
            tempToken: "={{ $parameter.tempToken }}",
          },
        },
      },
    },
    {
      name: "Select Location",
      value: "selectLocation",
      action: "Select Google Business location",
      routing: {
        request: {
          method: "POST",
          url: "/connect/googlebusiness/select-location",
          body: {
            tempToken: "={{ $parameter.tempToken }}",
            locationId: "={{ $parameter.locationId }}",
          },
        },
      },
    },
    {
      name: "List Reviews",
      value: "listReviews",
      action: "List Google Business reviews",
      routing: {
        request: {
          method: "GET",
          url: "=/accounts/{{ $parameter.accountId }}/gmb-reviews",
          qs: {
            page: "={{ $parameter.page || 1 }}",
            limit: "={{ $parameter.limit || 20 }}",
          },
        },
      },
    },
    {
      name: "Reply to Review",
      value: "replyReview",
      action: "Reply to a Google Business review",
      routing: {
        request: {
          method: "POST",
          url: "=/accounts/{{ $parameter.accountId }}/gmb-reviews/{{ $parameter.reviewId }}/reply",
          body: {
            comment: "={{ $parameter.comment }}",
          },
        },
      },
    },
    {
      name: "Delete Review Reply",
      value: "deleteReply",
      action: "Delete a review reply",
      routing: {
        request: {
          method: "DELETE",
          url: "=/accounts/{{ $parameter.accountId }}/gmb-reviews/{{ $parameter.reviewId }}/reply",
        },
      },
    },
  ],

  fields: [
    // Temp token for OAuth operations
    buildTempTokenField("googlebusiness", ["listLocations", "selectLocation"]),

    // Location ID for selection
    buildSelectorField(
      "googlebusiness",
      ["selectLocation"],
      "locationId",
      "Location ID",
      "The Google Business location ID to select. Get IDs from the 'List Locations' operation.",
      "locations/123456789",
      true
    ),

    // Account ID for review operations
    buildAccountIdField(
      "googlebusiness",
      ["listReviews", "replyReview", "deleteReply"],
      "Account ID",
      "The Google Business account ID"
    ),

    // Pagination for reviews
    {
      displayName: "Page",
      name: "page",
      type: "number",
      default: 1,
      displayOptions: {
        show: {
          resource: ["googlebusiness"],
          operation: ["listReviews"],
        },
      },
      description: "Page number for pagination",
    },
    {
      displayName: "Limit",
      name: "limit",
      type: "number",
      default: 20,
      displayOptions: {
        show: {
          resource: ["googlebusiness"],
          operation: ["listReviews"],
        },
      },
      description: "Number of reviews per page (max 50)",
    },

    // Review ID for reply operations
    buildSelectorField(
      "googlebusiness",
      ["replyReview", "deleteReply"],
      "reviewId",
      "Review ID",
      "The review ID to reply to or delete reply from",
      "accounts/123/locations/456/reviews/789",
      true
    ),

    // Comment for reply
    {
      displayName: "Reply Comment",
      name: "comment",
      type: "string",
      typeOptions: {
        rows: 4,
      },
      default: "",
      displayOptions: {
        show: {
          resource: ["googlebusiness"],
          operation: ["replyReview"],
        },
      },
      description: "Your reply to the review",
      placeholder: "Thank you for your feedback! We appreciate...",
      required: true,
    },
  ],
};
