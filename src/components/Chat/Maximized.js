import React, { Component } from "react"
import {
  CloseIcon,
  IconButton,
  MessageGroup,
  MessageList,
  Row,
  SendButton,
  TextComposer,
  TextInput,
  TitleBar
} from "@livechat/ui-kit"
import { Loader } from "semantic-ui-react"
import "emoji-mart/css/emoji-mart.css"
import MessageBox from "./MessageBox"
import MessageEmojiPortal from "./MessageEmojiPortal"

class Maximized extends Component {
  state = {
    inputText: ""
  }

  renderMessageList = messages => {
    // const { ownId } = this.props;
    return (
      <React.Fragment>
        {messages.map((message, index) => (
          <MessageGroup
            key={index}
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
        ))}
      </React.Fragment>
    )
  }

  renderLoading = () => {
    return (
      <div
        style={{
          position: "relative",
          top: "35%",
          transform: "translate(0,50%)"
        }}
      >
        <Loader active inline="centered" content="Loading" />
      </div>
    )
  }

  setInput = inputText => {
    this.setState({ inputText }, () => {
      const input = this.input
      input.state.value = inputText
      this.forceUpdate()
    })
  }

  handleSubmit = event => {
    const { onMessageSend } = this.props
    onMessageSend(event)
    this.setState({ inputText: "" })
  }

  render = () => {
    const { data, minimize, title, loading, messageRoomId } = this.props

    let messages = []
    if (data && "messages" in data) {
      messages = data.messages
    } else if (data && "userMessages" in data) {
      messages = data["userMessages"]
    }

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%"
        }}
      >
        <TitleBar
          rightIcons={[
            <IconButton key="close" onClick={minimize}>
              <CloseIcon />
            </IconButton>
          ]}
          title={title}
        />
        <div
          style={{
            flexGrow: 1,
            minHeight: 0,
            height: "100%"
          }}
        >
          <MessageList active containScrollInSubtree>
            {loading ? this.renderLoading() : this.renderMessageList(messages)}
          </MessageList>
        </div>
        <TextComposer
          onSend={this.handleSubmit}
          value={this.state.inputText}
          onChange={this.handleChange}
          ref={ref => (this.input = ref)}
        >
          <Row align="center">
            <TextInput />
            <SendButton />
          </Row>
          <Row verticalAlign="center" justify="right">
            <MessageEmojiPortal
              messageRoomId={messageRoomId}
              setInput={this.setInput}
            />
          </Row>
        </TextComposer>
        <div
          style={{
            textAlign: "center",
            fontSize: ".6em",
            padding: ".4em",
            background: "#fff",
            color: "#888"
          }}
        >
          {"Powered by Scoreboard.com"}
        </div>
      </div>
    )
  }
}

export default Maximized
