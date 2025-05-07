# Quote Vote - Technology Stack

This document outlines the core technologies used for the Quote Vote platform (V1).

## Frontend

*   **Framework:** Next.js (React, TypeScript)
*   **Styling:** Tailwind CSS
*   **State Management:** TBD (e.g., Zustand, Jotai, React Context based on complexity)
*   **API Communication:** GraphQL Client (e.g., Apollo Client, urql)

## Backend (`voxpop-api`)

*   **Framework:** Node.js (likely with Express.js implicitly via GraphQL server)
*   **API Layer:** GraphQL (using Apollo Server)
*   **Database:** MongoDB (hosted on MongoDB Cloud Atlas)
*   **ODM (Object Document Mapper):** Mongoose
*   **Real-time:** WebSockets via GraphQL Subscriptions (likely using `graphql-ws` or similar with Apollo Server, potentially backed by Socket.io)
*   **Authentication:** TBD - Integration with third-party provider (e.g., Clerk, Auth0, Okta) or Passport.js strategies.

## Development & Deployment

*   **Package Management:** npm or Yarn
*   **Local Development:** Docker, Docker Compose
*   **Deployment:** TBD (e.g., Vercel for Frontend, Docker containers on Cloud Provider like AWS/GCP/Azure for Backend/Self-hosting)
*   **Version Control:** Git (hosted on GitHub - Placeholder: [https://github.com/quote-vote/quote-vote](https://github.com/quote-vote/quote-vote))

## Tooling

*   **Linting/Formatting:** ESLint, Prettier
*   **Transpilation:** Babel (as indicated by `.babelrc`)
*   **Testing:** TBD (Frameworks like Jest, React Testing Library, Cypress likely)
*   **Process Management (Deployment):** PM2 (as indicated by `ecosystem.config.js`)
