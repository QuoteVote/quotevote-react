# Backend Changes for Post Deletion

The frontend now expects a new GraphQL mutation called `deletePost` which allows
post authors to remove their posts. Admin users may delete any post. When a
post is deleted, requests to its route should return a `404` error.

## Required API Updates

1. **Add `deletePost` Mutation**
   - Input: `postId: String!`
   - Authorization: allow if the requesting user is the creator of the post or
     has `admin` privileges.
   - Response: minimal object with `_id` of the deleted post.

2. **Enforce 404 on Deleted Posts**
   - Update the resolver for `post(postId)` so that when the post does not exist
     or is marked as deleted, the server returns `null` and an HTTP `404` status
     code.

3. **Update Schema and Tests**
   - Add the new mutation and any necessary types to the GraphQL schema.
   - Provide tests covering creator deletion, admin deletion, and the 404
     response when fetching a deleted post.

Once these backend updates are complete, the new delete button in the React
app will function and removed posts will correctly show the error page.
