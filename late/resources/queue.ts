import type { LateResourceModule } from "../types";
import { buildProfileIdField } from "../utils/commonFields";

export const queueResource: LateResourceModule = {
	operations: [
		{
			name: "List Slots",
			value: "list",
			action: "List queue schedules",
			routing: {
				request: {
					method: "GET",
					url: "/queue/slots",
					qs: {
						profileId: "={{ $parameter.profileId }}",
						queueId: "={{ $parameter.queueId || undefined }}",
						all: "={{ $parameter.all === true ? 'true' : undefined }}",
					},
				},
			},
		},
		{
			name: "Create Slot",
			value: "create",
			action: "Create queue schedule",
			routing: {
				request: {
					method: "POST",
					url: "/queue/slots",
					body: {
						profileId: "={{ $parameter.profileId }}",
						name: "={{ $parameter.name }}",
						timezone: "={{ $parameter.timezone }}",
						slots: "={{ $parameter.slots }}",
						active: "={{ $parameter.active }}",
					},
				},
			},
		},
		{
			name: "Update Slot",
			value: "update",
			action: "Create or update queue schedule",
			routing: {
				request: {
					method: "PUT",
					url: "/queue/slots",
					body: {
						profileId: "={{ $parameter.profileId }}",
						queueId: "={{ $parameter.queueId || undefined }}",
						name: "={{ $parameter.name || undefined }}",
						timezone: "={{ $parameter.timezone }}",
						slots: "={{ $parameter.slots }}",
						active: "={{ $parameter.active }}",
						setAsDefault: "={{ $parameter.setAsDefault || undefined }}",
						reshuffleExisting: "={{ $parameter.reshuffleExisting }}",
					},
				},
			},
		},
		{
			name: "Delete Slot",
			value: "delete",
			action: "Delete queue schedule",
			routing: {
				request: {
					method: "DELETE",
					url: "/queue/slots",
					qs: {
						profileId: "={{ $parameter.profileId }}",
						queueId: "={{ $parameter.queueId }}",
					},
				},
			},
		},
		{
			name: "Preview Queue",
			value: "preview",
			action: "Preview upcoming queue slots",
			routing: {
				request: {
					method: "GET",
					url: "/queue/preview",
					qs: {
						profileId: "={{ $parameter.profileId }}",
						count: "={{ $parameter.count || 20 }}",
					},
				},
			},
		},
		{
			name: "Get Next Slot",
			value: "nextSlot",
			action: "Get next available queue slot",
			routing: {
				request: {
					method: "GET",
					url: "/queue/next-slot",
					qs: {
						profileId: "={{ $parameter.profileId }}",
						queueId: "={{ $parameter.queueId || undefined }}",
					},
				},
			},
		},
	],

	fields: [
		{
			...buildProfileIdField("queue", ["list", "create", "update", "delete", "preview", "nextSlot"], true),
			description: "Profile ID to manage queues for",
		},

		// Queue ID (optional for list/update/nextSlot; required for delete)
		{
			displayName: "Queue ID",
			name: "queueId",
			type: "string",
			default: "",
			displayOptions: {
				show: {
					resource: ["queue"],
					operation: ["list", "update", "delete", "nextSlot"],
				},
			},
			description: "Specific queue ID (optional, defaults to the profile's default queue when omitted)",
			placeholder: "64f0a1b2c3d4e5f6a7b8c9d1",
		},
		{
			displayName: "All",
			name: "all",
			type: "boolean",
			default: false,
			displayOptions: {
				show: {
					resource: ["queue"],
					operation: ["list"],
				},
			},
			description: "When enabled, returns all queues for the profile (all=true)",
		},

		// Name (create required; update optional)
		{
			displayName: "Name",
			name: "name",
			type: "string",
			default: "",
			required: true,
			displayOptions: {
				show: {
					resource: ["queue"],
					operation: ["create"],
				},
			},
			description: "Queue name (e.g., Evening Posts)",
			placeholder: "Evening Posts",
		},
		{
			displayName: "Name",
			name: "name",
			type: "string",
			default: "",
			required: false,
			displayOptions: {
				show: {
					resource: ["queue"],
					operation: ["update"],
				},
			},
			description: "Queue name",
			placeholder: "Morning Posts",
		},

		// Timezone (required for create/update)
		{
			displayName: "Timezone",
			name: "timezone",
			type: "string",
			default: "UTC",
			required: true,
			displayOptions: {
				show: {
					resource: ["queue"],
					operation: ["create", "update"],
				},
			},
			description: "IANA timezone (e.g., America/New_York)",
			placeholder: "America/New_York",
		},

		// Slots (required for create/update)
		{
			displayName: "Slots",
			name: "slots",
			type: "fixedCollection",
			default: {},
			required: true,
			displayOptions: {
				show: {
					resource: ["queue"],
					operation: ["create", "update"],
				},
			},
			description: "Weekly schedule slots for this queue",
			typeOptions: {
				multipleValues: false,
			},
			options: [
				{
					displayName: "Slots",
					name: "slots",
					values: [
						{
							displayName: "Slot",
							name: "slot",
							type: "fixedCollection",
							default: {},
							typeOptions: {
								multipleValues: true,
							},
							options: [
								{
									displayName: "Slot",
									name: "slot",
									values: [
										{
											displayName: "Day of Week",
											name: "dayOfWeek",
											type: "options",
											options: [
												{ name: "Sunday", value: 0 },
												{ name: "Monday", value: 1 },
												{ name: "Tuesday", value: 2 },
												{ name: "Wednesday", value: 3 },
												{ name: "Thursday", value: 4 },
												{ name: "Friday", value: 5 },
												{ name: "Saturday", value: 6 },
											],
											default: 1,
											description: "Day of the week for this slot",
										},
										{
											displayName: "Time",
											name: "time",
											type: "string",
											default: "09:00",
											description: "Time in HH:MM format (24-hour)",
											placeholder: "18:00",
										},
									],
								},
							],
						},
					],
				},
			],
		},

		// Active (optional; defaults true on API)
		{
			displayName: "Active",
			name: "active",
			type: "boolean",
			default: true,
			displayOptions: {
				show: {
					resource: ["queue"],
					operation: ["create", "update"],
				},
			},
			description: "Whether this queue is active",
		},

		// Update-only flags
		{
			displayName: "Set As Default",
			name: "setAsDefault",
			type: "boolean",
			default: false,
			displayOptions: {
				show: {
					resource: ["queue"],
					operation: ["update"],
				},
			},
			description: "Make this queue the default for the profile",
		},
		{
			displayName: "Reshuffle Existing",
			name: "reshuffleExisting",
			type: "boolean",
			default: false,
			displayOptions: {
				show: {
					resource: ["queue"],
					operation: ["update"],
				},
			},
			description: "Whether to reschedule existing queued posts to match the new slots",
		},

		// Delete requirements
		{
			displayName: "Queue ID",
			name: "queueId",
			type: "string",
			default: "",
			required: true,
			displayOptions: {
				show: {
					resource: ["queue"],
					operation: ["delete"],
				},
			},
			description: "Queue ID to delete",
			placeholder: "64f0a1b2c3d4e5f6a7b8c9d1",
		},

		// Preview count
		{
			displayName: "Count",
			name: "count",
			type: "number",
			default: 20,
			displayOptions: {
				show: {
					resource: ["queue"],
					operation: ["preview"],
				},
			},
			description: "Number of upcoming queue slots to preview (1-100)",
		},
	],
};