# Quote Vote - Product Requirements Document (MVP v1)

## 1. Introduction & Purpose

Quote Vote is a social messaging platform designed to foster meaningful, text-based conversations, drawing inspiration from early internet experiences like chatrooms, message boards, and instant messaging. It serves as an alternative to contemporary ad-supported social media, prioritizing genuine dialogue, simplicity, and community over engagement metrics and algorithmic manipulation.

The platform is operated by a non-profit organization, ensuring an ad-free experience with no algorithmic content boosting or data selling. The codebase is open-source, allowing transparency and enabling organizations to deploy private, self-hosted instances.

This document outlines the requirements for the Minimum Viable Product (MVP) V1 release of Quote Vote.

## 2. Goals & Vision

*   **Foster Meaningful Conversation:** Create a space where text-based dialogue and understanding are prioritized over performance or superficial interactions.
*   **Promote Responsible Communication:** Challenge the spread of misinformation and harmful content prevalent on mainstream platforms by emphasizing empathy, respect, and truth.
*   **User Control & Transparency:** Empower users with chronological feeds, clear moderation policies, and no algorithmic manipulation.
*   **Democratize Decision-Making:** Provide a simple tool for communities and organizations to gather feedback and gauge sentiment transparently.
*   **Build an Intentional Community:** Grow the user base thoughtfully through an invite-only system, focusing on shared values.
*   **Offer a Non-Profit Alternative:** Provide a sustainable, ethical social platform free from the pressures of profit motives, advertising, and data exploitation.

## 3. Target Audience & Use Cases

*   **General Users:** Individuals seeking deeper online conversations, disillusioned with mainstream social media.
*   **Communities & Groups:** Organizations (local governments, student clubs, companies, social clubs) looking for a private, controllable platform for internal discussion, feedback, and decision-making.
    *   *Example:* A City Councilmember posting policy ideas for resident feedback.
    *   *Example:* A University Club President letting members vote on events.
    *   *Example:* A Startup Founder sharing product ideas for team input.
*   **Developers:** Individuals interested in contributing to an open-source, values-driven project.

## 4. Core Features & Requirements

### 4.1. Platform Concept: Minimalist & Text-Only

*   The platform emphasizes text-based interactions to encourage thoughtful engagement.
*   Posts are text-only; no images, videos, or rich media embeds are supported in the MVP to maintain focus and reduce moderation complexity/costs.

### 4.2. Core Layout & Routing

*   **`AppRouter`:** Handles navigation between different sections (e.g., `/feed`, `/post/:id`, `/profile/:userId`, `/trending`, `/notifications`, `/buddies`).
*   **`Layout`:** Provides a consistent structure including navigation, header, and modal containers.
*   **`AuthGuard`:** Protects routes requiring user authentication.
*   **`InviteGate`:** Manages the onboarding flow for new users joining via invitation.
*   **`ThemeProvider`:** Supports light and dark mode themes.
*   **`ErrorBoundary`:** Provides graceful fallback UI for application errors.

### 4.3. Post Creation & Display

*   **Create Post:** Users can create text-only posts to initiate discussions.
*   **Chatroom Generation:** Each post automatically generates a unique, persistent chatroom with its own URL.
*   **`CreatePostForm`:** Input form for composing and submitting new posts.
*   **`PostPage`:** Main view for displaying a single post and its associated chatroom.
*   **`PostHeader`:** Displays title (if any), author, timestamp, and other relevant metadata.
*   **`PostBody`:** Renders the full text content of the post.
*   **Post Editing/Deletion:** Users can edit or delete their own posts.

### 4.4. Activity Feed (Chronological)

*   **Chronological Display:** The main feed (`/feed`) displays all posts from users the current user follows, strictly in reverse chronological order.
*   **No Algorithmic Sorting:** The feed content is not manipulated or re-ordered by algorithms.
*   **`FeedPage`:** Container for the activity feed view.
*   **`PostPreviewCard`:** Renders a summary/preview of each post in the feed.
*   **`FeedFilters`:** (Future consideration) Allow filtering or sorting options (though default is chrono).
*   **`EmptyStateFeed`:** Message shown to new users who are not yet following anyone.

### 4.5. Post Highlighting & Contextual Reactions

