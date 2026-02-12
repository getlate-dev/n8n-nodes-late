import { processParametersWithExpressions } from "./expressionProcessor";

/**
 * Utility functions for routing hooks that process expressions
 */

/**
 * Post-receive hook that surfaces API error messages in n8n UI.
 * Requires ignoreHttpStatusErrors: true and returnFullResponse: true on the request.
 */
export async function handleApiErrorResponse(
  this: any,
  items: any[],
  responseData: any,
): Promise<any[]> {
  const statusCode = responseData?.statusCode;
  if (statusCode && statusCode >= 400) {
    const body = responseData.body;
    let errorMessage = `LATE API Error (${statusCode})`;

    if (typeof body === 'object' && body !== null) {
      if (body.error) errorMessage += `: ${body.error}`;
      if (body.details) {
        errorMessage += ` - ${typeof body.details === 'string' ? body.details : JSON.stringify(body.details)}`;
      }
      if (body.code) errorMessage += ` [${body.code}]`;
    } else if (typeof body === 'string') {
      errorMessage += `: ${body}`;
    }

    throw new Error(errorMessage);
  }
  return items;
}

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
      return accounts
        .filter((id: string) => id && id !== "none" && id !== "error" && id.length === 24)
        .map((id: string) => ({
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

  // Build platforms and validate before sending
  const platforms = buildPlatformsArray(this, 0);
  const publishNow = this.getNodeParameter("publishNow", 0, false);
  const isDraft = this.getNodeParameter("isDraft", 0, false);

  if (!isDraft && platforms.length === 0) {
    throw new Error(
      'No valid accounts selected. Please select at least one account for each platform you want to post to. ' +
      'If no accounts appear in the dropdown, make sure you have connected accounts in your LATE dashboard (https://getlate.dev).'
    );
  }

  // Build the body with processed parameters
  requestOptions.body = {
    content: this.getNodeParameter("content", 0),
    platforms,
    scheduledFor: this.getNodeParameter("scheduledFor", 0, undefined),
    timezone: this.getNodeParameter("timezone", 0, "UTC"),
    publishNow,
    isDraft,
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
