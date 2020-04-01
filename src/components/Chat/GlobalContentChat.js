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
import {
  CONTENT_CHAT_QUERY,
  CONTENT_CHAT_SUBSCRIPTION,
  CONTENT_MESSAGE_MUTATION
} from "./ChatGraphQL"
import { Query, Subscription } from "react-apollo"
import MessageBox from "./MessageBox"
import ChatLoading from "./ChatLoading"

class GlobalContentChat extends Component {
  state = {
    inputText: ""
  }

  handleSubmit = data => {
    const { contentChatRoom, client } = this.props
    const { contentId } = contentChatRoom

    const newMessage = {
      contentId,
      title: "", // TODO
      text: data,
      imageUrl: "" // TODO
    }

    client.mutate({
      mutation: CONTENT_MESSAGE_MUTATION,
      variables: { message: newMessage }
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
    const { _id } = this.props.contentChatRoom
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
            {this.renderMessages()}
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
            <MessageEmojiPortal messageRoomId={_id} setInput={this.setInput} />
          </Row>
        </TextComposer>
      </React.Fragment>
    )
  }

  renderMessages = () => {
    const { contentChatRoom } = this.props
    const { contentId } = contentChatRoom
    const variables = { contentId }
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%"
        }}
      >
        <Query query={CONTENT_CHAT_QUERY} variables={variables}>
          {({ data, error, loading }) => {
            if (error) return "Sorry, something went wrong. Please try again."
            if (loading) return <ChatLoading />
            const { messages } = data
            return this.renderMessageList(messages)
          }}
        </Query>
      </div>
    )
  }

  renderMessageList = messages => {
    const { contentId } = this.props.contentChatRoom
    const variables = { contentId }
    return (
      <React.Fragment>
        <div style={{ marginTop: "5px" }}>
          {messages.map((message, index) => this.renderMessageBox(message))}
          <Subscription
            subscription={CONTENT_CHAT_SUBSCRIPTION}
            variables={variables}
            onSubscriptionData={({ subscriptionData }) => {
              console.log("CONTENT_CHAT_SUBSCRIPTION", subscriptionData)
            }}
          >
            {({ data, loading, error }) => {
              if (loading || error) return null
              const { messageCreated } = data
              return this.renderMessageBox(messageCreated)
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

export default GlobalContentChat
