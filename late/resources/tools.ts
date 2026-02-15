import type { INodeProperties } from "n8n-workflow";
import type { LateResourceModule } from "../types";

const resource = "tools";

export const toolsResource: LateResourceModule = {
	operations: [
		{
			name: "Download YouTube Video or Audio",
			value: "downloadYouTube",
			action: "Download YouTube video or audio",
			routing: {
				request: {
					method: "GET",
					url: "/v1/tools/youtube/download",
					qs: {
						url: "={{ $parameter.youtubeUrl }}",
						action: "={{ $parameter.youtubeAction }}",
						format: "={{ $parameter.youtubeFormat }}",
						quality: "={{ $parameter.youtubeQuality }}",
						formatId: "={{ $parameter.youtubeFormatId }}",
					},
				},
			},
		},
		{
			name: "Get YouTube Transcript",
			value: "getYouTubeTranscript",
			action: "Get YouTube transcript",
			routing: {
				request: {
					method: "GET",
					url: "/v1/tools/youtube/transcript",
					qs: {
						url: "={{ $parameter.youtubeTranscriptUrl }}",
						lang: "={{ $parameter.youtubeTranscriptLang }}",
					},
				},
			},
		},
		{
			name: "Download Instagram Media",
			value: "downloadInstagram",
			action: "Download Instagram media",
			routing: {
				request: {
					method: "GET",
					url: "/v1/tools/instagram/download",
					qs: {
						url: "={{ $parameter.instagramUrl }}",
					},
				},
			},
		},
		{
			name: "Check Instagram Hashtags",
			value: "checkInstagramHashtags",
			action: "Check Instagram hashtags",
			routing: {
				request: {
					method: "POST",
					url: "/v1/tools/instagram/hashtag-checker",
					body: {
						hashtags: "={{ $parameter.hashtags }}",
					},
				},
			},
		},
		{
			name: "Download TikTok Video",
			value: "downloadTikTok",
			action: "Download TikTok video",
			routing: {
				request: {
					method: "GET",
					url: "/v1/tools/tiktok/download",
					qs: {
						url: "={{ $parameter.tiktokUrl }}",
						action: "={{ $parameter.tiktokAction }}",
						formatId: "={{ $parameter.tiktokFormatId }}",
					},
				},
			},
		},
		{
			name: "Download Twitter/X Media",
			value: "downloadTwitter",
			action: "Download Twitter/X media",
			routing: {
				request: {
					method: "GET",
					url: "/v1/tools/twitter/download",
					qs: {
						url: "={{ $parameter.twitterUrl }}",
						action: "={{ $parameter.twitterAction }}",
						formatId: "={{ $parameter.twitterFormatId }}",
					},
				},
			},
		},
		{
			name: "Download Facebook Video",
			value: "downloadFacebook",
			action: "Download Facebook video",
			routing: {
				request: {
					method: "GET",
					url: "/v1/tools/facebook/download",
					qs: {
						url: "={{ $parameter.facebookUrl }}",
					},
				},
			},
		},
		{
			name: "Download LinkedIn Video",
			value: "downloadLinkedIn",
			action: "Download LinkedIn video",
			routing: {
				request: {
					method: "GET",
					url: "/v1/tools/linkedin/download",
					qs: {
						url: "={{ $parameter.linkedinUrl }}",
					},
				},
			},
		},
		{
			name: "Download Bluesky Media",
			value: "downloadBluesky",
			action: "Download Bluesky media",
			routing: {
				request: {
					method: "GET",
					url: "/v1/tools/bluesky/download",
					qs: {
						url: "={{ $parameter.blueskyUrl }}",
					},
				},
			},
		},
	],

	fields: [
		// ------------------------
		// YouTube Download
		// ------------------------
		{
			displayName: "YouTube URL or Video ID",
			name: "youtubeUrl",
			type: "string",
			default: "",
			required: true,
			placeholder: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
			description: "YouTube video URL or video ID",
			displayOptions: {
				show: {
					resource: [resource],
					operation: ["downloadYouTube"],
				},
			},
		},
		{
			displayName: "Action",
			name: "youtubeAction",
			type: "options",
			default: "download",
			options: [
				{ name: "Download", value: "download" },
				{ name: "List Formats", value: "formats" },
			],
			description: "Choose whether to return a download URL or list available formats",
			displayOptions: {
				show: {
					resource: [resource],
					operation: ["downloadYouTube"],
				},
			},
		},
		{
			displayName: "Format",
			name: "youtubeFormat",
			type: "options",
			default: "video",
			options: [
				{ name: "Video", value: "video" },
				{ name: "Audio", value: "audio" },
			],
			description: "Desired format (only used when Action is Download)",
			displayOptions: {
				show: {
					resource: [resource],
					operation: ["downloadYouTube"],
				},
			},
		},
		{
			displayName: "Quality",
			name: "youtubeQuality",
			type: "options",
			default: "hd",
			options: [
				{ name: "HD", value: "hd" },
				{ name: "SD", value: "sd" },
			],
			description: "Desired quality (only used when Action is Download)",
			displayOptions: {
				show: {
					resource: [resource],
					operation: ["downloadYouTube"],
				},
			},
		},
		{
			displayName: "Format ID",
			name: "youtubeFormatId",
			type: "string",
			default: "",
			placeholder: "e.g. 137, 140, 22",
			description: "Specific format ID from the formats list. If provided, it takes precedence over Format/Quality.",
			displayOptions: {
				show: {
					resource: [resource],
					operation: ["downloadYouTube"],
				},
			},
		},

		// ------------------------
		// YouTube Transcript
		// ------------------------
		{
			displayName: "YouTube URL or Video ID",
			name: "youtubeTranscriptUrl",
			type: "string",
			default: "",
			required: true,
			placeholder: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
			description: "YouTube video URL or video ID",
			displayOptions: {
				show: {
					resource: [resource],
					operation: ["getYouTubeTranscript"],
				},
			},
		},
		{
			displayName: "Language",
			name: "youtubeTranscriptLang",
			type: "string",
			default: "en",
			placeholder: "en",
			description: "Language code for transcript (for example: en, es, fr)",
			displayOptions: {
				show: {
					resource: [resource],
					operation: ["getYouTubeTranscript"],
				},
			},
		},

		// ------------------------
		// Instagram Download
		// ------------------------
		{
			displayName: "Instagram URL",
			name: "instagramUrl",
			type: "string",
			default: "",
			required: true,
			placeholder: "https://www.instagram.com/reel/ABC123/",
			description: "Instagram reel or post URL",
			displayOptions: {
				show: {
					resource: [resource],
					operation: ["downloadInstagram"],
				},
			},
		},

		// ------------------------
		// Instagram Hashtag Checker
		// ------------------------
		{
			displayName: "Hashtags",
			name: "hashtags",
			type: "string",
			default: "",
			required: true,
			placeholder: "travel,followforfollow,fitness",
			description:
				"Up to 20 hashtags to check. Provide as a comma-separated list (for example: travel, fitness).",
			displayOptions: {
				show: {
					resource: [resource],
					operation: ["checkInstagramHashtags"],
				},
			},
		},

		// ------------------------
		// TikTok Download
		// ------------------------
		{
			displayName: "TikTok URL or Video ID",
			name: "tiktokUrl",
			type: "string",
			default: "",
			required: true,
			placeholder: "https://www.tiktok.com/@user/video/1234567890",
			description: "TikTok video URL or ID",
			displayOptions: {
				show: {
					resource: [resource],
					operation: ["downloadTikTok"],
				},
			},
		},
		{
			displayName: "Action",
			name: "tiktokAction",
			type: "options",
			default: "download",
			options: [
				{ name: "Download", value: "download" },
				{ name: "List Formats", value: "formats" },
			],
			description: "Choose whether to return a download URL or list available formats",
			displayOptions: {
				show: {
					resource: [resource],
					operation: ["downloadTikTok"],
				},
			},
		},
		{
			displayName: "Format ID",
			name: "tiktokFormatId",
			type: "string",
			default: "",
			placeholder: "0",
			description: "Specific format ID from formats list (e.g. 0 = no watermark)",
			displayOptions: {
				show: {
					resource: [resource],
					operation: ["downloadTikTok"],
				},
			},
		},

		// ------------------------
		// Twitter/X Download
		// ------------------------
		{
			displayName: "Twitter/X Post URL",
			name: "twitterUrl",
			type: "string",
			default: "",
			required: true,
			placeholder: "https://x.com/user/status/123456789",
			description: "Twitter/X post URL",
			displayOptions: {
				show: {
					resource: [resource],
					operation: ["downloadTwitter"],
				},
			},
		},
		{
			displayName: "Action",
			name: "twitterAction",
			type: "options",
			default: "download",
			options: [
				{ name: "Download", value: "download" },
				{ name: "List Formats", value: "formats" },
			],
			description: "Choose whether to return a download URL or list available formats",
			displayOptions: {
				show: {
					resource: [resource],
					operation: ["downloadTwitter"],
				},
			},
		},
		{
			displayName: "Format ID",
			name: "twitterFormatId",
			type: "string",
			default: "",
			placeholder: "e.g. 0, 1, 2",
			description: "Specific format ID from formats list",
			displayOptions: {
				show: {
					resource: [resource],
					operation: ["downloadTwitter"],
				},
			},
		},

		// ------------------------
		// Facebook Download
		// ------------------------
		{
			displayName: "Facebook Video/Reel URL",
			name: "facebookUrl",
			type: "string",
			default: "",
			required: true,
			placeholder: "https://www.facebook.com/reel/1234567890",
			description: "Facebook video or reel URL",
			displayOptions: {
				show: {
					resource: [resource],
					operation: ["downloadFacebook"],
				},
			},
		},

		// ------------------------
		// LinkedIn Download
		// ------------------------
		{
			displayName: "LinkedIn Post URL",
			name: "linkedinUrl",
			type: "string",
			default: "",
			required: true,
			placeholder: "https://www.linkedin.com/posts/user_some-post-id",
			description: "LinkedIn post URL",
			displayOptions: {
				show: {
					resource: [resource],
					operation: ["downloadLinkedIn"],
				},
			},
		},

		// ------------------------
		// Bluesky Download
		// ------------------------
		{
			displayName: "Bluesky Post URL",
			name: "blueskyUrl",
			type: "string",
			default: "",
			required: true,
			placeholder: "https://bsky.app/profile/user.bsky.social/post/abc123",
			description: "Bluesky post URL",
			displayOptions: {
				show: {
					resource: [resource],
					operation: ["downloadBluesky"],
				},
			},
		},
	],
};