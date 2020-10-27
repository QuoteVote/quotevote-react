import React from 'react'
import Highlighter from 'react-highlight-words'

const HighlightText = () => (
  <Highlighter
    highlightClassName="YourHighlightClass"
    searchWords={['and', 'or', 'the']}
    autoEscape
    textToHighlight="The dog is chasing the cat. Or perhaps they're just playing?"
  />
)

export default HighlightText
