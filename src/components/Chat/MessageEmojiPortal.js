import React, { Component } from "react"
import ReactDOM from "react-dom"
import { Portal } from "semantic-ui-react"
import { Picker } from "emoji-mart"
import PropTypes from "prop-types"
import { EmojiIcon, IconButton } from "@livechat/ui-kit"

class MessageEmojiPortal extends Component {
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
    const { messageRoomId } = this.props
    let reactButton = this[`reaction${messageRoomId}`]
    const domNode = ReactDOM.findDOMNode(reactButton)
    const domRect = domNode.getBoundingClientRect()
    this.setState({
      top: domRect.top - 410,
      left: domRect.left - 300
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
        this.props.setInput(this.state.inputText)
      }
    )
  }

  render = () => {
    const { open, left, top } = this.state
    const { messageRoomId } = this.props
    const refId = `reaction${messageRoomId}`
    return (
      <React.Fragment>
        <IconButton ref={c => (this[refId] = c)} fit>
          <EmojiIcon onClick={this.handleClick} />
        </IconButton>
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

MessageEmojiPortal.propTypes = {
  messageRoomId: PropTypes.string.isRequired,
  setInput: PropTypes.func.isRequired
}

export default MessageEmojiPortal
