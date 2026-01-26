import { processParametersWithExpressions } from "./expressionProcessor";

/**
 * Utility functions for routing hooks that process expressions
 */

/**
 * Builds the platforms array from selected platforms and accounts
 */
function buildPlatformsArray(
  executeFunctions: any,
  itemIndex: number
): Array<{ platform: string; accountId: string }> {
  const selectedPlatforms = executeFunctions.getNodeParameter(
    "selectedPlatforms",
    itemIndex,
    []
  ) as string[];
  return selectedPlatforms
    .map((platform: string) => {
      const accountsParam = `${platform}Accounts`;
      const accounts = executeFunctions.getNodeParameter(
        accountsParam,
        itemIndex,
        []
      ) as string[];
      return accounts.map((id: string) => ({
        platform,
        accountId: id,
      }));
    })
    .flat();
}

/**
 * Builds the tags array from comma-separated string
 */
function buildTagsArray(
  executeFunctions: any,
  itemIndex: number,
  allowUndefined = false
): string[] | undefined {
  const tags = executeFunctions.getNodeParameter("tags", itemIndex, "");
  if (!tags) return allowUndefined ? undefined : [];

  return (tags as string)
    .split(",")
    .map((tag: string) => tag.trim())
    .filter((tag: string) => tag);
}

/**
 * Builds TikTok settings if TikTok is selected
 */
function buildTikTokSettings(executeFunctions: any, itemIndex: number): any {
  const selectedPlatforms = executeFunctions.getNodeParameter(
    "selectedPlatforms",
    itemIndex,
    []
  ) as string[];
  if (!selectedPlatforms.includes("tiktok")) return undefined;

  return {
    privacyLevel: executeFunctions.getNodeParameter(
      "tiktokPrivacyLevel",
      itemIndex,
      "PUBLIC_TO_EVERYONE"
    ),
    allowComments: executeFunctions.getNodeParameter(
      "tiktokAllowComments",
      itemIndex,
      true
    ),
    allowDuet: executeFunctions.getNodeParameter(
      "tiktokAllowDuet",
      itemIndex,
      true
    ),
    allowStitch: executeFunctions.getNodeParameter(
      "tiktokAllowStitch",
      itemIndex,
      true
    ),
  };
}

/**
 * Pre-send hook for posts create operation
 */
export async function postsCreatePreSend(
  this: any,
  requestOptions: any
): Promise<any> {
  const { processParametersWithExpressions } = await import(
    "./expressionProcessor"
  );

  // Process expressions in parameters that need it
  const processedParams = processParametersWithExpressions(
    "posts",
    "create",
    this,
    0
  );

  // Build the body with processed parameters
  requestOptions.body = {
    content: this.getNodeParameter("content", 0),
    platforms: buildPlatformsArray(this, 0),
    scheduledFor: this.getNodeParameter("scheduledFor", 0, undefined),
    timezone: this.getNodeParameter("timezone", 0, "UTC"),
    publishNow: this.getNodeParameter("publishNow", 0, false),
    isDraft: this.getNodeParameter("isDraft", 0, false),
    visibility: this.getNodeParameter("visibility", 0, "public"),
    tags: buildTagsArray(this, 0),
    mediaItems: processedParams.mediaItems?.items || [],
    twitterThread: processedParams.twitterThreadItems?.items || [],
    threadsConversation: processedParams.threadsThreadItems?.items || [],
    blueskyThread: processedParams.blueskyThreadItems?.items || [],
    tiktokSettings: buildTikTokSettings(this, 0),
  };

  return requestOptions;
}

/**
 * Pre-send hook for posts update operation
 */
export async function postsUpdatePreSend(
  this: any,
  requestOptions: any
): Promise<any> {
  const { processParametersWithExpressions } = await import(
    "./expressionProcessor"
  );

  const processedParams = processParametersWithExpressions(
    "posts",
    "update",
    this,
    0
  );

  requestOptions.body = {
    content: this.getNodeParameter("content", 0),
    platforms: buildPlatformsArray(this, 0),
    scheduledFor: this.getNodeParameter("scheduledFor", 0),
    timezone: this.getNodeParameter("timezone", 0),
    publishNow: this.getNodeParameter("publishNow", 0),
    isDraft: this.getNodeParameter("isDraft", 0),
    visibility: this.getNodeParameter("visibility", 0),
    tags: buildTagsArray(this, 0, true), // Allow undefined for updates
    mediaItems: processedParams.mediaItems?.items || [],
    twitterThread: processedParams.twitterThreadItems?.items || [],
    threadsConversation: processedParams.threadsThreadItems?.items || [],
    blueskyThread: processedParams.blueskyThreadItems?.items || [],
    tiktokSettings: buildTikTokSettings(this, 0),
  };

  return requestOptions;
}
