# Quote Vote - Frontend Component Library Overview

This document lists key frontend components required for the Quote Vote V1 application, derived from the PRD. Components are expected to be implemented using React, TypeScript, and styled with Tailwind CSS.

*(You can copy the detailed list from "2. Key Frontend Components" section above into this file)*

## Component Principles

*   **Reusability:** Components, especially in `src/components/ui/`, should be designed for reuse across different features.
*   **Composability:** Build complex UI structures by composing simpler components.
*   **Accessibility:** Ensure components are accessible via keyboard and screen readers.
*   **Responsiveness:** Components should adapt gracefully to different screen sizes using Tailwind's responsive modifiers.
*   **Typed:** Components should use TypeScript for prop definitions.


# Quote Vote - Frontend Component Library Overview

This document lists key frontend components required for the Quote Vote V1 application, derived from the PRD (Section 4). Components are expected to be implemented using React, TypeScript, and styled with Tailwind CSS, organized within the `frontend/src/components/` directory structure.

## `src/components/layout/` (Main Layout Components)

*   **`Navbar.tsx`**: Main site navigation (links to Feed, Trending, Profile, etc.).
*   **`Header.tsx`**: Top application bar; may include site title/logo, search input, user menu dropdown (profile, settings, logout), and the `NotificationBadge`.
*   **`Sidebar.tsx`**: Optional sidebar; could potentially house the Buddy List or secondary navigation elements.
*   **`MainLayout.tsx`**: Wraps the main application content area (for logged-in users), incorporating `Navbar`, `Header`, and potentially `Sidebar`. Used by `src/app/(main)/layout.tsx`.
*   **`AuthLayout.tsx`**: Simpler layout specifically for authentication pages (Login, Signup).

## `src/components/ui/` (Atomic UI Primitives)

These are general-purpose, reusable UI elements styled with Tailwind CSS.

*   `Button.tsx`
*   `IconButton.tsx`
*   `Input.tsx` (Text input)
*   `Textarea.tsx`
*   `Modal.tsx` (Base modal component/dialog)
*   `Dropdown.tsx` (For dropdown menus)
*   `Avatar.tsx` (Display user avatars)
*   `Tooltip.tsx`
*   `Toast.tsx` (For displaying brief messages/notifications)
*   `Divider.tsx` (Visual separator)
*   `Spinner.tsx` / `LoadingIndicator.tsx`
*   `Card.tsx` (Base card structure for previews, profiles, etc.)
*   `Badge.tsx` (Simple badge for counts or status)

## `src/components/feed/` (Activity Feed Specific)

*   **`FeedView.tsx`**: Main component for the `/feed` page. Handles fetching posts via GraphQL (`Query.feed`), manages pagination/infinite scroll, and renders `PostPreviewCard` components.
*   **`PostPreviewCard.tsx`**: Displays a summarized version of a post within the feed, linking to the full post page.
*   **`FeedFilters.tsx`**: (Optional/Future) Component for potential feed filtering options.
*   **`EmptyStateFeed.tsx`**: Component displayed when the user's feed is empty (e.g., new user not following anyone).

## `src/components/post/` (Post Creation & Display Specific)

*   **`PostView.tsx`**: Main component for the `/post/[postId]` page. Displays the full post content and integrates the chatroom.
*   **`CreatePostForm.tsx`**: Form (likely in a modal or dedicated section) for composing and submitting new posts (`Mutation.createPost`).
*   **`PostHeader.tsx`**: Displays metadata for a single post (author avatar/name, timestamp, title).
*   **`PostBody.tsx`**: Renders the main text content of the post and integrates the `TextHighlighter`.
*   **`TextHighlighter.tsx`**: Handles the logic for selecting text within the `PostBody`.
*   **`ContextualPopup.tsx`**: The UI element that appears when text is highlighted, containing action buttons.
*   **`HighlightReactionButton.tsx`**: Specific buttons within the `ContextualPopup` (e.g., Upvote, Downvote, Comment icons) triggering relevant mutations (`Mutation.voteOnHighlight`).
*   **`ReactionBadge.tsx`**: Displays aggregated reaction counts (from `VoteModel` data) on highlighted text snippets within the `PostBody`.

## `src/components/chat/` (Chatroom & Direct Messaging Specific)

*   **`ChatRoomView.tsx`**: Core component managing the display and interaction within a chat area (used on post pages and potentially DM views). Handles subscriptions (`Subscription.newComment`, `Subscription.typingIndicator`).
*   **`CommentInput.tsx`**: Input field for typing and sending new chat messages (`Mutation.createComment` or `Mutation.sendDirectMessage`).
*   **`CommentThread.tsx`**: Component responsible for rendering the list of `CommentBubble` components, handling potential nesting/reply structure.
*   **`CommentBubble.tsx`**: Displays a single chat message, including sender info, timestamp, and content.
*   **`TypingIndicator.tsx`**: Displays information about users currently typing in the chatroom.
*   **`InlineThread.tsx`**: A mini-thread UI potentially attached directly below a specific highlighted quote or comment, showing focused replies.
*   **`ChatEmptyState.tsx`**: Message shown when a chatroom has no messages yet.
*   **`DirectMessageView.tsx`**: Component specifically for the Direct Messaging interface, likely reusing many `ChatRoomView` sub-components.

## `src/components/profile/` (User Profile Specific)

*   **`UserProfileView.tsx`**: Main component for the `/profile/[userId]` page. Fetches and displays profile data (`Query.user`).
*   **`ProfileHeader.tsx`**: Displays the profile owner's avatar, name, bio, follower/following counts, and relevant action buttons (Follow/Unfollow, Edit Profile).
*   **`UserPostHistory.tsx`**: Fetches and displays a list/feed of posts created by the profile owner (`Query.postsByUser`).
*   **`FollowerList.tsx`**: Component (potentially modal or separate tab) to display lists of users who follow or are followed by the profile owner.
*   **`EditProfileForm.tsx`**: Form (modal or separate page) allowing the logged-in user to update their profile information (`Mutation.updateProfile`).

## `src/components/notifications/` (Notification Specific)

*   **`NotificationListView.tsx`**: Main component for the `/notifications` page. Fetches and displays notifications (`Query.notifications`).
*   **`NotificationItem.tsx`**: Renders a single notification entry with its details and potentially actions (e.g., mark as read).
*   **`NotificationBadge.tsx`**: Small indicator component (likely an icon with a count) showing the number of unread notifications, typically used in the main `Header.tsx`.

## `src/components/buddies/` (Buddy List Specific)

*   **`BuddyListView.tsx`**: Main component for the `/buddies` page. Fetches and displays the user's buddy list (`Query.buddyList`).
*   **`BuddyCard.tsx`**: Displays information about a single buddy in the list, potentially with quick action buttons (e.g., Message).
*   **`BuddyListEmptyState.tsx`**: Message shown when the user hasn't added any buddies.

## `src/components/trending/` (Trending Specific)

*   **`TrendingView.tsx`**: Main component for the `/trending` page. Fetches and displays trending posts (`Query.trendingPosts`).
*   **`TrendingPostCard.tsx`**: Card component specifically styled for displaying posts on the trending page.
*   **`SearchTrending.tsx`**: Input component for searching/filtering trending content.

## Other Potential Components

*   **`ReportModal.tsx`**: Modal component containing the form for reporting content (`Mutation.reportPost`).
*   **`OnboardingGuide.tsx`**: Component(s) used for the new user onboarding flow.
*   **`AdminDashboardComponents/`**: (Post-V1/Admin) Separate components for the moderation dashboard.
