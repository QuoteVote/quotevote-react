import gql from "graphql-tag";

export const DOMAIN_QUERY = gql`
query domains($limit: Int!) {
  domains(limit: $limit) {
    _id
    adminIds
    allowedUserIds
    key
    privacy
    title
    url
    description
  }
}
`
export const USER_INVITE_REQUESTS = gql`
    query userInviteRequests {
      userInviteRequests {
        email
        status
        _id
      }
    }


`

export const UPDATE_USER_INVITE_STATUS = gql`
  mutation sendUserInviteApproval($user_invite_id: String!, $action: String!) {
    sendUserInviteApproval(user_invite_id: $user_invite_id, action: $action)
  }
`;