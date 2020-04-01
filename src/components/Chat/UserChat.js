import React, { PureComponent } from "react"
import { Query, withApollo } from "react-apollo"
import { connect } from "react-redux"
import Maximized from "../../components/Chat/Maximized"
import Minimized from "../../components/Chat/Minimized"
import { FixedWrapper, ThemeProvider } from "@livechat/ui-kit"
import PropTypes from "prop-types"
import { CHAT_QUERY, CHAT_SUBSCRIPTION, MESSAGE_MUTATION } from "./ChatGraphQL"

class UserChat extends PureComponent {
  sendMessage = data => {
    const { client } = this.props
    const userId = this.props.match.params.userId

    const newMessage = {
      title: "", // TODO
      text: data,
      imageUrl: "" // TODO
    }

    client.mutate({
      mutation: MESSAGE_MUTATION,
      variables: { message: newMessage, userId }
    })
  }

  render = () => {
    const { messageRoomId } = this.props
    const variables = { messageRoomId }
    return (
      <Query query={CHAT_QUERY} variables={variables}>
        {({ subscribeToMore, ...result }) => (
          <ThemeProvider>
            <FixedWrapper.Root maximizedOnInit>
              <FixedWrapper.Maximized active={true}>
                <Maximized
                  {...this.props}
                  {...result}
                  title={this.props.name}
                  ownId={this.props.userId}
                  sendMessage={this.sendMessage}
                  onMessageSend={this.sendMessage}
                  subscribeToNewMessages={() =>
                    subscribeToMore({
                      document: CHAT_SUBSCRIPTION,
                      variables: { messageRoomId },
                      updateQuery: (prev, { subscriptionData }) => {
                        if (!subscriptionData.data) return prev
                        const newMessage =
                          subscriptionData.data.userMessageCreated
                        return Object.assign({}, prev, {
                          userMessages: [...prev.userMessages, newMessage]
                        })
                      }
                    })
                  }
                />
              </FixedWrapper.Maximized>
              <FixedWrapper.Minimized active={false}>
                <Minimized {...this.props} />
              </FixedWrapper.Minimized>
            </FixedWrapper.Root>
          </ThemeProvider>
        )}
      </Query>
    )
  }
}

const mapStateToProps = ({ login: { user } }) => ({
  creatorId: user.creatorId,
  userId: user._id
})

UserChat.propTypes = {
  messageRoomId: PropTypes.string,
  name: PropTypes.string
}

export default withApollo(connect(mapStateToProps)(UserChat))
