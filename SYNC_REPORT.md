# n8n Node Sync Report

**Generated:** 2026-02-15T07:40:22.925Z
**API Version:** 1.0.1
**Total Endpoints:** 131

## Summary

| Metric | Count |
|--------|-------|
| New/Missing Endpoints | 18 |
| Missing Resources | 0 |

## New Endpoints to Implement

These endpoints exist in the API but are not implemented in the n8n node:

| Tag | Method | Path | Operation ID |
|-----|--------|------|--------------|
| Messages | GET | /v1/inbox/conversations | listInboxConversations |
| Messages | GET | /v1/inbox/conversations/{conversationId} | getInboxConversation |
| Messages | PUT | /v1/inbox/conversations/{conversationId} | updateInboxConversation |
| Messages | GET | /v1/inbox/conversations/{conversationId}/messages | getInboxConversationMessages |
| Messages | POST | /v1/inbox/conversations/{conversationId}/messages | sendInboxMessage |
| Messages | PATCH | /v1/inbox/conversations/{conversationId}/messages/{messageId} | editInboxMessage |
| Comments | GET | /v1/inbox/comments | listInboxComments |
| Comments | GET | /v1/inbox/comments/{postId} | getInboxPostComments |
| Comments | POST | /v1/inbox/comments/{postId} | replyToInboxPost |
| Comments | DELETE | /v1/inbox/comments/{postId} | deleteInboxComment |
| Comments | POST | /v1/inbox/comments/{postId}/{commentId}/hide | hideInboxComment |
| Comments | DELETE | /v1/inbox/comments/{postId}/{commentId}/hide | unhideInboxComment |
| Comments | POST | /v1/inbox/comments/{postId}/{commentId}/like | likeInboxComment |
| Comments | DELETE | /v1/inbox/comments/{postId}/{commentId}/like | unlikeInboxComment |
| Comments | POST | /v1/inbox/comments/{postId}/{commentId}/private-reply | sendPrivateReplyToComment |
| Reviews | GET | /v1/inbox/reviews | listInboxReviews |
| Reviews | POST | /v1/inbox/reviews/{reviewId}/reply | replyToInboxReview |
| Reviews | DELETE | /v1/inbox/reviews/{reviewId}/reply | deleteInboxReviewReply |

## Endpoints by Tag

### ⚠️ Tools

- `GET` /v1/tools/youtube/download
- `GET` /v1/tools/youtube/transcript
- `GET` /v1/tools/instagram/download
- `POST` /v1/tools/instagram/hashtag-checker
- `GET` /v1/tools/tiktok/download
- `GET` /v1/tools/twitter/download
- `GET` /v1/tools/facebook/download
- `GET` /v1/tools/linkedin/download
- `GET` /v1/tools/bluesky/download

### ✅ Analytics

- `GET` /v1/analytics
- `GET` /v1/analytics/youtube/daily-views
- `GET` /v1/accounts/{accountId}/linkedin-aggregate-analytics
- `GET` /v1/accounts/{accountId}/linkedin-post-analytics

### ✅ Account Groups

- `GET` /v1/account-groups
- `POST` /v1/account-groups
- `PUT` /v1/account-groups/{groupId}
- `DELETE` /v1/account-groups/{groupId}

### ✅ Media

- `POST` /v1/media/presign

### ✅ Reddit Search

- `GET` /v1/reddit/search
- `GET` /v1/reddit/feed

### ✅ Usage

- `GET` /v1/usage-stats

### ✅ Posts

- `GET` /v1/posts
- `POST` /v1/posts
- `GET` /v1/posts/{postId}
- `PUT` /v1/posts/{postId}
- `DELETE` /v1/posts/{postId}
- `POST` /v1/posts/bulk-upload
- `POST` /v1/posts/{postId}/retry

### ⚠️ Users

- `GET` /v1/users
- `GET` /v1/users/{userId}

### ✅ Profiles

- `GET` /v1/profiles
- `POST` /v1/profiles
- `GET` /v1/profiles/{profileId}
- `PUT` /v1/profiles/{profileId}
- `DELETE` /v1/profiles/{profileId}

### ⚠️ Accounts

- `GET` /v1/accounts
- `GET` /v1/accounts/follower-stats
- `PUT` /v1/accounts/{accountId}
- `DELETE` /v1/accounts/{accountId}
- `GET` /v1/accounts/health
- `GET` /v1/accounts/{accountId}/health

### ⚠️ API Keys

- `GET` /v1/api-keys
- `POST` /v1/api-keys
- `DELETE` /v1/api-keys/{keyId}

### ✅ Invites

- `POST` /v1/invite/tokens

### ✅ Connect

