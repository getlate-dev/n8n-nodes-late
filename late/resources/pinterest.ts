import type { LateResourceModule } from "../types";
import { buildAccountIdField, buildSelectorField } from "../utils/commonFields";

export const pinterestResource: LateResourceModule = {
  operations: [
    {
      name: "List Boards",
      value: "listBoards",
      action: "List Pinterest boards",
      routing: {
        request: {
          method: "GET",
          url: "=/accounts/{{ $parameter.accountId }}/pinterest-boards",
        },
      },
    },
    {
      name: "Select Board",
      value: "selectBoard",
      action: "Select Pinterest board for posting",
      routing: {
        request: {
          method: "PUT",
          url: "=/accounts/{{ $parameter.accountId }}/pinterest-boards",
          body: {
            boardId: "={{ $parameter.boardId }}",
          },
        },
      },
    },
  ],

  fields: [
    // Account ID for all operations
    buildAccountIdField(
      "pinterest",
      ["listBoards", "selectBoard"],
      "Account ID",
      "The Pinterest account ID"
    ),

    // Board ID for selection
    buildSelectorField(
      "pinterest",
      ["selectBoard"],
      "boardId",
      "Board ID",
      "The Pinterest board ID to select for posting. Get board IDs from the 'List Boards' operation.",
      "board_123456789",
      true
    ),
  ],
};
