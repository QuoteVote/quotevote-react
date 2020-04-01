import React from "react"
import { Loader } from "semantic-ui-react"

const ChatLoading = () => (
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

export default ChatLoading
