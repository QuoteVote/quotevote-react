/* eslint-disable react/prop-types */
import React, { Fragment, useState } from 'react'
import { Container } from '@material-ui/core'

import { parser } from 'utils/parser'
import Highlighter from 'react-highlight-words'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import SelectionPopover from './SelectionPopover'

const useStyles = makeStyles({
  root: {
    backgroundColor: '#00CF6E',
    color: 'white',
  },
})
const VotingBoard = ({
  topOffset,
  onSelect,
  highlights,
  content,
  children,
  ...props
}) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [selection, setSelection] = useState({})
  const focusedComment = useSelector((state) => state.ui.focusedComment)
  const { startWordIndex, endWordIndex } = focusedComment || { startWordIndex: 0, endWordIndex: 0 }
  const highlightedText = content.substring(startWordIndex, endWordIndex).replace(/(\r\n|\n|\r)/gm, '')

  const handleSelect = (select) => {
    const text = select.toString()

    if (!text) return
    const selectionVal = parser(content, text, select)

    if (text.length > 0 && onSelect) {
      setOpen(true)
      setSelection(selectionVal)
      onSelect(selectionVal)
    } else {
      setSelection({})
    }
  }

  const findChunksAtBeginningOfWords = () => [{ start: startWordIndex > 0 ? startWordIndex : 0, end: endWordIndex }]

  const renderHighlights = () => {
    if (highlights) {
      return (
        <Highlighter
          style={{
            whiteSpace: 'pre-line',
          }}
          highlightClassName={classes.root}
          searchWords={[highlightedText]}
          findChunks={findChunksAtBeginningOfWords}
          textToHighlight={content}
          autoEscape
        />
      )
    }

    return content.split(/\n/g).map((line, contentIndex) => (
      <Fragment key={`frag-${contentIndex}`}>
        {line.split(/\s+/g).map((word, index) => (
          <span key={index + word}>{`${word} `}</span>
        ))}
        <br />
      </Fragment>
    ))
  }

  return (
    <Container style={{ position: 'relative' }}>
      <div data-selectable>
        <p className="voting_board-content">{renderHighlights()}</p>
      </div>
      <SelectionPopover
        showPopover={open}
        topOffset={topOffset}
        onSelect={handleSelect}
        onDeselect={() => setOpen(false)}
      >
        {props && children({ ...selection })}
      </SelectionPopover>
    </Container>
  )
}

export default VotingBoard
