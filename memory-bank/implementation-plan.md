# Quote Vote - Implementation Plan (V1)

This document outlines the plan for developing the Quote Vote V1 features specified in the Product Requirements Document (PRD), leveraging and refining the existing `voxpop-api` backend codebase.

## Guiding Principles

*   Utilize the existing MongoDB/GraphQL backend (`voxpop-api`) as the foundation.
*   Prioritize implementing core user-facing features defined in the PRD.
*   Focus on refining existing models and resolvers where necessary before adding entirely new ones.
*   Maintain consistency with existing backend patterns where sensible.
*   Ensure features align with the Quote Vote vision (text-first, chronological, non-profit).

## Phase 1: Foundation & Refinement

**Goal:** Ensure the existing backend models and core logic cleanly support the fundamental PRD requirements.

1.  **Model Refinement & Clarification:**
    *   **Task:** Add `buddyIds: [ObjectId]` array to `UserModel.js`.
    *   **Task:** Decide on approach for highlighted comments:
        *   *Option A:* Use `QuoteModel`. Clarify `quoted` field (should it be user or post ID?), ensure `quote` field stores comment text. Rename model/fields if needed for clarity (e.g., `HighlightedCommentModel`).
        *   *Option B:* Add optional `startWordIndex`, `endWordIndex` fields to `CommentModel.js`. Remove or repurpose `QuoteModel`. (Option B seems simpler if `QuoteModel` isn't used heavily elsewhere).
        *   *Decision Needed.*
    *   **Task:** Review `PostModel.js` fields (`approvedBy`, `rejectedBy`, `votedBy`, `upvotes`, `downvotes`). Determine if these can be simplified by relying solely on querying `VoteModel`. If so, plan deprecation/removal.
    *   **Task:** Standardize naming conventions (e.g., rename `UserModel._followingId` to `followingIds`, `_followersId` to `followerIds`). Update relevant resolvers.
    *   **Task:** Investigate `Messages.js` model file - remove if it's a duplicate/unused version of `MessageModel.js`.
    *   **Task:** Clarify the purpose of `ContentModel`, `CreatorModel`, `CollectionModel`, `DomainModel`, `GroupModel` in the context of the core V1 features. Document their role or deprioritize refinement if not critical for V1 launch.
2.  **Relationship Resolver Review:**
    *   **Task:** Analyze `resolvers/relationship/post_relationship.js`, `comment_relationship.js`, etc. Document how relationships (e.g., post author, comment author, post comments) are currently resolved (e.g., `populate`, manual lookups). Ensure efficiency.
3.  **Core Logic Review:**
    *   **Task:** Review `resolvers/mutations/post/createPost.js` (or similar) and `resolvers/queries/post/getPosts.js` (or similar) to understand baseline patterns for data creation and retrieval.

## Phase 2: Core Feature Implementation

**Goal:** Implement the main user-facing features from the PRD that require new logic or significant changes.

1.  **Activity Feed:**
    *   **Task:** Implement GraphQL query resolver (e.g., `Query.feed`) that:
        *   Gets the current user's `followingIds`.
        *   Fetches `PostModel` documents where `userId` is in the `followingIds`.
        *   Sorts results strictly by `createdAt` descending.
        *   Implements pagination (cursor-based recommended).
2.  **Buddy List & Direct Messaging:**
    *   **Task:** Implement mutations for adding/removing users from the `buddyIds` list in `UserModel`.
    *   **Task:** Implement query resolver to fetch the current user's buddy list (populating user details).
    *   **Task:** Implement mutation `sendDirectMessage`:
        *   Find or create a `MessageRoomModel` document with `messageType: 'direct'` and the correct participant `users`.
        *   Create a new `MessageModel` document linked to the `messageRoomId`.
        *   (Real-time) Trigger a notification/subscription event.
    *   **Task:** Implement query resolver to fetch DM conversations and messages.
3.  **Contextual Commenting & Reaction Display:**
    *   **Task:** Based on the Phase 1 decision, implement the mutation to create comments linked to highlighted text ranges.
    *   **Task:** Implement query logic (likely within the `Post` type resolver or `HighlightedSection` type resolver) to calculate and display reaction counts (`ReactionBadge`) by aggregating `VoteModel` data for specific text ranges.
4.  **Notifications:**
    *   **Task:** Implement logic within relevant mutations (e.g., create comment, follow user, send DM) to create `NotificationModel` documents for the appropriate recipient (`userId`).
    *   **Task:** Implement query resolvers for fetching (`Query.notifications`) and marking notifications as read (mutation).
    *   **Task:** Implement GraphQL subscription (`Subscription.newNotification`) for real-time alerts.
5.  **Real-time Chat Features:**
    *   **Task:** Ensure GraphQL subscriptions (`Subscription.newComment`, `Subscription.typingIndicator`) are correctly implemented using the chosen WebSocket library, updating clients in real-time.

## Phase 3: Supporting Features & Polish

**Goal:** Implement remaining V1 features and ensure overall quality.

1.  **Trending Page:**
    *   **Task:** Design and implement the trending logic:
        *   *Option A (Simple Aggregation):* Create a `Query.trendingPosts` resolver that aggregates recent `MessageModel` or `ActivityModel` counts grouped by `postId` on-the-fly. Might be slow.
        *   *Option B (Scheduled Job):* Create a background job that periodically calculates trending scores (based on chat volume, reactions, etc.) and stores them (e.g., in `PostModel` or a dedicated `TrendingMetrics` collection). The query resolver then fetches this pre-calculated data. (More scalable).
        *   *Decision Needed.*
    *   **Task:** Implement search functionality within the trending query.
2.  **Moderation & Reporting:**
    *   **Task:** Implement mutation for reporting posts/comments, updating `reported`/`reportedBy` in `PostModel` (or creating a dedicated `ReportModel` if more detail is needed).
    *   **Task:** (Admin) Implement basic dashboard queries/mutations for viewing/acting on reports (requires admin role check).
3.  **Invite System & Onboarding:**
    *   **Task:** Design and implement the invite logic (e.g., `InviteModel`, status fields on `UserModel`, invite code generation/validation).
    *   **Task:** Implement backend support needed for the frontend onboarding flow.
4.  **Frontend Integration:**
    *   **Task:** Work closely with frontend development to ensure GraphQL API meets UI needs.
    *   **Task:** Implement necessary frontend components (`TextHighlighter`, `ContextualPopUp`, `BuddyList`, etc.).
5.  **Testing & Deployment:**
    *   **Task:** Write unit and integration tests for new backend logic.
    *   **Task:** Set up CI/CD pipelines.
    *   **Task:** Prepare deployment configurations (Dockerfiles, `ecosystem.config.js`).

## Assumptions & Dependencies

*   Frontend development (Next.js/React/Tailwind) proceeds in parallel.
*   Access to MongoDB Cloud Atlas instance is configured.
*   Third-party authentication provider is chosen and configured.
*   Decisions marked "Decision Needed" are resolved before starting implementation.

## Future Considerations (Post-V1)

*   Implementing Org features (SSO, customization, detailed permissions).
*   Advanced moderation tools.
*   Federation/ActivityPub integration.
*   Plugin/Extension architecture.


## Frontend Section
# Quote Vote - Implementation Plan (V1)

... (Keep existing Backend sections 1-3) ...

## Phase 4: Frontend Implementation & Integration

**Goal:** Build the Next.js frontend application, integrate with the GraphQL API, and deliver the user experience defined in the PRD. (This phase runs largely in parallel with Backend Phases 2 & 3).

1.  **Project Setup & Foundation:**
    *   **Task:** Initialize Next.js project (`frontend/`) with TypeScript and Tailwind CSS.
    *   **Task:** Set up project structure (App Router, component folders, lib, etc.).
    *   **Task:** Configure ESLint, Prettier, TypeScript.
    *   **Task:** Set up Apollo Client (`lib/apollo.ts`) to connect to the backend GraphQL endpoint.
    *   **Task:** Set up GraphQL Code Generator to generate TypeScript types from the schema.
    *   **Task:** Implement basic layouts (`RootLayout`, `MainLayout`, `AuthLayout`) using `src/components/layout/`.
    *   **Task:** Implement core UI primitives (`src/components/ui/`).
    *   **Task:** Set up basic Authentication flow client-side (Context, hooks, login/signup forms).
2.  **Core Feature UI Development (Parallel to Backend):**
    *   **Task:** Implement Activity Feed UI (`feed/page.tsx` using `FeedView`, `PostPreviewCard`). Integrate with `Query.feed`.
    *   **Task:** Implement Post Creation UI (`CreatePostForm`). Integrate with `Mutation.createPost`.
    *   **Task:** Implement Single Post View & Chatroom UI (`post/[postId]/page.tsx` using `PostView`, `PostHeader`, `PostBody`, `ChatRoomView`, `CommentInput`, etc.). Integrate with `Query.post`, `Query.commentsByPost`, `Mutation.createComment`, and relevant Subscriptions.
    *   **Task:** Implement Contextual Highlighting/Voting UI (`TextHighlighter`, `ContextualPopup`, `HighlightReactionButton`, `ReactionBadge`). Integrate with `Mutation.voteOnHighlight`.
    *   **Task:** Implement User Profile UI (`profile/[userId]/page.tsx` using `UserProfileView`, `ProfileHeader`, etc.). Integrate with `Query.user`, `Query.postsByUser`.
    *   **Task:** Implement Follow/Unfollow UI (buttons on profiles). Integrate with `Mutation.followUser`/`unfollowUser`.
    *   **Task:** Implement Buddy List UI (`buddies/page.tsx` using `BuddyListView`, `BuddyCard`). Integrate with `Query.buddyList`, `Mutation.addBuddy`/`removeBuddy`.
    *   **Task:** Implement Direct Messaging UI (`messages/[roomId]/page.tsx`? or integrated view). Integrate with `Query.messageRooms`, `Query.messages`, `Mutation.sendDirectMessage`, `Subscription.newMessage`.
    *   **Task:** Implement Notifications UI (`notifications/page.tsx` using `NotificationListView`, `NotificationItem`). Integrate with `Query.notifications`, `Mutation.markNotificationRead`, `Subscription.newNotification`.
    *   **Task:** Implement Trending Page UI (`trending/page.tsx`). Integrate with `Query.trendingPosts`.
3.  **Polish & Testing:**
    *   **Task:** Ensure responsiveness across all key pages/components.
    *   **Task:** Perform accessibility checks (keyboard navigation, screen reader testing).
    *   **Task:** Implement loading states and error handling for API interactions.
    *   **Task:** Write frontend tests (Component tests with React Testing Library, potentially E2E tests with Cypress/Playwright).
    *   **Task:** Refine UI/UX based on testing and feedback.

... (Keep existing Assumptions & Future Considerations sections) ...