*   **Text Highlighting:** Users can select/highlight specific sentences or phrases within a post body.
*   **Contextual Pop-Up:** Selecting text reveals a pop-up menu with reaction options.
*   **Reactions:** Users can react (e.g., Upvote, Downvote) to the highlighted text snippet specifically.
*   **Contextual Commenting:** Users can initiate a comment thread directly linked to the highlighted text snippet.
*   **`TextHighlighter`:** Component enabling text selection within the `PostBody`.
*   **`ContextualPopUp`:** UI element appearing on text highlight.
*   **`HighlightReactionButton`:** Buttons within the pop-up for specific reactions (Upvote/Downvote/Comment).
*   **`ReactionBadge`:** Displays the count of reactions on a highlighted snippet.
*   **`InlineThread`:** Mini-discussion UI attached to a highlighted quote (for contextual comments).

### 4.6. Chatroom Conversation

*   **Real-time Chat:** Chatrooms associated with posts feature real-time message updates.
*   **`ChatRoom`:** Main container for the real-time comment thread.
*   **`CommentInput`:** Text input field for composing and sending chat messages.
*   **`CommentThread`:** Displays messages, potentially with nesting for replies.
*   **`CommentBubble`:** UI for displaying an individual chat message.
*   **Replying:** Users can reply to specific messages within the chat.
*   **`TypingIndicator`:** Shows when other users in the chatroom are actively typing.
*   **`ChatEmptyState`:** Message shown in a chatroom before any messages have been sent.

### 4.7. Buddy List & Direct Messaging

*   **Following Users:** Users can follow other users to see their posts in the Activity Feed.
*   **Buddy List:** Users can add followed users to a separate "Buddy List" for direct communication.
*   **Direct Messaging (DM):** Users can initiate private, 1-on-1 text chats with users on their Buddy List.
*   **`BuddyListPage`:** Displays the user's list of buddies.
*   **`BuddyCard`:** Summary card representing a buddy in the list.
*   **`DirectMessageThread`:** Container view for a private DM conversation.
*   **`DirectMessageInput`:** Input field for sending DMs.
*   **`BuddyListEmptyState`:** Message shown when a user has not added any buddies.
*   *Note:* Buddy List may contain both users and followed chat rooms.

### 4.8. Notifications

*   **Notification Triggers:** Users receive notifications for replies to their posts/comments, direct messages, and potentially mentions.
*   **`NotificationPage`:** Centralized inbox-style page displaying all notifications.
*   **`NotificationItem`:** UI element for a single notification.
*   **`NotificationBadge`:** Icon (likely in the header/nav) indicating the count of unread notifications.
*   **Dismissing Notifications:** Users can mark notifications as read or dismiss them.

### 4.9. Trending Page

*   **Public Page:** A single public page (`/trending`) showing the most active post chatrooms.
*   **Activity Metric:** Posts are ranked based on chat activity (e.g., volume of messages) within the last 24 hours, descending.
*   **No Login Required:** Accessible to visitors who are not logged in.
*   **`TrendingPage`:** Container for the trending view.
*   **`TrendingPostCard`:** Summary card for posts displayed on the trending page.
*   **`SearchTrending`:** Search input to find trending discussions by keyword or topic.

### 4.10. User Profiles

*   **`UserProfilePage`:** View displaying a user's profile information.
*   **`ProfileHeader`:** Shows avatar, display name, bio, and follow/following counts/buttons.
*   **`UserPostHistory`:** List displaying the posts created by the user.
*   **`FollowerList`:** Displays users who follow this user and users this user follows.
*   **`EditProfileForm`:** Allows users to update their display name, avatar, and bio.

### 4.11. Moderation & Reporting

*   **Content Reporting:** Users can report posts or comments deemed inappropriate.
*   **`ReportModal`:** Interface for users to submit reports with a reason.
*   **Transparency:** Moderation actions (e.g., removal) should ideally be logged and visible (potentially via a `TransparencyLog`). Community rules should be clearly stated.
*   **Admin Tools:**
    *   **`ModerationDashboard`:** (Admin/Moderator only) Interface to view and act upon reported content.
    *   *Future:* Automated moderation rules (profanity filters, link blocking).

### 4.12. Invite-Only Access & Onboarding

*   **Invite System:** User growth is managed through an invite-only system to ensure intentional community building.
    *   Initial invites distributed by the core team after 1-on-1 conversation.
    *   Future expansion via user-invitation system or limited approvals.
