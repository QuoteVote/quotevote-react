# Quote Vote Backend (`voxpop-api`) Architecture Overview

This document provides a high-level overview of the file and directory structure within the `backend/voxpop-api` codebase, based on analysis performed on [Date of Analysis].

## Root Directory (`backend/voxpop-api`)

*   **`app/`**: Contains the core application logic.
*   **`tests/`**: Contains automated tests.
*   **`package.json` / `package-lock.json`**: Node.js project definition, dependencies, and scripts.
*   **`.babelrc`**: Configuration for Babel (JavaScript transpiler).
*   **`README.md`, `LICENSE.md`, `.gitignore`**: Standard project files.

## `app/` Directory

*   **`data/`**: Holds the GraphQL schema implementation, including type definitions, resolvers, and likely database model definitions.
*   **`tests/`**: Application-specific tests.
*   **`server.js`**: Main server entry point. Likely configures Express (or similar), middleware, database connection, and GraphQL endpoint.
*   **`ecosystem.config.js`**: Configuration for the PM2 process manager (for deployment).

## `app/data/` Directory (GraphQL Implementation)

*   **`schema.js`**: Assembles the final executable GraphQL schema.
*   **`type_definition/`**: Defines the GraphQL schema structure:
    *   `query_definition.js`: Defines `Query` operations.
    *   `mutation_definition.js`: Defines `Mutation` operations.
    *   `subscription_definition.js`: Defines `Subscription` operations.
    *   `scalar_definition.js`: Defines custom scalars (e.g., `ObjectId`, `DateTime`).
    *   `index.js`: Combines type definitions.
*   **`types/`**: Contains individual files defining the structure of each GraphQL type (`User.js`, `Post.js`, etc.).
*   **`resolvers/`**: Contains the logic for fetching and manipulating data for GraphQL fields:
    *   **`models/`**: Defines the Mongoose schemas mapping to MongoDB collections (`UserModel.js`, `PostModel.js`, etc.). **This is the core database structure.**
    *   **`mutations/`**: Organized by feature; contains resolvers for create, update, delete operations.
    *   **`queries/`**: Organized by feature; contains resolvers for data fetching operations.
    *   **`relationship/`**: Contains resolvers specifically for fetching linked data between models (e.g., fetching a post's author).
    *   **`scalars/`**: Implements the custom scalar logic.
    *   **`utils/`**: Helper functions used within resolvers.
    *   **`constants/`**: Shared constants.
    *   `index.js`, `queries.js`, `mutations.js`, `subscriptions.js`: Entry points mapping schema definitions to resolver implementations.
*   **`inputs/`**: (Assumed, not listed but typical) Defines GraphQL input types for mutations.
*   **`utils/`**: General utility functions for the data layer (authentication, logging, etc.).


## Component Interaction Architecture (Conceptual)

    This describes the flow of information and interaction between the major logical components of the Quote Vote platform:

    *   **Client (Web Browser):**
        *   Runs the Next.js (React) single-page application.
        *   Handles UI rendering (using React components styled with Tailwind CSS).
        *   Manages local UI state.
        *   Sends GraphQL queries/mutations/subscriptions to the API Layer.
        *   Receives data and real-time updates from the API Layer.

    *   **Web Server/Frontend (Next.js):**
        *   Serves the static assets (HTML, CSS, JavaScript) of the React application.
        *   Handles Server-Side Rendering (SSR) or Static Site Generation (SSG) for initial page loads or specific routes if configured.
        *   May handle user sessions or proxy API requests depending on setup.
        *   *Note:* In a typical Next.js setup with API routes, the API Layer might be hosted within this same process.

    *   **API Layer (GraphQL - Node.js/Apollo Server):**
        *   Hosted potentially within Next.js API routes or as a standalone Node.js service (likely managed by PM2 as per `ecosystem.config.js`).
        *   Receives GraphQL requests from the Client.
        *   Authenticates requests (using utils/authentication.js and potentially external providers).
        *   Executes GraphQL Resolvers (located in `app/data/resolvers/`).
        *   Resolvers interact with the Database Layer (Mongoose ODM) to fetch or modify data.
        *   Formats data according to the GraphQL schema and sends the response back to the Client.
        *   Manages GraphQL Subscriptions for real-time features, pushing data over WebSockets.

    *   **Real-time Service (WebSocket):**
        *   Typically integrated with the Apollo Server using libraries like `graphql-ws`.
        *   Maintains persistent WebSocket connections with subscribed Clients.
        *   Receives events (e.g., new message, new notification) pushed from the API Layer's mutation/logic.
        *   Publishes these events to the relevant subscribed Clients.

    *   **Database Layer (Mongoose ODM):**
        *   Provides an abstraction layer over raw MongoDB queries.
        *   Defines data schemas/models (in `app/data/resolvers/models/`).
        *   Used by the GraphQL Resolvers to perform CRUD (Create, Read, Update, Delete) operations.

    *   **Database (MongoDB Cloud Atlas):**
        *   The persistent storage for all application data (users, posts, comments, messages, etc.).
        *   Managed cloud instance providing scalability, backups, etc.

    *   **Authentication Service (External/Internal):**
        *   Handles user registration, login, password management (hashing via `UserModel.hash_password` if internal), and potentially session/token management.
        *   Could be a third-party provider (Okta, Clerk, Auth0) or custom logic using libraries like Passport.js, interacting with the `UserModel`.