import React from "react"
import PropTypes from "prop-types"
import {
  Message,
  MessageMedia,
  MessageText,
  MessageTitle
} from "@livechat/ui-kit"
import { Button } from "semantic-ui-react"
import moment from "moment"
import { connect } from "react-redux"
import { chatReaction } from "../../actions/chatCreator"
import ReactionEmojiPortal from "./ReactionEmojiPortal"
import { Query, Subscription } from "react-apollo"
import EmojiIcon from "./EmojiIcon"
import ReactTooltip from "react-tooltip"
import {
  CREATE_USER_MESSAGE_REACTION_MUTATION,
  DELETE_USER_MESSAGE_REACTION_MUTATION,
  MESSAGE_REACTIONS_QUERY,
  MESSAGE_REACTIONS_USER_TOOLTIP_QUERY,
  USER_REACTION_SUBSCRIPTION
} from "./ChatGraphQL"

class MessageBox extends React.PureComponent {
  state = {
    thumbsUp: false,
    thumbsUpId: "",
    thumbsDown: false,
    thumbsDownId: ""
  }

  render = () => {
    const { message } = this.props
    const variables = { messageId: message._id }
    return (
      <div onMouseEnter={this.toggleReactionVisibility}>
        <Query
          query={MESSAGE_REACTIONS_QUERY}
          variables={variables}
          onCompleted={data => {
            const { userMessageReactions } = data
            const hasThumbsUp = userMessageReactions.filter(
              userMessageReaction => userMessageReaction.reaction === "👍"
            )
            const hasThumbsDown = userMessageReactions.filter(
              userMessageReaction => userMessageReaction.reaction === "👎"
            )

            const thumbsUp = hasThumbsUp && hasThumbsUp.length
            let thumbsUpId = ""
            if (thumbsUp) {
              thumbsUpId = hasThumbsUp[0]._id
            }

            const thumbsDown = hasThumbsUp && hasThumbsDown.length
            let thumbsDownId = ""
            if (thumbsDown) {
              thumbsDownId = hasThumbsDown[0]._id
            }

            this.setState({
              thumbsUp,
              thumbsUpId,
              thumbsDown,
              thumbsDownId
            })
          }}
        >
          {({ loading, error, client, data }) => {
            if (loading || error) return null
            return (
              <React.Fragment>
                {this.renderMessage()}
                {this.renderReaction(client, data)}
              </React.Fragment>
            )
          }}
        </Query>
      </div>
    )
  }

  toggleReactionVisibility = () => {
    const { message } = this.props
    this.props.toggleChatReaction(message._id)
  }

  renderMessage = () => {
    const { message } = this.props
    return (
      <Message
        authorName={message.userName}
        date={moment(message.date).format("MMM D, h:mm a")}
        isOwn={false}
        key={message._id}
        avatar={message.userAvatar}
        style={{ color: "black" }}
      >
        {message.title && (
          <MessageTitle style={{ color: "black" }} title={message.title} />
        )}
        {message.text && (
          <MessageText style={{ color: "black" }}>{message.text}</MessageText>
        )}
        {message.imageUrl && (
          <MessageMedia>
            <img src={message.imageUrl} alt="" />
          </MessageMedia>
        )}
      </Message>
    )
  }

  handleDeleteUserReaction = async (reactionId, client) => {
    const { messageId } = this.props
    client.mutate({
      mutation: DELETE_USER_MESSAGE_REACTION_MUTATION,
      variables: { reactionId },
      refetchQueries: [
        {
          query: MESSAGE_REACTIONS_QUERY,
          variables: { messageId }
        }
      ]
    })
  }

  handleThumbsUpDown = async (client, key, symbol) => {
    const { messageId } = this.props
    if (!this.state[key]) {
      client.mutate({
        mutation: CREATE_USER_MESSAGE_REACTION_MUTATION,
        variables: { messageId, reaction: symbol },
        refetchQueries: [
          {
            query: MESSAGE_REACTIONS_QUERY,
            variables: { messageId }
          }
        ]
      })
    } else {
      await this.handleDeleteUserReaction(this.state[`${key}Id`], client)
    }
  }

  renderReactUserTooltip = (messageId, reactionId) => {
    if (!reactionId || reactionId === "") {
      return null
    }

    return (
      <Query
        query={MESSAGE_REACTIONS_USER_TOOLTIP_QUERY}
        variables={{ messageId, reactionId }}
      >
        {({ loading, error, data }) => {
          if (loading || error) return null
          return (
            <React.Fragment>
              <ReactTooltip id={reactionId}>
                {data.userMessageReactionToolTip.map(userMessageReaction => (
                  <span
                    key={`span-${userMessageReaction.id}`}
                  >{`${userMessageReaction.user.name} reacted`}</span>
                ))}
              </ReactTooltip>
            </React.Fragment>
          )
        }}
      </Query>
    )
  }

  renderReactButtons = (client, data) => {
    const { userMessageReactions } = data
    const newUserMessageReactions = userMessageReactions.filter(
      userMessageReaction =>
        userMessageReaction.reaction !== "👍" &&
        userMessageReaction.reaction !== "👎"
    )

    const { message } = this.props
    return (
      <React.Fragment>
        <Subscription
          subscription={USER_REACTION_SUBSCRIPTION}
          variables={{ messageId: message._id }}
          onSubscriptionData={({ client, subscriptionData }) => {
            console.log("User reaction update", subscriptionData)
            const variables = { messageId: message._id }
            client.query({
              query: MESSAGE_REACTIONS_QUERY,
              variables,
              fetchPolicy: "network-only"
            })
          }}
        />
        {newUserMessageReactions.map(userMessageReaction => (
          <Button
            size="mini"
            circular
            color="blue"
            key={userMessageReaction._id}
            data-tip=""
            data-for={userMessageReaction._id}
            onClick={e =>
              this.handleDeleteUserReaction(userMessageReaction._id, client)
            }
          >
            {this.renderReactUserTooltip(message._id, userMessageReaction._id)}
            <EmojiIcon symbol={userMessageReaction.reaction} />
          </Button>
        ))}
      </React.Fragment>
    )
  }

  renderReaction = (client, data) => {
    const { messageId, message } = this.props
    const { thumbsUp, thumbsDown, thumbsUpId, thumbsDownId } = this.state
    const showAll = messageId === message._id
    return (
      <div style={{ float: "left" }}>
        {this.renderReactButtons(client, data)}
        {this.renderReactUserTooltip(message._id, thumbsUpId)}
        {this.renderReactUserTooltip(message._id, thumbsDownId)}
        {showAll || thumbsUp ? (
          <Button
            circular
            icon="thumbs up"
            color={thumbsUp ? "blue" : "grey"}
            onClick={() => this.handleThumbsUpDown(client, "thumbsUp", "👍")}
            data-tip=""
            data-for={thumbsUpId}
          />
        ) : (
          ""
        )}
        {showAll || thumbsDown ? (
          <Button
            circular
            icon="thumbs down"
            onClick={() => this.handleThumbsUpDown(client, "thumbsDown", "👎")}
            color={thumbsDown ? "blue" : "grey"}
            data-tip=""
            data-for={thumbsDownId}
          />
        ) : (
          ""
        )}
        {showAll ? (
          <ReactionEmojiPortal messageId={messageId} client={client} />
        ) : (
          ""
        )}
      </div>
    )
  }
}

MessageBox.propTypes = {
  message: PropTypes.object.isRequired
}

const mapStateToProps = ({ chat }) => {
  return chat
}

const mapDispatchToProps = dispatch => ({
  toggleChatReaction: messageId => {
    dispatch(chatReaction(messageId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MessageBox)