*   **Onboarding:** A brief onboarding experience explaining the platform's mission, values, and core features.

### 4.13. Shared UI Components

*   Standard reusable components: `Button`, `IconButton`, `Dropdown`, `Modal`, `Input`, `Textarea`, `Avatar`, `Tooltip`, `Toast`, `Divider`.

### 4.14. System Utilities

*   **`RealtimeSocketProvider`:** Manages WebSocket connections for real-time features (chat, typing indicators, notifications).

## 5. User Stories

*(Copied directly from "Quote Vote v1 Product Walkthrough April 2025.txt")*

### 5.1. End User Stories

**1. Activity Feed (Chronological Feed)**

*   As a returning user, I want to see all new posts from people I follow in chronological order so I never miss a conversation.
*   As a user, I want to scroll through a clean feed of post previews so I can decide which discussions to join.
*   As a new user, I want to see a message explaining that my feed is empty because I’m not following anyone yet so I understand what to do next.

**2. Post Creation and Display**

*   As a user, I want to create a text-only post so I can start a new public discussion.
*   As a user, I want my post to automatically generate a unique chatroom so people can talk about it in real time.
*   As a user, I want to edit or delete my own post so I can correct mistakes or remove something I no longer want visible.
*   As a visitor, I want to see the full content of a post when I click into it from the feed so I can engage more deeply.

**3. Post Highlighting and Contextual Reactions**

*   As a reader, I want to highlight specific text within a post so I can respond to a specific sentence or idea.
*   As a user, I want to upvote or downvote a highlighted phrase so I can express agreement or disagreement with that part of the post.
*   As a contributor, I want to comment on a specific quote from a post so I can add focused thoughts or ask clarifying questions.
*   As a participant, I want to see how many reactions a highlighted section has received so I know what parts of a post are resonating.

**4. Chatroom Conversation**

*   As a participant, I want to join a real-time chat about a post so I can respond to others and share my perspective.
*   As a user, I want to see replies update live without refreshing so I can follow the flow of conversation.
*   As a commenter, I want to see who is typing so I know when someone is preparing a response.
*   As a user, I want to reply to specific messages so I can maintain clarity in multi-threaded conversations.

**5. Buddy List and Direct Messaging**

*   As a user, I want to follow other users so their posts show up in my activity feed.
*   As a user, I want to add someone to my Buddy List so I can message them privately.
*   As a user, I want to send a direct message to someone on my Buddy List so I can talk one-on-one.
*   As a user, I want to view my Buddy List and easily click into our direct message thread so I can continue past conversations.

**6. Notifications**

*   As a user, I want to receive a notification when someone replies to my post or comment so I can re-engage.
*   As a user, I want to be notified when I receive a direct message so I don’t miss a personal conversation.
*   As a user, I want to see a list of all recent notifications so I can catch up on activity across the platform.
*   As a user, I want to clear or dismiss notifications so I can stay organized.

**7. Trending Page**

*   As a user, I want to view the most active posts from the last 24 hours so I can jump into high-energy conversations.
*   As a user, I want to search trending posts by keyword or topic so I can find discussions that interest me.
*   As a visitor, I want to browse trending posts even if I’m not logged in so I can explore before creating an account.

**8. Profile Management**

*   As a user, I want to edit my display name, avatar, and bio so others can get a sense of who I am.
*   As a visitor to someone’s profile, I want to see their recent posts and follower/following counts so I can decide if I want to follow them.
*   As a user, I want to browse my own profile to review my post history and update my information.

**9. Moderation and Reporting**

*   As a user, I want to report a post, comment, or user so that inappropriate content can be reviewed.
*   As a user, I want to understand why a comment or post was removed so moderation decisions feel transparent.
*   As a user, I want to trust that community rules are enforced consistently so I feel safe participating.

**10. Invite-Only Access & Onboarding**

*   As a visitor, I want to request an invite so I can join the platform.
*   As an invitee, I want to accept an invite via a secure link so I can quickly get started.
*   As a new user, I want a brief onboarding experience that explains the mission and features so I understand how Quote Vote is different.
*   As a community builder, I want to invite others who align with the platform’s values so we grow intentionally.

**11. System & Accessibility**

*   As a user, I want to use the platform on mobile and desktop so I can participate wherever I am.
*   As a user, I want light/dark mode options so I can choose a comfortable visual style.
*   As a user, I want keyboard accessibility and screen reader support so the platform is usable by everyone.

