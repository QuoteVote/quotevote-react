import gql from 'graphql-tag'

export const CREATE_DOMAIN = gql`
  mutation createDomain($domain: DomainInput!) {
    createDomain(domain: $domain) {
      _id
      title
      description
      url
      key
      created
    }
  }`

export const SUBMIT_TEXT = gql`
  mutation submitContent($content: ContentInput!) {
    addContent(content: $content) {
      _id
    }
  }
`

export const UPDATE_USER_INVITE_STATUS = gql`
  mutation sendUserInviteApproval($user_invite_id: String!, $action: String!) {
    sendUserInviteApproval(user_invite_id: $user_invite_id, action: $action)
  }
`

export const VOTE = gql`
  mutation addVote($vote: VoteInput!) {
    addVote(vote: $vote) {
      contentId
      type
      points
      startWordIndex
      endWordIndex
    }
  }
`

export const ADD_COMMENT = gql`
  mutation addComment($comment: CommentInput!) {
    addComment(comment: $comment) {
      _id
    }
  }
`
