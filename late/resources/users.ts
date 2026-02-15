import type { LateResourceModule } from "../types";

export const usersResource: LateResourceModule = {
	operations: [
		{
			name: "List",
			value: "list",
			action: "List team users",
			routing: {
				request: {
					method: "GET",
					url: "/v1/users",
				},
			},
		},
		{
			name: "Get",
			value: "get",
			action: "Get user",
			routing: {
				request: {
					method: "GET",
					url: "=/v1/users/{{ $parameter.userId }}",
				},
			},
		},
	],

	fields: [
		{
			displayName: "User ID",
			name: "userId",
			type: "string",
			default: "",
			required: true,
			description: "The user ID to retrieve. Get IDs from the 'List' operation.",
			displayOptions: {
				show: {
					resource: ["users"],
					operation: ["get"],
				},
			},
		},
	],
};