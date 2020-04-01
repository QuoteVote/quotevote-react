import React, { Component } from "react"
import {
  MessageGroup,
  MessageList,
  Row,
  SendButton,
  TextComposer,
  TextInput
} from "@livechat/ui-kit"
import MessageEmojiPortal from "./MessageEmojiPortal"
import { CHAT_QUERY, CHAT_SUBSCRIPTION, MESSAGE_MUTATION } from "./ChatGraphQL"
import { Query, Subscription } from "react-apollo"
import MessageBox from "./MessageBox"
import ChatLoading from "./ChatLoading"

class GlobalUserChat extends Component {
  state = {
    inputText: ""
  }

  handleSubmit = data => {
    const { buddyId } = this.props.user
    const newMessage = {
      title: "", // TODO
      text: data,
      imageUrl: "" // TODO
    }

    this.props.client.mutate({
      mutation: MESSAGE_MUTATION,
      variables: { message: newMessage, userId: buddyId }
    })

    this.setState({ inputText: "" })
  }

  setInput = inputText => {
    this.setState({ inputText }, () => {
      const input = this.input
      input.state.value = inputText
      this.forceUpdate()
    })
  }

  render() {
    const { selectedMessageRoomId, user } = this.props
    return (
      <React.Fragment>
        <div
          style={{
            flexGrow: 1,
            minHeight: 0,
            height: "100%",
            backgroundColor: "white"
          }}
        >
          <MessageList active containScrollInSubtree>
            {this.renderUserMessages()}
          </MessageList>
        </div>
        <TextComposer
          onSend={this.handleSubmit}
          onChange={this.handleChange}
          value={this.state.inputText}
          ref={ref => (this.input = ref)}
        >
          <Row align="center">
            <TextInput />
            <SendButton />
          </Row>
          <Row verticalAlign="center" justify="right">
            <MessageEmojiPortal
              messageRoomId={
                selectedMessageRoomId || user.lastMessage.messageRoomId
              }
              setInput={this.setInput}
            />
          </Row>
        </TextComposer>
      </React.Fragment>
    )
  }

  renderUserMessages = () => {
    const { lastMessage } = this.props.user
    const variables = { messageRoomId: lastMessage.messageRoomId }
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%"
        }}
      >
        <Query query={CHAT_QUERY} variables={variables}>
          {({ data, error, loading }) => {
            if (error) return "Sorry, something went wrong. Please try again."
            if (loading) return <ChatLoading />
            const { userMessages } = data
            return this.renderMessageList(userMessages)
          }}
        </Query>
      </div>
    )
  }

  renderMessageList = messages => {
    const { lastMessage } = this.props.user
    const variables = { messageRoomId: lastMessage.messageRoomId }
    return (
      <React.Fragment>
        <div style={{ marginTop: "5px" }}>
          {messages.map((message, index) => this.renderMessageBox(message))}
          <Subscription
            subscription={CHAT_SUBSCRIPTION}
            variables={variables}
            onSubscriptionData={({ client, subscriptionData }) => {
              console.log("CHAT_SUBSCRIPTION", subscriptionData)
            }}
          >
            {({ data, loading, error }) => {
              if (loading || error) return null
              const { userMessageCreated } = data
              return this.renderMessageBox(userMessageCreated)
            }}
          </Subscription>
        </div>
      </React.Fragment>
    )
  }

  renderMessageBox = message => (
    <MessageGroup
      key={message._id}
      onlyFirstWithMeta
      avatar={message.userAvatar}
      isOwn={false}
    >
      <MessageBox
        id={message._id}
        key={message._id}
        message={message}
        setInput={this.setInput}
      />
    </MessageGroup>
  )
}

export default GlobalUserChat
