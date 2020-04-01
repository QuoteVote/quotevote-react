import React, { Component } from "react"
import ReactDOM from "react-dom"
import { Button, Portal } from "semantic-ui-react"
import { Picker } from "emoji-mart"
import PropTypes from "prop-types"
import {
  MESSAGE_REACTIONS_QUERY,
  CREATE_USER_MESSAGE_REACTION_MUTATION
} from "./ChatGraphQL"

class ReactionEmojiPortal extends Component {
  state = {
    open: false,
    top: 0,
    left: 0,
    inputText: ""
  }

  componentDidMount() {
    this.setEmojiLocation()
    window.addEventListener("resize", this.setEmojiLocation)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.setEmojiLocation)
  }

  setEmojiLocation = () => {
    const { messageId } = this.props
    let reactButton = this[`reaction${messageId}`]
    const domNode = ReactDOM.findDOMNode(reactButton)
    const domRect = domNode.getBoundingClientRect()
    this.setState({
      top: domRect.top - 410,
      left: domRect.left - 150
    })
  }

  handleClick = () => this.setState({ open: !this.state.open })

  handleClose = () => this.setState({ open: false })

  handleEmojiPicker = emoji => {
    let sym = emoji.unified.split("-")
    let codesArray = []
    sym.forEach(el => codesArray.push("0x" + el))
    let emojiPic = String.fromCodePoint(...codesArray)
    this.setState(
      {
        inputText: this.state.inputText + emojiPic,
        open: !this.state.open
      },
      () => {
        const { messageId } = this.props
        this.props.client.mutate({
          mutation: CREATE_USER_MESSAGE_REACTION_MUTATION,
          variables: { messageId, reaction: this.state.inputText },
          refetchQueries: [
            {
              query: MESSAGE_REACTIONS_QUERY,
              variables: { messageId }
            }
          ]
        })
      }
    )
  }

  render = () => {
    const { open, left, top } = this.state
    const { messageId } = this.props
    const refId = `reaction${messageId}`
    return (
      <React.Fragment>
        <Button
          ref={c => (this[refId] = c)}
          circular
          icon="smile outline"
          color="grey"
          onClick={this.handleClick}
        />
        <Portal onClose={this.handleClose} open={open}>
          <div style={{ left, position: "fixed", top, zIndex: 1000 }}>
            <Picker
              onSelect={this.handleEmojiPicker}
              title="Scoreboard™"
              set="google"
            />
          </div>
        </Portal>
      </React.Fragment>
    )
  }
}

ReactionEmojiPortal.propTypes = {
  messageId: PropTypes.string.isRequired,
  client: PropTypes.object.isRequired
}

export default ReactionEmojiPortal