- `GET` /v1/connect/{platform}
- `POST` /v1/connect/{platform}
- `GET` /v1/connect/facebook/select-page
- `POST` /v1/connect/facebook/select-page
- `GET` /v1/connect/googlebusiness/locations
- `POST` /v1/connect/googlebusiness/select-location
- `GET` /v1/connect/pending-data
- `GET` /v1/connect/linkedin/organizations
- `POST` /v1/connect/linkedin/select-organization
- `GET` /v1/connect/pinterest/select-board
- `POST` /v1/connect/pinterest/select-board
- `GET` /v1/connect/snapchat/select-profile
- `POST` /v1/connect/snapchat/select-profile
- `POST` /v1/connect/bluesky/credentials
- `GET` /v1/connect/telegram
- `POST` /v1/connect/telegram
- `PATCH` /v1/connect/telegram
- `GET` /v1/accounts/{accountId}/facebook-page
- `PUT` /v1/accounts/{accountId}/facebook-page
- `GET` /v1/accounts/{accountId}/linkedin-organizations
- `PUT` /v1/accounts/{accountId}/linkedin-organization
- `GET` /v1/accounts/{accountId}/pinterest-boards
- `PUT` /v1/accounts/{accountId}/pinterest-boards
- `GET` /v1/accounts/{accountId}/gmb-locations
- `PUT` /v1/accounts/{accountId}/gmb-locations
- `GET` /v1/accounts/{accountId}/reddit-subreddits
- `PUT` /v1/accounts/{accountId}/reddit-subreddits
- `GET` /v1/accounts/{accountId}/reddit-flairs

### ⚠️ GMB Reviews

- `GET` /v1/accounts/{accountId}/gmb-reviews

### ⚠️ GMB Food Menus

- `GET` /v1/accounts/{accountId}/gmb-food-menus
- `PUT` /v1/accounts/{accountId}/gmb-food-menus

### ⚠️ GMB Location Details

- `GET` /v1/accounts/{accountId}/gmb-location-details
- `PUT` /v1/accounts/{accountId}/gmb-location-details

### ⚠️ GMB Media

- `GET` /v1/accounts/{accountId}/gmb-media
- `POST` /v1/accounts/{accountId}/gmb-media
- `DELETE` /v1/accounts/{accountId}/gmb-media

### ⚠️ GMB Attributes

- `GET` /v1/accounts/{accountId}/gmb-attributes
- `PUT` /v1/accounts/{accountId}/gmb-attributes

### ⚠️ GMB Place Actions

- `GET` /v1/accounts/{accountId}/gmb-place-actions
- `POST` /v1/accounts/{accountId}/gmb-place-actions
- `DELETE` /v1/accounts/{accountId}/gmb-place-actions

### ⚠️ LinkedIn Mentions

- `GET` /v1/accounts/{accountId}/linkedin-mentions

### ✅ Queue

- `GET` /v1/queue/slots
- `POST` /v1/queue/slots
- `PUT` /v1/queue/slots
- `DELETE` /v1/queue/slots
- `GET` /v1/queue/preview
- `GET` /v1/queue/next-slot

### ✅ Webhooks

- `GET` /v1/webhooks/settings
- `POST` /v1/webhooks/settings
- `PUT` /v1/webhooks/settings
- `DELETE` /v1/webhooks/settings
- `POST` /v1/webhooks/test
- `GET` /v1/webhooks/logs

### ✅ Logs

- `GET` /v1/logs
- `GET` /v1/logs/{logId}
- `GET` /v1/posts/logs
- `GET` /v1/connections/logs
- `GET` /v1/posts/{postId}/logs

### ⚠️ Messages

- `GET` /v1/inbox/conversations 🆕
- `GET` /v1/inbox/conversations/{conversationId} 🆕
- `PUT` /v1/inbox/conversations/{conversationId} 🆕
- `GET` /v1/inbox/conversations/{conversationId}/messages 🆕
- `POST` /v1/inbox/conversations/{conversationId}/messages 🆕
- `PATCH` /v1/inbox/conversations/{conversationId}/messages/{messageId} 🆕

### ⚠️ Account Settings

- `GET` /v1/accounts/{accountId}/messenger-menu
- `PUT` /v1/accounts/{accountId}/messenger-menu
- `DELETE` /v1/accounts/{accountId}/messenger-menu
- `GET` /v1/accounts/{accountId}/instagram-ice-breakers
- `PUT` /v1/accounts/{accountId}/instagram-ice-breakers
- `DELETE` /v1/accounts/{accountId}/instagram-ice-breakers
- `GET` /v1/accounts/{accountId}/telegram-commands
- `PUT` /v1/accounts/{accountId}/telegram-commands
- `DELETE` /v1/accounts/{accountId}/telegram-commands

### ⚠️ Comments

- `GET` /v1/inbox/comments 🆕
- `GET` /v1/inbox/comments/{postId} 🆕
- `POST` /v1/inbox/comments/{postId} 🆕
- `DELETE` /v1/inbox/comments/{postId} 🆕
- `POST` /v1/inbox/comments/{postId}/{commentId}/hide 🆕
- `DELETE` /v1/inbox/comments/{postId}/{commentId}/hide 🆕
- `POST` /v1/inbox/comments/{postId}/{commentId}/like 🆕
- `DELETE` /v1/inbox/comments/{postId}/{commentId}/like 🆕
- `POST` /v1/inbox/comments/{postId}/{commentId}/private-reply 🆕

### ⚠️ Reviews

- `GET` /v1/inbox/reviews 🆕
- `POST` /v1/inbox/reviews/{reviewId}/reply 🆕
- `DELETE` /v1/inbox/reviews/{reviewId}/reply 🆕

