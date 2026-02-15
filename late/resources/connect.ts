import type { INodeProperties } from "n8n-workflow";
import type { LateResourceModule } from "../types";
import { buildAccountIdField, buildProfileIdField } from "../utils/commonFields";
import { SUPPORTED_PLATFORMS } from "../utils/platformHelpers";

export const connectResource: LateResourceModule = {
	operations: [
		{
			name: "Connect Platform",
			value: "connect",
			action: "Connect social platform",
			routing: {
				request: {
					method: "GET",
					url: "=/connect/{{ $parameter.platform }}",
					qs: {
						profileId: "={{ $parameter.profileId }}",
						redirect_url: "={{ $parameter.redirectUrl || undefined }}",
						headless: "={{ $parameter.headless || undefined }}",
					},
				},
			},
		},
		{
			name: "Complete OAuth Callback",
			value: "completeOAuthCallback",
			action: "Complete OAuth token exchange manually",
			routing: {
				request: {
					method: "POST",
					url: "=/connect/{{ $parameter.platform }}",
					body: {
						code: "={{ $parameter.code }}",
						state: "={{ $parameter.state }}",
						profileId: "={{ $parameter.profileId }}",
					},
				},
			},
		},
		{
			name: "Get Pending OAuth Data",
			value: "getPendingOAuthData",
			action: "Get pending OAuth selection data",
			routing: {
				request: {
					method: "GET",
					url: "/connect/pending-data",
					qs: {
						token: "={{ $parameter.token }}",
					},
				},
			},
		},
		{
			name: "List Facebook Pages (Headless)",
			value: "listFacebookPages",
			action: "List Facebook pages for selection",
			routing: {
				request: {
					method: "GET",
					url: "/connect/facebook/select-page",
					qs: {
						profileId: "={{ $parameter.profileId }}",
						tempToken: "={{ $parameter.tempToken }}",
					},
					headers: {
						"X-Connect-Token": "={{ $parameter.connectToken || undefined }}",
					},
				},
			},
		},
		{
			name: "Select Facebook Page (Headless)",
			value: "selectFacebookPage",
			action: "Select Facebook page to complete connection",
			routing: {
				request: {
					method: "POST",
					url: "/connect/facebook/select-page",
					headers: {
						"X-Connect-Token": "={{ $parameter.connectToken || undefined }}",
					},
					body: {
						profileId: "={{ $parameter.profileId }}",
						pageId: "={{ $parameter.pageId }}",
						tempToken: "={{ $parameter.tempToken }}",
						userProfile: "={{ $parameter.userProfile || undefined }}",
						redirect_url: "={{ $parameter.redirectUrl || undefined }}",
					},
				},
			},
		},
		{
			name: "List Google Business Locations (Headless)",
			value: "listGoogleBusinessLocations",
			action: "List Google Business locations for selection",
			routing: {
				request: {
					method: "GET",
					url: "/connect/googlebusiness/locations",
					qs: {
						profileId: "={{ $parameter.profileId }}",
						tempToken: "={{ $parameter.tempToken }}",
					},
					headers: {
						"X-Connect-Token": "={{ $parameter.connectToken || undefined }}",
					},
				},
			},
		},
		{
			name: "Select Google Business Location (Headless)",
			value: "selectGoogleBusinessLocation",
			action: "Select Google Business location to complete connection",
			routing: {
				request: {
					method: "POST",
					url: "/connect/googlebusiness/select-location",
					headers: {
						"X-Connect-Token": "={{ $parameter.connectToken || undefined }}",
					},
					body: {
						profileId: "={{ $parameter.profileId }}",
						locationId: "={{ $parameter.locationId }}",
						tempToken: "={{ $parameter.tempToken }}",
						userProfile: "={{ $parameter.userProfile || undefined }}",
						redirect_url: "={{ $parameter.redirectUrl || undefined }}",
					},
				},
			},
		},
		{
			name: "List LinkedIn Organizations (Details)",
			value: "listLinkedInOrganizations",
			action: "List LinkedIn organization details for selection",
			routing: {
				request: {
					method: "GET",
					url: "/connect/linkedin/organizations",
					qs: {
						tempToken: "={{ $parameter.tempToken }}",
						orgIds: "={{ $parameter.orgIds }}",
					},
				},
			},
		},
		{
			name: "Select LinkedIn Organization",
			value: "selectLinkedInOrganization",
			action: "Select LinkedIn account type and organization",
			routing: {
				request: {
					method: "POST",
					url: "/connect/linkedin/select-organization",
					headers: {
						"X-Connect-Token": "={{ $parameter.connectToken || undefined }}",
					},
					body: {
						profileId: "={{ $parameter.profileId }}",
						tempToken: "={{ $parameter.tempToken }}",
						userProfile: "={{ $parameter.userProfile }}",
						accountType: "={{ $parameter.accountType }}",
						selectedOrganization: "={{ $parameter.selectedOrganization || undefined }}",
						redirect_url: "={{ $parameter.redirectUrl || undefined }}",
					},
				},
			},
		},
		{
			name: "List Pinterest Boards (Headless)",
			value: "listPinterestBoards",
			action: "List Pinterest boards for selection",
			routing: {
				request: {
					method: "GET",
					url: "/connect/pinterest/select-board",
					qs: {
						profileId: "={{ $parameter.profileId }}",
						tempToken: "={{ $parameter.tempToken }}",
					},
					headers: {
						"X-Connect-Token": "={{ $parameter.connectToken }}",
					},
				},
			},
		},
		{
			name: "Select Pinterest Board (Headless)",
			value: "selectPinterestBoard",
			action: "Select Pinterest board to complete connection",
			routing: {
				request: {
					method: "POST",
					url: "/connect/pinterest/select-board",
					headers: {
						"X-Connect-Token": "={{ $parameter.connectToken || undefined }}",
					},
					body: {
						profileId: "={{ $parameter.profileId }}",
						boardId: "={{ $parameter.boardId }}",
						boardName: "={{ $parameter.boardName || undefined }}",
						tempToken: "={{ $parameter.tempToken }}",
						userProfile: "={{ $parameter.userProfile || undefined }}",
						refreshToken: "={{ $parameter.refreshToken || undefined }}",
						expiresIn: "={{ $parameter.expiresIn || undefined }}",
						redirect_url: "={{ $parameter.redirectUrl || undefined }}",
					},
				},
			},
		},
		{
			name: "List Snapchat Public Profiles (Headless)",
			value: "listSnapchatProfiles",
			action: "List Snapchat public profiles for selection",
			routing: {
				request: {
					method: "GET",
					url: "/connect/snapchat/select-profile",
					qs: {
						profileId: "={{ $parameter.profileId }}",
						tempToken: "={{ $parameter.tempToken }}",
					},
					headers: {
						"X-Connect-Token": "={{ $parameter.connectToken }}",
					},
				},
			},
		},
		{
			name: "Select Snapchat Public Profile (Headless)",
			value: "selectSnapchatProfile",
			action: "Select Snapchat public profile to complete connection",
			routing: {
				request: {
					method: "POST",
					url: "/connect/snapchat/select-profile",
					headers: {
						"X-Connect-Token": "={{ $parameter.connectToken || undefined }}",
					},
					body: {
						profileId: "={{ $parameter.profileId }}",
						selectedPublicProfile: "={{ $parameter.selectedPublicProfile }}",
						tempToken: "={{ $parameter.tempToken }}",
						userProfile: "={{ $parameter.userProfile }}",
						refreshToken: "={{ $parameter.refreshToken || undefined }}",
						expiresIn: "={{ $parameter.expiresIn || undefined }}",
						redirect_url: "={{ $parameter.redirectUrl || undefined }}",
					},
				},
			},
		},
		{
			name: "Connect Bluesky (App Password)",
			value: "connectBlueskyCredentials",
			action: "Connect Bluesky using app password",
			routing: {
				request: {
					method: "POST",
					url: "/connect/bluesky/credentials",
					body: {
						identifier: "={{ $parameter.identifier }}",
						appPassword: "={{ $parameter.appPassword }}",
						state: "={{ $parameter.state }}",
						redirectUri: "={{ $parameter.redirectUri || undefined }}",
					},
				},
			},
		},
		{
			name: "Generate Telegram Access Code",
			value: "getTelegramConnectStatus",
			action: "Generate Telegram access code",
			routing: {
				request: {
					method: "GET",
					url: "/connect/telegram",
					qs: {
						profileId: "={{ $parameter.profileId }}",
					},
				},
			},
		},
		{
			name: "Connect Telegram (Direct)",
			value: "initiateTelegramConnect",
			action: "Connect Telegram channel/group directly",
			routing: {
				request: {
					method: "POST",
					url: "/connect/telegram",
					body: {
						chatId: "={{ $parameter.chatId }}",
						profileId: "={{ $parameter.profileId }}",
					},
				},
			},
		},
		{
			name: "Check Telegram Connection Status",
			value: "completeTelegramConnect",
			action: "Check Telegram access code status",
			routing: {
				request: {
					method: "PATCH",
					url: "/connect/telegram",
					qs: {
						code: "={{ $parameter.code }}",
					},
				},
			},
		},
		{
			name: "List Account Facebook Pages",
			value: "getFacebookPages",
			action: "List available Facebook pages for connected account",
			routing: {
				request: {
					method: "GET",
					url: "=/accounts/{{ $parameter.accountId }}/facebook-page",
				},
			},
		},
		{
			name: "Update Account Facebook Page",
			value: "updateFacebookPage",
			action: "Update selected Facebook page for connected account",
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
		{
			name: "List Account LinkedIn Organizations",
			value: "getLinkedInOrganizations",
			action: "List available LinkedIn organizations for connected account",
			routing: {
				request: {
					method: "GET",
					url: "=/accounts/{{ $parameter.accountId }}/linkedin-organizations",
				},
			},
		},
		{
			name: "Update Account LinkedIn Organization",
			value: "updateLinkedInOrganization",
			action: "Switch LinkedIn account type (personal/organization)",
			routing: {
				request: {
					method: "PUT",
					url: "=/accounts/{{ $parameter.accountId }}/linkedin-organization",
					body: {
						accountType: "={{ $parameter.accountType }}",
						selectedOrganization: "={{ $parameter.selectedOrganization || undefined }}",
					},
				},
			},
		},
		{
			name: "List Account Pinterest Boards",
			value: "getPinterestBoards",
			action: "List Pinterest boards for connected account",
			routing: {
				request: {
					method: "GET",
					url: "=/accounts/{{ $parameter.accountId }}/pinterest-boards",
				},
			},
		},
		{
			name: "Update Account Pinterest Default Board",
			value: "updatePinterestBoards",
			action: "Update default Pinterest board for connected account",
			routing: {
				request: {
					method: "PUT",
					url: "=/accounts/{{ $parameter.accountId }}/pinterest-boards",
					body: {
						defaultBoardId: "={{ $parameter.defaultBoardId }}",
						defaultBoardName: "={{ $parameter.defaultBoardName || undefined }}",
					},
				},
			},
		},
		{
			name: "List Account Google Business Locations",
			value: "getGmbLocations",
			action: "List Google Business locations for connected account",
			routing: {
				request: {
					method: "GET",
					url: "=/accounts/{{ $parameter.accountId }}/gmb-locations",
				},
			},
		},
		{
			name: "Update Account Google Business Location",
			value: "updateGmbLocation",
			action: "Update selected Google Business location for connected account",
			routing: {
				request: {
					method: "PUT",
					url: "=/accounts/{{ $parameter.accountId }}/gmb-locations",
					body: {
						selectedLocationId: "={{ $parameter.selectedLocationId }}",
					},
				},
			},
		},
		{
			name: "List Account Reddit Subreddits",
			value: "getRedditSubreddits",
			action: "List Reddit subreddits for connected account",
			routing: {
				request: {
					method: "GET",
					url: "=/accounts/{{ $parameter.accountId }}/reddit-subreddits",
				},
			},
		},
		{
			name: "Update Account Reddit Default Subreddit",
			value: "updateRedditSubreddits",
			action: "Update default subreddit for connected account",
			routing: {
				request: {
					method: "PUT",
					url: "=/accounts/{{ $parameter.accountId }}/reddit-subreddits",
					body: {
						defaultSubreddit: "={{ $parameter.defaultSubreddit }}",
					},
				},
			},
		},
		{
			name: "List Reddit Flairs",
			value: "getRedditFlairs",
			action: "List Reddit post flairs for subreddit",
			routing: {
				request: {
					method: "GET",
					url: "=/accounts/{{ $parameter.accountId }}/reddit-flairs",
					qs: {
						subreddit: "={{ $parameter.subreddit }}",
					},
				},
			},
		},
	],

	fields: [
		// Connect Platform
		{
			displayName: "Platform",
			name: "platform",
			type: "options",
			options: SUPPORTED_PLATFORMS.map((platform) => ({
				name: platform.name,
				value: platform.value,
				description: `Connect ${platform.name} account`,
			})),
			default: "twitter",
			displayOptions: {
				show: {
					resource: ["connect"],
					operation: ["connect", "completeOAuthCallback"],
				},
			},
			description:
				"Social media platform to connect to your profile. Each platform has specific requirements and OAuth flows.",
		},
		{
			...buildProfileIdField("connect", ["connect", "completeOAuthCallback"]),
			description:
				"The profile ID where this social media account will be connected. Get profile IDs from 'Profiles > List'.",
			placeholder: "profile_123_abc",
		},
		{
			displayName: "Redirect URL",
			name: "redirectUrl",
			type: "string",
			default: "",
			displayOptions: {
				show: {
					resource: ["connect"],
					operation: ["connect"],
				},
			},
			description:
				"Optional: Custom URL to redirect to after OAuth completion. In headless mode, Late redirects directly to this URL with OAuth data needed for your custom selector UI.",
			placeholder: "https://your-app.com/oauth-callback",
		},
		{
			displayName: "Headless Mode",
			name: "headless",
			type: "boolean",
			default: false,
			displayOptions: {
				show: {
					resource: ["connect"],
					operation: ["connect"],
				},
			},
			description:
				"Enable headless/whitelabel mode (supported on Facebook, LinkedIn, Pinterest, Google Business Profile, Snapchat). Late handles OAuth but you build the selection UI.",
		},

		// Complete OAuth Callback (POST /connect/{platform})
		{
			displayName: "Code",
			name: "code",
			type: "string",
			default: "",
			required: true,
			displayOptions: {
				show: {
					resource: ["connect"],
					operation: ["completeOAuthCallback"],
				},
			},
			description: "OAuth authorization code returned by the platform.",
			placeholder: "AQABAAIAAAAm...",
		},
		{
			displayName: "State",
			name: "state",
			type: "string",
			default: "",
			required: true,
			displayOptions: {
				show: {
					resource: ["connect"],
					operation: ["completeOAuthCallback"],
				},
			},
			description: "OAuth state value returned by the platform.",
			placeholder: "state_abc123",
		},

		// Connect Token (shared)
		{
			displayName: "Connect Token",
			name: "connectToken",
			type: "string",
			default: "",
			displayOptions: {
				show: {
					resource: ["connect"],
					operation: [
						"listFacebookPages",
						"selectFacebookPage",
						"listGoogleBusinessLocations",
						"selectGoogleBusinessLocation",
						"selectLinkedInOrganization",
						"listPinterestBoards",
						"selectPinterestBoard",
						"listSnapchatProfiles",
						"selectSnapchatProfile",
					],
				},
			},
			description:
				"Optional/required depending on endpoint: X-Connect-Token value from the OAuth redirect (connect_token). Used for headless mode API authentication.",
			placeholder: "ct_123abc...",
		},

		// Pending OAuth Data
		{
			displayName: "Pending Data Token",
			name: "token",
			type: "string",
			default: "",
			required: true,
			displayOptions: {
				show: {
					resource: ["connect"],
					operation: ["getPendingOAuthData"],
				},
			},
			description:
				"Token from the OAuth redirect URL (pendingDataToken). One-time use; expires after ~10 minutes.",
			placeholder: "pdt_123abc...",
		},

		// Facebook headless selection
		{
			...buildProfileIdField("connect", ["listFacebookPages", "selectFacebookPage"]),
			description: "Profile ID from your headless connection flow.",
			placeholder: "profile_123_abc",
		},
		{
			displayName: "Temp Token",
			name: "tempToken",
			type: "string",
			default: "",
			required: true,
			displayOptions: {
				show: {
					resource: ["connect"],
					operation: [
						"listFacebookPages",
						"selectFacebookPage",
						"listGoogleBusinessLocations",
						"selectGoogleBusinessLocation",
						"listLinkedInOrganizations",
						"selectLinkedInOrganization",
						"listPinterestBoards",
						"selectPinterestBoard",
						"listSnapchatProfiles",
						"selectSnapchatProfile",
					],
				},
			},
			description:
				"Temporary access token from the OAuth redirect URL (tempToken). Used to fetch selectable entities (pages/boards/locations) or to finalize the connection.",
			placeholder: "EAAxxxxx...",
		},
		{
			displayName: "Facebook Page ID",
			name: "pageId",
			type: "string",
			default: "",
			required: true,
			displayOptions: {
				show: {
					resource: ["connect"],
					operation: ["selectFacebookPage"],
				},
			},
			description: "The Facebook Page ID selected by the user.",
			placeholder: "123456789",
		},
		{
			displayName: "User Profile",
			name: "userProfile",
			type: "json",
			default: "{}",
			displayOptions: {
				show: {
					resource: ["connect"],
					operation: [
						"selectFacebookPage",
						"selectGoogleBusinessLocation",
						"selectLinkedInOrganization",
						"selectPinterestBoard",
						"selectSnapchatProfile",
					],
				},
			},
			description:
				"Decoded user profile object from the OAuth redirect (userProfile). Provide as JSON.",
		},
		{
			displayName: "Redirect URL",
			name: "redirectUrl",
			type: "string",
			default: "",
			displayOptions: {
				show: {
					resource: ["connect"],
					operation: [
						"selectFacebookPage",
						"selectGoogleBusinessLocation",
						"selectLinkedInOrganization",
						"selectPinterestBoard",
						"selectSnapchatProfile",
					],
				},
			},
			description:
				"Optional: URL to redirect to after selection is saved (server may use it to redirect in hosted flows).",
			placeholder: "https://your-app.com/callback",
		},

		// Google Business headless selection
		{
			displayName: "Google Business Location ID",
			name: "locationId",
			type: "string",
			default: "",
			required: true,
			displayOptions: {
				show: {
					resource: ["connect"],
					operation: ["selectGoogleBusinessLocation"],
				},
			},
			description: "The Google Business Profile location ID selected by the user.",
			placeholder: "9281089117903930794",
		},

		// LinkedIn org details fetch
		{
			displayName: "Organization IDs",
			name: "orgIds",
			type: "string",
			default: "",
			required: true,
			displayOptions: {
				show: {
					resource: ["connect"],
					operation: ["listLinkedInOrganizations"],
				},
			},
			description: "Comma-separated list of LinkedIn organization IDs to fetch details for (max 100).",
			placeholder: "12345678,87654321",
		},

		// LinkedIn selection
		{
			displayName: "Account Type",
			name: "accountType",
			type: "options",
			options: [
				{ name: "Personal", value: "personal", description: "Connect as the user's personal LinkedIn profile" },
				{
					name: "Organization",
					value: "organization",
					description: "Connect as a LinkedIn organization/company page",
				},
			],
			default: "personal",
			required: true,
			displayOptions: {
				show: {
					resource: ["connect"],
					operation: ["selectLinkedInOrganization", "updateLinkedInOrganization"],
				},
			},
			description:
				"For LinkedIn, choose whether to connect as the user's personal account or an organization/company page.",
		},
		{
			displayName: "Selected Organization",
			name: "selectedOrganization",
			type: "json",
			default: "{}",
			displayOptions: {
				show: {
					resource: ["connect"],
					operation: ["selectLinkedInOrganization", "updateLinkedInOrganization"],
				},
			},
			description:
				"Organization object for accountType=organization (e.g. { id, urn, name, vanityName }). Omit/leave empty for personal connections.",
		},

		// Pinterest selection
		{
			displayName: "Pinterest Board ID",
			name: "boardId",
			type: "string",
			default: "",
			required: true,
			displayOptions: {
				show: {
					resource: ["connect"],
					operation: ["selectPinterestBoard"],
				},
			},
			description: "The Pinterest Board ID selected by the user.",
			placeholder: "123456789012345678",
		},
		{
			displayName: "Pinterest Board Name",
			name: "boardName",
			type: "string",
			default: "",
			displayOptions: {
				show: {
					resource: ["connect"],
					operation: ["selectPinterestBoard"],
				},
			},
			description: "Optional: Board name for display purposes.",
			placeholder: "Marketing Ideas",
		},
		{
			displayName: "Refresh Token",
			name: "refreshToken",
			type: "string",
			default: "",
			displayOptions: {
				show: {
					resource: ["connect"],
					operation: ["selectPinterestBoard", "selectSnapchatProfile"],
				},
			},
			description: "Optional: Refresh token from OAuth (if provided by the platform).",
		},
		{
			displayName: "Expires In (Seconds)",
			name: "expiresIn",
			type: "number",
			default: 0,
			displayOptions: {
				show: {
					resource: ["connect"],
					operation: ["selectPinterestBoard", "selectSnapchatProfile"],
				},
			},
			description: "Optional: Token expiration time in seconds.",
		},

		// Snapchat selection
		{
			displayName: "Selected Public Profile",
			name: "selectedPublicProfile",
			type: "json",
			default: "{}",
			required: true,
			displayOptions: {
				show: {
					resource: ["connect"],
					operation: ["selectSnapchatProfile"],
				},
			},
			description:
				"The selected Snapchat Public Profile object (must include at least id and display_name).",
		},

		// Bluesky credentials connect
		{
			displayName: "Identifier",
			name: "identifier",
			type: "string",
			default: "",
			required: true,
			displayOptions: {
				show: {
					resource: ["connect"],
					operation: ["connectBlueskyCredentials"],
				},
			},
			description: "Your Bluesky handle (e.g. user.bsky.social) or email address.",
			placeholder: "yourhandle.bsky.social",
		},
		{
			displayName: "App Password",
			name: "appPassword",
			type: "string",
			typeOptions: { password: true },
			default: "",
			required: true,
			displayOptions: {
				show: {
					resource: ["connect"],
					operation: ["connectBlueskyCredentials"],
				},
			},
			description: "App password generated from Bluesky Settings > App Passwords.",
			placeholder: "xxxx-xxxx-xxxx-xxxx",
		},
		{
			displayName: "State",
			name: "state",
			type: "string",
			default: "",
			required: true,
			displayOptions: {
				show: {
					resource: ["connect"],
					operation: ["connectBlueskyCredentials"],
				},
			},
			description:
				"Required state formatted as `{userId}-{profileId}`. userId is your Late user ID; profileId is the profile to connect.",
			placeholder: "6507a1...-6507a1...",
		},
		{
			displayName: "Redirect URI",
			name: "redirectUri",
			type: "string",
			default: "",
			displayOptions: {
				show: {
					resource: ["connect"],
					operation: ["connectBlueskyCredentials"],
				},
			},
			description: "Optional: URL to redirect to after successful connection.",
			placeholder: "https://yourapp.com/connected",
		},

		// Telegram
		{
			...buildProfileIdField("connect", ["getTelegramConnectStatus", "initiateTelegramConnect"]),
			description: "The profile ID to connect the Telegram channel/group to.",
			placeholder: "profile_123_abc",
		},
		{
			displayName: "Chat ID",
			name: "chatId",
			type: "string",
			default: "",
			required: true,
			displayOptions: {
				show: {
					resource: ["connect"],
					operation: ["initiateTelegramConnect"],
				},
			},
			description:
				'Telegram chat ID (e.g. "-1001234567890") or username with @ prefix (e.g. "@mychannel"). Bot must be admin.',
			placeholder: "-1001234567890",
		},
		{
			displayName: "Code",
			name: "code",
			type: "string",
			default: "",
			required: true,
			displayOptions: {
				show: {
					resource: ["connect"],
					operation: ["completeTelegramConnect"],
				},
			},
			description: "The Telegram access code to check status for.",
			placeholder: "LATE-ABC123",
		},

		// Account-level selectors/updates
		{
			...buildAccountIdField(
				"connect",
				[
					"getFacebookPages",
					"updateFacebookPage",
					"getLinkedInOrganizations",
					"updateLinkedInOrganization",
					"getPinterestBoards",
					"updatePinterestBoards",
					"getGmbLocations",
					"updateGmbLocation",
					"getRedditSubreddits",
					"updateRedditSubreddits",
					"getRedditFlairs",
				],
				"Account ID",
				"The account ID of the connected social account. Get from Accounts endpoints or from connected account data.",
			),
			placeholder: "account_123_abc",
		},
		{
			displayName: "Selected Facebook Page ID",
			name: "selectedPageId",
			type: "string",
			default: "",
			required: true,
			displayOptions: {
				show: {
					resource: ["connect"],
					operation: ["updateFacebookPage"],
				},
			},
			description: "Facebook Page ID to set as selected for this connected account.",
			placeholder: "123456789012345",
		},
		{
			displayName: "Default Pinterest Board ID",
			name: "defaultBoardId",
			type: "string",
			default: "",
			required: true,
			displayOptions: {
				show: {
					resource: ["connect"],
					operation: ["updatePinterestBoards"],
				},
			},
			description: "Pinterest Board ID to set as default for this connected account.",
			placeholder: "123456789012345678",
		},
		{
			displayName: "Default Pinterest Board Name",
			name: "defaultBoardName",
			type: "string",
			default: "",
			displayOptions: {
				show: {
					resource: ["connect"],
					operation: ["updatePinterestBoards"],
				},
			},
			description: "Optional: Pinterest board name for display purposes.",
			placeholder: "Marketing Ideas",
		},
		{
			displayName: "Selected Location ID",
			name: "selectedLocationId",
			type: "string",
			default: "",
			required: true,
			displayOptions: {
				show: {
					resource: ["connect"],
					operation: ["updateGmbLocation"],
				},
			},
			description: "Google Business Profile location ID to set as selected for this connected account.",
			placeholder: "12345678901234567890",
		},
		{
			displayName: "Default Subreddit",
			name: "defaultSubreddit",
			type: "string",
			default: "",
			required: true,
			displayOptions: {
				show: {
					resource: ["connect"],
					operation: ["updateRedditSubreddits"],
				},
			},
			description: 'Default subreddit name to use on this connection (without the "r/" prefix).',
			placeholder: "marketing",
		},
		{
			displayName: "Subreddit",
			name: "subreddit",
			type: "string",
			default: "",
			required: true,
			displayOptions: {
				show: {
					resource: ["connect"],
					operation: ["getRedditFlairs"],
				},
			},
			description: 'Subreddit name (without the "r/" prefix) to fetch flairs for.',
			placeholder: "marketing",
		},
	] as INodeProperties[],
};