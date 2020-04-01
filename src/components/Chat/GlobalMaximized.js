import React, { PureComponent } from "react"
import {
  AgentBar,
  Avatar,
  ChatList,
  ChatListItem,
  CloseIcon,
  Column,
  IconButton,
  MessageList,
  Row,
  Subtitle,
  Title,
  TitleBar
} from "@livechat/ui-kit"
import { Button, Header, Icon } from "semantic-ui-react"
import { Query } from "react-apollo"
import "emoji-mart/css/emoji-mart.css"
import { USER_BUDDY_LIST } from "./ChatGraphQL"
import PropTypes from "prop-types"
import GlobalUserChat from "./GlobalUserChat"
import ChatLoading from "./ChatLoading"
import GlobalContentChat from "./GlobalContentChat"

const defaultTitle = "Buddy List"

const chatView = ["default", "user", "content"]

class GlobalMaximized extends PureComponent {
  state = {
    visible: true,
    user: null,
    title: defaultTitle,
    selectedMessageRoomId: null,
    inputText: "",
    chatView: chatView[0],
    contentChatRoom: null
  }

  handleVisibility = index =>
    this.setState({ visible: !this.state.visible, chatView: chatView[index] })

  handleBuddySelection = user => {
    const { lastMessage } = user
    const { messageRoomId } = lastMessage
    this.setState(
      {
        user,
        title: user.name,
        selectedMessageRoomId: messageRoomId
      },
      () => this.handleVisibility(1)
    )
  }

  handleContentSelection = contentChatRoom => {
    const { lastMessage } = contentChatRoom
    const { title } = lastMessage
    console.log(contentChatRoom)
    this.setState(
      {
        title,
        contentChatRoom
      },
      () => this.handleVisibility(2)
    )
  }

  handleBackButton = () => {
    this.setState({ user: null, title: defaultTitle })
    this.handleVisibility(0)
  }

  renderBackButton = () => (
    <AgentBar>
      <Button
        icon
        color="blue"
        labelPosition="left"
        onClick={this.handleBackButton}
      >
        <Icon name="arrow left" />
        Back
      </Button>
    </AgentBar>
  )

  renderChatList = () => (
    <div
      style={{
        flexGrow: 1,
        minHeight: 0,
        height: "100%",
        backgroundColor: "#191919"
      }}
    >
      <MessageList
        active
        containScrollInSubtree
        style={{
          backgroundColor: "#414141"
        }}
      >
        <ChatList style={{ maxWidth: "100%" }}>
          {this.renderBuddyList()}
        </ChatList>
      </MessageList>
    </div>
  )

  renderBuddyList = () => {
    return (
      <Query query={USER_BUDDY_LIST}>
        {({ loading, error, data }) => {
          if (error) return "Error loading buddy list"
          if (loading) return <ChatLoading />
          const { userBuddyList, getBookmarkedContents } = data
          return (
            <React.Fragment>
              {userBuddyList.map(user => this.renderChatListItem(user))}
              <Header as="h4">CONTENT CONVERSATION</Header>
              {getBookmarkedContents.map(content =>
                this.renderContentListItem(content)
              )}
            </React.Fragment>
          )
        }}
      </Query>
    )
  }

  renderChatListItem = user => {
    const { buddyId, name, avatar, lastMessage } = user
    const { text } = lastMessage
    return (
      <ChatListItem
        key={`chatList${buddyId}`}
        onClick={() => this.handleBuddySelection(user)}
      >
        <Avatar key={`avatar${buddyId}`} imgUrl={avatar} />
        <Column key={`column${buddyId}`}>
          <Row justify key={`row${buddyId}`}>
            <Title ellipsis key={`title${buddyId}`}>{`${name}`}</Title>
          </Row>
          <Subtitle ellipsis key={`subtitle${buddyId}`}>
            {text}
          </Subtitle>
        </Column>
      </ChatListItem>
    )
  }

  renderContentListItem = contentChatRoom => {
    const { _id, lastMessage } = contentChatRoom
    const { avatar, text, title } = lastMessage
    return (
      <React.Fragment>
        <ChatListItem
          key={`chatContentList${_id}`}
          onClick={() => this.handleContentSelection(contentChatRoom)}
        >
          <Avatar key={`avatarContent${_id}`} imgUrl={avatar} />
          <Column key={`columnContent${_id}`}>
            <Row justify key={`rowContent${_id}`}>
              <Title ellipsis key={`titleContent${_id}`}>{`${title}`}</Title>
            </Row>
            <Subtitle ellipsis key={`subtitleContent${_id}`}>
              {text}
            </Subtitle>
          </Column>
        </ChatListItem>
      </React.Fragment>
    )
  }

  render = () => {
    const { minimize, client } = this.props
    const {
      visible,
      selectedMessageRoomId,
      user,
      chatView,
      contentChatRoom
    } = this.state
    const userChatView = chatView === "user"
    const contentChatView = chatView === "content"
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          backgroundColor: "#191919"
        }}
      >
        <TitleBar
          rightIcons={[
            <IconButton key="close" onClick={minimize}>
              <CloseIcon />
            </IconButton>
          ]}
          style={{ backgroundColor: "#2f2f2f" }}
          title={this.state.title}
        />
        {!visible && this.renderBackButton()}
        {visible && this.renderChatList()}

        {!visible && userChatView && user && (
          <GlobalUserChat
            selectedMessageRoomId={selectedMessageRoomId}
            user={user}
            client={client}
          />
        )}

        {!visible && contentChatView && contentChatRoom && (
          <GlobalContentChat
            contentChatRoom={contentChatRoom}
            user={user}
            client={client}
          />
        )}
      </div>
    )
  }
}

GlobalMaximized.propTypes = {
  client: PropTypes.object.isRequired
}

export default GlobalMaximized
