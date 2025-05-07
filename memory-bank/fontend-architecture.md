# Quote Vote - Frontend Architecture Overview

This document outlines the architecture and technical approach for the Quote Vote frontend application, built with Next.js.

## Core Technologies

*   **Framework:** Next.js (App Router)
*   **Language:** TypeScript
*   **UI Library:** React
*   **Styling:** Tailwind CSS
*   **API Communication:** GraphQL (using Apollo Client)
*   **State Management:** React Context (initially), potentially Zustand/Jotai for complex client state. Apollo Client cache for server state.
*   **Forms:** React Hook Form (recommended)

## File Structure (High-Level)

The frontend codebase resides in the `frontend/` directory and follows Next.js App Router conventions:

*   **`frontend/src/app/`**: Contains page routes, layouts, and potentially API routes. Routes are grouped by functionality (e.g., `(main)`, `(auth)`).
*   **`frontend/src/components/`**: Houses reusable React components, organized by feature (`feed/`, `post/`, `chat/`, etc.) or UI layer (`ui/` for atomic elements, `layout/`).
*   **`frontend/src/lib/`**: Contains shared logic, utilities, API client setup (`apollo.ts`), authentication helpers (`auth.ts`), custom hooks, etc.
*   **`frontend/src/contexts/`**: Defines React Context providers for global state (Theme, Auth).
*   **`frontend/src/types/`**: Stores TypeScript definitions, including auto-generated types from the GraphQL schema.

*(Refer to detailed structure outline for more)*

## Key Architectural Decisions & Patterns

*   **App Router:** Leverage Next.js App Router for routing, layouts, Server Components, and Client Components. Use Server Components for data fetching where possible, Client Components for interactivity.
*   **Component-Based:** Build the UI from reusable, composable React components.
*   **Utility-First Styling:** Use Tailwind CSS for direct styling in JSX, minimizing custom CSS files. Use tools like `clsx` for conditional classes.
*   **GraphQL Client:** Utilize Apollo Client for declarative data fetching (`useQuery`), mutations (`useMutation`), and real-time updates (`useSubscription`). Leverage its caching capabilities.
*   **Type Safety:** Use TypeScript throughout the application, including auto-generated types from the GraphQL schema via GraphQL Code Generator.
*   **Centralized API Logic:** Configure Apollo Client in `lib/apollo.ts`. GraphQL queries/mutations defined preferably alongside the components that use them or in dedicated `.graphql` files.
*   **State Management Strategy:** Prioritize local state, then React Context for simple global state. Use Apollo Cache for server state. Adopt Zustand/Jotai only if client state complexity warrants it.
*   **Authentication:** Handle auth state via Context/hooks. Protect routes using Middleware or checks in layouts/pages. Secure API communication using auth tokens managed by the client.
*   **Accessibility (a11y):** Embed accessibility considerations into component development (semantic HTML, ARIA, keyboard navigation).
*   **Responsiveness:** Apply Tailwind's responsive modifiers within components for multi-device support.

## Data Flow (Typical Example: Viewing a Post)

1.  User navigates to `/post/[postId]`.
2.  Next.js router maps this to `src/app/(main)/post/[postId]/page.tsx`.
3.  The `page.tsx` component (potentially a Server Component initially) or a child Client Component uses Apollo Client's `useQuery` hook to fetch data for the specific post via GraphQL.
4.  Apollo Client sends the GraphQL query to the backend API (`voxpop-api`).
5.  Backend resolves the query, fetches data from MongoDB, and returns the post data.
6.  Apollo Client receives the data, caches it, and provides it to the `useQuery` hook.
7.  The component re-renders with the fetched post data, displaying it using components from `src/components/post/` (e.g., `PostHeader`, `PostBody`).
8.  If real-time chat is active, a `useSubscription` hook listens for new comments via WebSockets and updates the UI accordingly.
