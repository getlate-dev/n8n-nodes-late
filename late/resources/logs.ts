import type { LateResourceModule } from "../types";
import { SUPPORTED_PLATFORMS } from "../utils/platformHelpers";

export const logsResource: LateResourceModule = {
	operations: [
		{
			name: "List",
			value: "list",
			action: "List publishing logs",
			routing: {
				request: {
					method: "GET",
					url: "/posts/logs",
					qs: {
						status: "={{ $parameter.status || undefined }}",
						platform: "={{ $parameter.platform || undefined }}",
						action: "={{ $parameter.action || undefined }}",
						days: "={{ $parameter.days || 7 }}",
						limit: "={{ $parameter.limit || 50 }}",
						skip: "={{ $parameter.skip || 0 }}",
					},
				},
			},
		},
		{
			name: "Get",
			value: "get",
			action: "Get log entry details",
			routing: {
				request: {
					method: "GET",
					url: "=/logs/{{ $parameter.logId }}",
				},
			},
		},
		{
			name: "List (Deprecated)",
			value: "listDeprecated",
			action: "List publishing logs (deprecated)",
			routing: {
				request: {
					method: "GET",
					url: "/logs",
					qs: {
						status: "={{ $parameter.status || undefined }}",
						platform: "={{ $parameter.platform || undefined }}",
						action: "={{ $parameter.action || undefined }}",
						days: "={{ $parameter.days || 7 }}",
						limit: "={{ $parameter.limit || 50 }}",
						skip: "={{ $parameter.skip || 0 }}",
					},
				},
			},
		},
		{
			name: "List Connection Logs",
			value: "listConnectionLogs",
			action: "List connection logs",
			routing: {
				request: {
					method: "GET",
					url: "/connections/logs",
					qs: {
						platform: "={{ $parameter.platform || undefined }}",
						eventType: "={{ $parameter.eventType || undefined }}",
						status: "={{ $parameter.connectionStatus || undefined }}",
						days: "={{ $parameter.days || 7 }}",
						limit: "={{ $parameter.limit || 50 }}",
						skip: "={{ $parameter.skip || 0 }}",
					},
				},
			},
		},
		{
			name: "List Post Logs",
			value: "listPostLogs",
			action: "List logs for a post",
			routing: {
				request: {
					method: "GET",
					url: "=/posts/{{ $parameter.postId }}/logs",
					qs: {
						limit: "={{ $parameter.postLogsLimit || 50 }}",
					},
				},
			},
		},
	],

	fields: [
		// Log ID for get
		{
			displayName: "Log ID",
			name: "logId",
			type: "string",
			default: "",
			displayOptions: {
				show: {
					resource: ["logs"],
					operation: ["get"],
				},
			},
			description: "The log entry ID to retrieve",
			required: true,
		},

		// Status filter (posts logs + deprecated logs)
		{
			displayName: "Status",
			name: "status",
			type: "options",
			options: [
				{ name: "All", value: "all" },
				{ name: "Success", value: "success" },
				{ name: "Failed", value: "failed" },
				{ name: "Pending", value: "pending" },
				{ name: "Skipped", value: "skipped" },
			],
			default: "all",
			displayOptions: {
				show: {
					resource: ["logs"],
					operation: ["list", "listDeprecated"],
				},
			},
			description: "Filter logs by status",
		},

		// Platform filter (shared)
		{
			displayName: "Platform",
			name: "platform",
			type: "options",
			options: [
				{ name: "All", value: "all" },
				...SUPPORTED_PLATFORMS.map((p) => ({
					name: p.name,
					value: p.value,
				})),
			],
			default: "all",
			displayOptions: {
				show: {
					resource: ["logs"],
					operation: ["list", "listDeprecated", "listConnectionLogs"],
				},
			},
			description: "Filter logs by platform",
		},

		// Action filter (posts logs + deprecated logs)
		{
			displayName: "Action",
			name: "action",
			type: "options",
			options: [
				{ name: "All", value: "all" },
				{ name: "Publish", value: "publish" },
				{ name: "Retry", value: "retry" },
				{ name: "Rate Limit Pause", value: "rate_limit_pause" },
				{ name: "Media Upload", value: "media_upload" },
				{ name: "Token Refresh", value: "token_refresh" },
				{ name: "Cancelled", value: "cancelled" },
			],
			default: "all",
			displayOptions: {
				show: {
					resource: ["logs"],
					operation: ["list", "listDeprecated"],
				},
			},
			description: "Filter logs by action type",
		},

		// Days filter (posts logs + deprecated logs + connection logs)
		{
			displayName: "Days",
			name: "days",
			type: "number",
			default: 7,
			displayOptions: {
				show: {
					resource: ["logs"],
					operation: ["list", "listDeprecated", "listConnectionLogs"],
				},
			},
			description: "Number of days to look back (max 7)",
		},

		// Pagination (posts logs + deprecated logs + connection logs)
		{
			displayName: "Skip",
			name: "skip",
			type: "number",
			default: 0,
			displayOptions: {
				show: {
					resource: ["logs"],
					operation: ["list", "listDeprecated", "listConnectionLogs"],
				},
			},
			description: "Number of logs to skip (for pagination)",
		},
		{
			displayName: "Limit",
			name: "limit",
			type: "number",
			default: 50,
			displayOptions: {
				show: {
					resource: ["logs"],
					operation: ["list", "listDeprecated", "listConnectionLogs"],
				},
			},
			description: "Maximum number of logs to return (max 100)",
		},

		// Connection logs filters
		{
			displayName: "Event Type",
			name: "eventType",
			type: "options",
			options: [
				{ name: "All", value: "all" },
				{ name: "Connect Success", value: "connect_success" },
				{ name: "Connect Failed", value: "connect_failed" },
				{ name: "Disconnect", value: "disconnect" },
				{ name: "Reconnect Success", value: "reconnect_success" },
				{ name: "Reconnect Failed", value: "reconnect_failed" },
			],
			default: "all",
			displayOptions: {
				show: {
					resource: ["logs"],
					operation: ["listConnectionLogs"],
				},
			},
			description: "Filter connection logs by event type",
		},
		{
			displayName: "Status",
			name: "connectionStatus",
			type: "options",
			options: [
				{ name: "All", value: "all" },
				{ name: "Success", value: "success" },
				{ name: "Failed", value: "failed" },
			],
			default: "all",
			displayOptions: {
				show: {
					resource: ["logs"],
					operation: ["listConnectionLogs"],
				},
			},
			description:
				"Filter connection logs by status (shorthand). success = connect_success + reconnect_success, failed = connect_failed + reconnect_failed",
		},

		// Post logs
		{
			displayName: "Post ID",
			name: "postId",
			type: "string",
			default: "",
			displayOptions: {
				show: {
					resource: ["logs"],
					operation: ["listPostLogs"],
				},
			},
			description: "The post ID to retrieve logs for",
			placeholder: "64f0a1b2c3d4e5f6a7b8c9d0",
			required: true,
		},
		{
			displayName: "Limit",
			name: "postLogsLimit",
			type: "number",
			default: 50,
			displayOptions: {
				show: {
					resource: ["logs"],
					operation: ["listPostLogs"],
				},
			},
			description: "Maximum number of logs to return for the post (max 100)",
		},
	],
};