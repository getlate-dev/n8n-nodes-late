import type { LateResourceModule } from "../types";
import { SUPPORTED_PLATFORMS } from "../utils/platformHelpers";
import { buildAccountIdField, buildProfileIdField } from "../utils/commonFields";

export const analyticsResource: LateResourceModule = {
	operations: [
		{
			name: "Get Analytics",
			value: "get",
			action: "Get post analytics",
			routing: {
				request: {
					method: "GET",
					url: "/analytics",
					qs: {
						postId: "={{ $parameter.postId || undefined }}",
						platform: "={{ $parameter.platform || undefined }}",
						profileId: "={{ $parameter.profileId || undefined }}",
						source: "={{ $parameter.source || undefined }}",
						fromDate: "={{ $parameter.fromDate || undefined }}",
						toDate: "={{ $parameter.toDate || undefined }}",
						limit: "={{ $parameter.limit || undefined }}",
						page: "={{ $parameter.page || undefined }}",
						sortBy: "={{ $parameter.sortBy || undefined }}",
						order: "={{ $parameter.order || undefined }}",
					},
				},
			},
		},
		{
			name: "YouTube Daily Views",
			value: "youtubeDailyViews",
			action: "Get YouTube daily views",
			routing: {
				request: {
					method: "GET",
					url: "/analytics/youtube/daily-views",
					qs: {
						videoId: "={{ $parameter.videoId }}",
						accountId: "={{ $parameter.accountId }}",
						startDate: "={{ $parameter.startDate || undefined }}",
						endDate: "={{ $parameter.endDate || undefined }}",
					},
				},
			},
		},
		{
			name: "Follower Stats",
			value: "followerStats",
			action: "Get follower stats and growth metrics",
			routing: {
				request: {
					method: "GET",
					url: "/accounts/follower-stats",
					qs: {
						accountIds: "={{ $parameter.accountIds || undefined }}",
						profileId: "={{ $parameter.profileId || undefined }}",
						fromDate: "={{ $parameter.fromDate || undefined }}",
						toDate: "={{ $parameter.toDate || undefined }}",
						granularity: "={{ $parameter.granularity || undefined }}",
					},
				},
			},
		},
		{
			name: "LinkedIn Aggregate Analytics",
			value: "linkedinAggregateAnalytics",
			action: "Get aggregate analytics for a LinkedIn personal account",
			routing: {
				request: {
					method: "GET",
					url: "=/accounts/{{ $parameter.accountId }}/linkedin-aggregate-analytics",
					qs: {
						aggregation: "={{ $parameter.aggregation || undefined }}",
						startDate: "={{ $parameter.startDate || undefined }}",
						endDate: "={{ $parameter.endDate || undefined }}",
						metrics: "={{ $parameter.metrics || undefined }}",
					},
				},
			},
		},
		{
			name: "LinkedIn Post Analytics",
			value: "linkedinPostAnalytics",
			action: "Get analytics for a specific LinkedIn post by URN",
			routing: {
				request: {
					method: "GET",
					url: "=/accounts/{{ $parameter.accountId }}/linkedin-post-analytics",
					qs: {
						urn: "={{ $parameter.urn }}",
					},
				},
			},
		},
	],

	fields: [
		// Post ID
		{
			displayName: "Post ID",
			name: "postId",
			type: "string",
			default: "",
			placeholder: "e.g. 64f1c8f2a1b2c3d4e5f67890",
			displayOptions: {
				show: {
					resource: ["analytics"],
					operation: ["get"],
				},
			},
			description:
				"Returns analytics for a single post. Accepts both Late Post IDs (from creating/scheduling posts) and External Post IDs (from analytics list). Leave empty to list posts with overview stats.",
		},

		// Platform filter
		{
			displayName: "Platform",
			name: "platform",
			type: "options",
			options: [
				{ name: "All Platforms", value: "" },
				...SUPPORTED_PLATFORMS.map((p) => ({
					name: p.name,
					value: p.value,
				})),
			],
			default: "",
			displayOptions: {
				show: {
					resource: ["analytics"],
					operation: ["get"],
				},
			},
			description: "Filter analytics by platform (leave empty for all).",
		},

		// Profile ID filter (Analytics + Follower Stats)
		{
			...buildProfileIdField("analytics", ["get"], false),
			description: "Filter by profile ID (leave empty for all).",
		},
		{
			...buildProfileIdField("analytics", ["followerStats"], false),
			description: "Filter follower stats by profile ID (leave empty for all).",
		},

		// Source filter
		{
			displayName: "Source",
			name: "source",
			type: "options",
			options: [
				{ name: "All", value: "all" },
				{ name: "Late", value: "late" },
				{ name: "External", value: "external" },
			],
			default: "all",
			displayOptions: {
				show: {
					resource: ["analytics"],
					operation: ["get"],
				},
			},
			description: "Filter analytics by post source.",
		},

		// From date (YYYY-MM-DD)
		{
			displayName: "From Date",
			name: "fromDate",
			type: "string",
			default: "",
			placeholder: "e.g. 2024-01-01",
			displayOptions: {
				show: {
					resource: ["analytics"],
					operation: ["get", "followerStats"],
				},
			},
			description:
				"Inclusive lower bound date (YYYY-MM-DD). Leave empty for the API default (typically 30 days ago).",
		},

		// To date (YYYY-MM-DD)
		{
			displayName: "To Date",
			name: "toDate",
			type: "string",
			default: "",
			placeholder: "e.g. 2024-01-31",
			displayOptions: {
				show: {
					resource: ["analytics"],
					operation: ["get", "followerStats"],
				},
			},
			description:
				"Inclusive upper bound date (YYYY-MM-DD). Leave empty for the API default (typically today).",
		},

		// Limit
		{
			displayName: "Limit",
			name: "limit",
			type: "number",
			default: 50,
			typeOptions: {
				minValue: 1,
				maxValue: 100,
			},
			displayOptions: {
				show: {
					resource: ["analytics"],
					operation: ["get"],
				},
			},
			description: "Page size (1-100).",
		},

		// Page
		{
			displayName: "Page",
			name: "page",
			type: "number",
			default: 1,
			typeOptions: {
				minValue: 1,
			},
			displayOptions: {
				show: {
					resource: ["analytics"],
					operation: ["get"],
				},
			},
			description: "Page number (starts at 1).",
		},

		// Sort By
		{
			displayName: "Sort By",
			name: "sortBy",
			type: "options",
			options: [
				{ name: "Date", value: "date" },
				{ name: "Engagement", value: "engagement" },
			],
			default: "date",
			displayOptions: {
				show: {
					resource: ["analytics"],
					operation: ["get"],
				},
			},
			description: "Sort results by date or engagement.",
		},

		// Order
		{
			displayName: "Order",
			name: "order",
			type: "options",
			options: [
				{ name: "Descending", value: "desc" },
				{ name: "Ascending", value: "asc" },
			],
			default: "desc",
			displayOptions: {
				show: {
					resource: ["analytics"],
					operation: ["get"],
				},
			},
			description: "Sort order.",
		},

		// Video ID (YouTube Daily Views)
		{
			displayName: "Video ID",
			name: "videoId",
			type: "string",
			default: "",
			required: true,
			placeholder: "e.g. dQw4w9WgXcQ",
			displayOptions: {
				show: {
					resource: ["analytics"],
					operation: ["youtubeDailyViews"],
				},
			},
			description: "The YouTube video ID.",
		},

		// Account ID (YouTube Daily Views + LinkedIn endpoints)
		{
			...buildAccountIdField(
				"analytics",
				["youtubeDailyViews", "linkedinAggregateAnalytics", "linkedinPostAnalytics"],
				"Account ID",
				"The Late account ID"
			),
			required: true,
		},

		// Start date (YouTube daily views) - YYYY-MM-DD
		{
			displayName: "Start Date",
			name: "startDate",
			type: "string",
			default: "",
			placeholder: "e.g. 2024-01-01",
			displayOptions: {
				show: {
					resource: ["analytics"],
					operation: ["youtubeDailyViews", "linkedinAggregateAnalytics"],
				},
			},
			description:
				"Start date (YYYY-MM-DD). For YouTube daily views defaults to 30 days ago if omitted.",
		},

		// End date (YouTube daily views) - YYYY-MM-DD
		{
			displayName: "End Date",
			name: "endDate",
			type: "string",
			default: "",
			placeholder: "e.g. 2024-01-31",
			displayOptions: {
				show: {
					resource: ["analytics"],
					operation: ["youtubeDailyViews", "linkedinAggregateAnalytics"],
				},
			},
			description:
				"End date (YYYY-MM-DD). For YouTube daily views defaults to 3 days ago due to YouTube Analytics latency.",
		},

		// Follower stats - Account IDs (comma-separated)
		{
			displayName: "Account IDs",
			name: "accountIds",
			type: "string",
			default: "",
			placeholder: "e.g. acc_123,acc_456",
			displayOptions: {
				show: {
					resource: ["analytics"],
					operation: ["followerStats"],
				},
			},
			description:
				"Comma-separated list of account IDs. Leave empty to fetch stats for all connected accounts.",
		},

		// Follower stats - Granularity
		{
			displayName: "Granularity",
			name: "granularity",
			type: "options",
			options: [
				{ name: "Daily", value: "daily" },
				{ name: "Weekly", value: "weekly" },
				{ name: "Monthly", value: "monthly" },
			],
			default: "daily",
			displayOptions: {
				show: {
					resource: ["analytics"],
					operation: ["followerStats"],
				},
			},
			description: "Data aggregation level.",
		},

		// LinkedIn aggregate - aggregation
		{
			displayName: "Aggregation",
			name: "aggregation",
			type: "options",
			options: [
				{ name: "Total", value: "TOTAL" },
				{ name: "Daily", value: "DAILY" },
			],
			default: "TOTAL",
			displayOptions: {
				show: {
					resource: ["analytics"],
					operation: ["linkedinAggregateAnalytics"],
				},
			},
			description:
				"Type of aggregation. Note: MEMBERS_REACHED metric is not available with DAILY aggregation.",
		},

		// LinkedIn aggregate - metrics (comma-separated)
		{
			displayName: "Metrics",
			name: "metrics",
			type: "string",
			default: "",
			placeholder: "e.g. IMPRESSION,REACTION,COMMENT",
			displayOptions: {
				show: {
					resource: ["analytics"],
					operation: ["linkedinAggregateAnalytics"],
				},
			},
			description:
				"Comma-separated list of metrics to fetch. Leave empty to fetch all available metrics (IMPRESSION, MEMBERS_REACHED, REACTION, COMMENT, RESHARE).",
		},

		// LinkedIn post analytics - URN
		{
			displayName: "URN",
			name: "urn",
			type: "string",
			default: "",
			required: true,
			placeholder: "e.g. urn:li:share:7123456789012345678",
			displayOptions: {
				show: {
					resource: ["analytics"],
					operation: ["linkedinPostAnalytics"],
				},
			},
			description: "The LinkedIn post URN.",
		},
	],
};