### 5.2. Org Implementation User Stories (Self-Hosted Instances)

**1. Installation & Deployment**

*   As an IT administrator, I want to install Quote Vote on my organization’s private server so we can control access, data, and security.
*   As a DevOps engineer, I want access to detailed installation documentation and configuration files so I can deploy the platform reliably in our environment.
*   As a systems architect, I want to choose between Docker, Kubernetes, or bare-metal installation options so I can integrate it with our existing infrastructure.
*   As an IT security lead, I want to deploy the platform behind our organization’s firewall so only authorized internal users can access it.

**2. Authentication & Access Control**

*   As an IT administrator, I want to integrate Quote Vote with our Single Sign-On (SSO) provider (e.g. Okta, Microsoft Entra ID) so users don’t need to create separate accounts.
*   As a community manager, I want to configure access groups and permissions (e.g. admin, moderator, user) so I can control what different members of our organization can do.
*   As an organization, I want to restrict signups to users from a specific domain or email whitelist so I can ensure our instance is private.

**3. Customization & Branding**

*   As a communications director, I want to customize the logo, color palette, and site title so the platform matches our organization’s brand.
*   As a community leader, I want to create custom topic categories relevant to our group’s interests (e.g. project teams, departments, shared values).
*   As a social club administrator, I want to prepopulate the platform with welcome posts, guidelines, and pinned conversations to onboard members.

**4. Moderation & Governance**

*   As a moderator, I want tools to flag, review, and remove inappropriate posts or comments so I can uphold our community standards.
*   As an administrator, I want to configure automated moderation rules (e.g. profanity filters, link blocking) to reduce manual oversight.
*   As a legal or compliance officer, I want access to an audit log of moderation actions for internal governance and transparency.

**5. Data Ownership & Privacy**

*   As a legal stakeholder, I want to ensure that all user data, messages, and content are stored only on our servers to comply with data protection policies.
*   As an IT administrator, I want full access to database backups so I can perform regular maintenance or restore data if needed.
*   As an organization, I want to control retention policies for data and chat logs so we can meet compliance or security guidelines.

**6. Analytics & Reporting**

*   As a community manager, I want visibility into which topics are getting the most engagement so I can guide future discussions and campaigns.
*   As an administrator, I want to generate reports on user activity and participation so I can measure platform adoption within our organization.
*   As a strategic leader, I want to monitor how different departments or interest groups are using Quote Vote so we can make data-informed decisions.

**7. Feature Control & Extensions**

*   As an administrator, I want the ability to enable or disable specific features (e.g. buddy lists, direct messages, public chat links) to match our community norms.
*   As a developer, I want to write and install custom plugins or moderation extensions so we can tailor the platform to our specific needs.
*   As an organization, I want the option to allow AI-powered moderation or insights modules only if they run locally and don’t share data externally.

**8. Support & Maintenance**

*   As an administrator, I want access to a private support channel or documentation portal so I can resolve technical issues quickly.
*   As a systems team, we want regular open-source updates or security patches so our instance stays stable and secure.
*   As a community leader, I want a staging environment where I can test new features or configurations before rolling them out to the main group.

**9. Invitations & Onboarding (Org)**

*   As an admin, I want to manually invite users or upload a list of authorized participants so I can launch the platform in a controlled way.
*   As an HR or learning team member, I want to onboard employees or members with a tutorial so they understand how to use the platform effectively.
*   As a club organizer, I want to track who has joined and engaged after being invited so I can follow up with reminders.

## 6. Design & UX Considerations

