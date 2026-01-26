import type { LateResourceModule } from "../types";
import { buildMediaFilesField } from "../utils/commonFields";

export const mediaResource: LateResourceModule = {
  operations: [
    {
      name: "Upload",
      value: "upload",
      action: "Upload media",
      routing: {
        request: {
          method: "POST",
          url: "/media",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: "={{ $parameter.files?.items?.reduce((acc, item) => { acc[`file_${Date.now()}_${Math.random()}`] = { value: item.data, options: { filename: item.filename || 'upload', contentType: item.mimeType || 'application/octet-stream' } }; return acc; }, {}) || {} }}",
        },
      },
    },
    {
      name: "Get Presigned URL",
      value: "presign",
      action: "Get presigned URL for direct upload",
      routing: {
        request: {
          method: "POST",
          url: "/media/presign",
          body: {
            filename: "={{ $parameter.filename }}",
            contentType: "={{ $parameter.contentType }}",
          },
        },
      },
    },
  ],

  fields: [
    buildMediaFilesField("media", ["upload"]),

    // Presign fields
    {
      displayName: "Filename",
      name: "filename",
      type: "string",
      default: "",
      displayOptions: {
        show: {
          resource: ["media"],
          operation: ["presign"],
        },
      },
      description: "Name of the file to upload (including extension)",
      placeholder: "my-video.mp4",
      required: true,
    },
    {
      displayName: "Content Type",
      name: "contentType",
      type: "options",
      options: [
        { name: "JPEG Image", value: "image/jpeg" },
        { name: "PNG Image", value: "image/png" },
        { name: "WebP Image", value: "image/webp" },
        { name: "GIF Image", value: "image/gif" },
        { name: "MP4 Video", value: "video/mp4" },
        { name: "MOV Video", value: "video/quicktime" },
        { name: "AVI Video", value: "video/x-msvideo" },
        { name: "WebM Video", value: "video/webm" },
        { name: "PDF Document", value: "application/pdf" },
      ],
      default: "video/mp4",
      displayOptions: {
        show: {
          resource: ["media"],
          operation: ["presign"],
        },
      },
      description:
        "MIME type of the file. Returns uploadUrl and publicUrl. PUT your file to uploadUrl, then use publicUrl in posts.",
      required: true,
    },
  ],
};
