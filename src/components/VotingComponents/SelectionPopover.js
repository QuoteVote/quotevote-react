/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react'
import onClickOutside from 'react-onclickoutside'
// import { isMobile } from "react-device-detect"
import PropTypes from 'prop-types'

function selectionExists() {
  const selection = window.getSelection()
  return (
    selection &&
    selection.rangeCount > 0 &&
    selection.getRangeAt(0) &&
    !selection.getRangeAt(0).collapsed &&
    selection.getRangeAt(0).getBoundingClientRect().width > 0 &&
    selection.getRangeAt(0).getBoundingClientRect().height > 0
  )
}

function clearSelection() {
  if (window.getSelection) {
    window.getSelection().removeAllRanges()
  } else if (document.selection) {
    document.selection.empty()
  }
}

class SelectionPopover extends Component {
  constructor(props) {
    super(props)
    this.state = {
      popoverBox: {
        top: 0,
        left: 0,
      },
    }

    this.touchIndex = 0
    this.selectionOffsets = [{}, {}]
    this.interval = null
  }

  // eslint-disable-next-line react/sort-comp
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.showPopover === true && nextProps.showPopover === false) {
      clearSelection()
    }
  }

  componentDidMount() {
    const target = document.querySelector('[data-selectable]')
    target.addEventListener('selectstart', this.handleMobileSelection)
    target.addEventListener('pointerup', this.handleRemoveInterval)
    target.addEventListener('pointermove', this.selectionChange)

    // if (isMobile) {
    //   document.oncontextmenu = function(event) {
    //     return false
    //   }
    // }
  }

  componentWillUnmount() {
    const target = document.querySelector('[data-selectable]')
    target.removeEventListener('selectstart', this.handleMobileSelection)
    target.removeEventListener('pointerup', this.handleRemoveInterval)
    target.removeEventListener('pointermove', this.selectionChange)
  }

  // eslint-disable-next-line react/sort-comp
  render() {
    const { showPopover, children, style } = this.props // eslint-disable-line no-unused-vars
    const {
      popoverBox: { top, left },
    } = this.state

    const visibility = showPopover ? 'visible' : 'hidden'
    const display = showPopover ? 'inline-block' : 'none'

    return (
      <div
        id="selectionPopover"
        // eslint-disable-next-line react/no-string-refs
        ref="selectionPopover"
        style={{
          visibility,
          display,
          position: 'absolute',
          top,
          left,
          zIndex: '1',
          ...style,
        }}
      >
        {showPopover && children}
      </div>
    )
  }

  handleRemoveInterval = () => {
    clearInterval(this.interval)
    this.interval = null
  };

  handleMobileSelection = () => {
    // if (isMobile) {
    //   this.interval = setInterval(this.selectionChange, 10)
    // }
  };

  // eslint-disable-next-line consistent-return
  selectionChange = () => {
    const selection = window.getSelection()
    if (selectionExists()) {
      this.props.onSelect(selection)
      return this.computePopoverBox()
    }
    this.props.onDeselect()
  };

  computePopoverBox = () => {
    const selection = window.getSelection()
    if (!selectionExists()) {
      return
    }
    const selectionBox = selection.getRangeAt(0).getBoundingClientRect()
    // eslint-disable-next-line react/no-string-refs
    const popoverBox = this.refs.selectionPopover.getBoundingClientRect()
    const targetBox = document
      .querySelector('[data-selectable]')
      .getBoundingClientRect()
    this.setState({
      popoverBox: {
        top: selectionBox.top - 80 - targetBox.top - this.props.topOffset,
        left:
          selectionBox.width / 2 -
          popoverBox.width / 2 +
          (selectionBox.left - targetBox.left),
      },
    })
  };

  handleClickOutside = () => {
    this.props.onDeselect()
  };
}

SelectionPopover.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  topOffset: PropTypes.number,
  onDeselect: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  showPopover: PropTypes.bool.isRequired,
}

SelectionPopover.defaultProps = {
  topOffset: 30,
  // eslint-disable-next-line react/default-props-match-prop-types
  showPopover: false,
}

export default onClickOutside(SelectionPopover)