*   **Minimalist Aesthetic:** Focus on clean typography, clear information hierarchy, and uncluttered interfaces.
*   **Text-Centric:** Design should optimize readability and interaction with text content.
*   **Accessibility:** Ensure keyboard navigation, screen reader compatibility, and sufficient color contrast (incl. light/dark modes).
*   **Responsiveness:** The platform must be usable across desktop and mobile devices.
*   **Mockups:** Refer to the Zeplin project for visual designs: [https://scene.zeplin.io/project/6800863af012ce24cd3f8c9f](https://scene.zeplin.io/project/6800863af012ce24cd3f8c9f)

## 7. Technical Considerations

*   **Frontend Framework:** Next.js (React, TypeScript)
*   **Styling:** Tailwind CSS
*   **State Management:** To be determined (e.g., Zustand, Jotai, React Context based on complexity)
*   **API Protocol:** GraphQL
*   **API Implementation:** Existing `voxpop-api` using Apollo Server (Node.js) / Mongoose.
*   **Database:** Existing `voxpop-api` using MongoDB Cloud (Atlas).
*   **Real-time:** Existing `voxpop-api` likely uses Socket.io via GraphQL Subscriptions.
*   **Deployment/Development:** Docker for local development consistency. Hosting TBD (e.g., Vercel for Next.js, Docker containers on AWS/GCP/Azure, especially for self-hosted instances).
*   **Authentication:** Integration with a third-party provider (e.g., Clerk, Auth0, Okta) or Passport.js strategies.
*   **Open Source:** Codebase will be publicly available on GitHub ([https://github.com/quote-vote/quote-vote](https://github.com/quote-vote/quote-vote) - Placeholder).
*   **Scalability:** Architecture should consider future scalability needs. MongoDB Atlas offers scaling features. Real-time layer may require scaling strategies (e.g., Redis adapter for Socket.io).
*   **Modularity:** Components and backend services should be modular.

## 8. Notes on Existing Backend (`voxpop-api`) Alignment

Analysis of the existing `voxpop-api` backend (MongoDB/Mongoose/GraphQL) reveals the following alignments and considerations relative to the V1 requirements outlined in this PRD:

*   **Core Entities:** Existing Mongoose models (`UserModel`, `PostModel`, `CommentModel`, `MessageModel`, `MessageRoomModel`, `NotificationModel`) provide a strong foundation for the core entities.
*   **Contextual Voting:** The `VoteModel`, with its link to `postId`, `userId`, `type`, and `start/endWordIndex`, directly supports the PRD requirement for up/down voting on specific text ranges within a post.
*   **Follow System:** `UserModel` already includes `_followersId` and `_followingId` arrays, aligning with the need to track follows for the Activity Feed.
*   **Highlight Commenting:** The existing `QuoteModel` (linking posts, users, and text ranges) seems related but needs clarification. It might be suitable, or adapting `CommentModel` to optionally include `start/endWordIndex` might be clearer for comments attached to specific highlights.
*   **Chat/DMs:** `MessageModel` and `MessageRoomModel` provide the structure for both post-based chatrooms and potentially direct messages, needing clear implementation in resolvers based on `messageType`. Real-time aspects via GraphQL Subscriptions seem intended.
*   **Activity Feed Logic:** Requires a specific query resolver to fetch posts based on the current user's following list and sort chronologically. The underlying models support this, but the resolver logic needs implementation/verification.
*   **Buddy List:** This specific concept is not present in the current models. Adding a `buddyIds: [ObjectId]` array to `UserModel` is required.
*   **Reactions:** The `ReactionModel` appears tied to *messages* and uses emojis, differing from the PRD's focus on up/down votes for post highlights (covered by `VoteModel`).
*   **Trending:** No specific trending mechanism was identified in the models. This requires dedicated query/aggregation logic or a separate mechanism.
*   **Schema Refinements:** Opportunities exist to standardize field naming (e.g., `_followingId` -> `followingIds`), potentially simplify vote/reaction tracking on `PostModel` by relying more on queries against `VoteModel`, and clarify the role of models like `ContentModel`, `CreatorModel`, `QuoteModel`.
*   **Missing PRD Features:** Some PRD features like detailed reporting reasons, invite system specifics, and explicit onboarding flows are not directly reflected in the models and will require new logic/models.

**Conclusion:** The existing backend provides a significant head start, particularly for core data structures and contextual voting. Development will focus on building the missing features (Buddy List, specific feed logic, trending), refining existing models/resolvers to fully match PRD specs (highlighted comments, notifications), and ensuring consistency.

## 9. Future Considerations / Open Questions

*   Detailed specification of moderation rules and workflow.
*   Specific mechanisms for user invitations post-initial launch.
*   Implementation details for accessibility standards (WCAG levels).
*   Potential for federation or interoperability with other platforms.
*   Development of custom plugins/extensions framework.
*   Strategy for handling server costs and long-term maintenance for the non-profit.
*   Final clarification on QuoteModel vs CommentModel for highlighted comments.
*   Strategy for implementing the Trending page (aggregation vs. dedicated metrics collection).