/* eslint-disable react/prop-types */
import React, { Fragment, useState } from 'react'
import { Container } from '@material-ui/core'

import { parser } from 'utils/parser'
import SelectionPopover from './SelectionPopover'

const VotingBoard = ({
  topOffset,
  onSelect,
  highlights,
  content,
  children,
  ...props
}) => {
  const [open, setOpen] = useState(false)
  const [selection, setSelection] = useState({})

  const handleSelect = (select) => {
    const text = select.toString()

    if (!text) return
    const selectionVal = parser(content, text)

    if (text.length > 0 && onSelect) {
      setOpen(true)
      setSelection(selectionVal)
      onSelect(selectionVal)
    } else {
      setSelection({})
    }
  }

  const renderHighlights = () => {
    if (highlights) {
      return content.split(/\n/g).map((line, contentIndex) => (
        <Fragment key={`frag-${contentIndex}`}>
          {line.split(/\s+/g).map((word, index) => (
            <span key={index + word}>{`${word} `}</span>
          ))}
          <br />
        </Fragment>
      ))
    }
    // THIS IS UNSAFE WE MUST SANTIZE THIS
    // eslint-disable-next-line react/no-danger
    return (
      <div
        data-testid="post-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    )
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
