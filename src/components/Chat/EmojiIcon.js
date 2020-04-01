import React from "react"

const EmojiIcon = props => (
  <span
    style={{ fontSize: "14px" }}
    role="img"
    aria-label={props.label ? props.label : ""}
    aria-hidden={props.label ? "false" : "true"}
  >
    {props.symbol}
  </span>
)
export default EmojiIcon
