import React from 'react'
import {
  range, get, isEqual, isEmpty, size, reduce,
} from 'lodash'

const getTextSpan = (text, prevSpan = null, style = null) => (
  // eslint-disable-next-line react/jsx-fragments
  <React.Fragment>
    {prevSpan}
    <span style={style}>{text}</span>
  </React.Fragment>
)

const getSpanBgColor = (upvotes, downvotes) => {
  const isEqualVotes = upvotes === downvotes
  const greenBg = upvotes > downvotes
  const voteThreshold = 100 // equal or above threshold will be max darkness of either green (upvotes)/ red(downvotes)
  let opacity = greenBg ? upvotes / voteThreshold : downvotes / voteThreshold
  opacity = opacity > 1 ? 1 : opacity // max opacity is 1
  opacity = opacity < 0.1 ? 0.1 : opacity // set min opacity to 0.1
  if (isEqualVotes) { // gradient bgcolor
    return {
      backgroundImage: `linear-gradient(rgba(0,255,0,${opacity}), rgba(255,0,0,${opacity}))`,
    }
  }
  return {
    backgroundColor: greenBg ? `rgba(0,255,0,${opacity})` : `rgba(255,0,0,${opacity})`,
  }
}

const getTopPostsVoteHighlights = (votes, postTextToChange, text) => {
  let indexesAndTheirPoints = {}
  let postText = postTextToChange
  votes.forEach((vote) => {
    const numbersInRange = range(vote.startWordIndex, vote.endWordIndex + 1) // need to add 1 since range does not include the last index
    numbersInRange.forEach((num) => {
      let newIndexAndItsPoints = {
        up: 0,
        down: 0,
        total: 0,
        range: `${vote.startWordIndex} - ${vote.endWordIndex}`,
        start: vote.startWordIndex,
        end: vote.endWordIndex,
      }
      const existingIndex = get(indexesAndTheirPoints, num, false)
      if (existingIndex) { // prevent adding duplicate property to indexesAndTheirPoints object
        newIndexAndItsPoints = {
          ...existingIndex,
          [vote.type]: existingIndex[vote.type] + 1,
          total: existingIndex.total + 1,
        }
      } else {
        newIndexAndItsPoints = {
          ...newIndexAndItsPoints,
          [vote.type]: newIndexAndItsPoints[vote.type] + 1,
          total: newIndexAndItsPoints.total + 1,
        }
      }
      indexesAndTheirPoints = {
        ...indexesAndTheirPoints,
        [num]: newIndexAndItsPoints,
      }
    })
  })
  let spanNumber = -1
  const spans = []
  reduce(indexesAndTheirPoints, (result, value, key) => {
    const existingSpan = spans[spanNumber]
    if (!isEqual(value, result.prevVal)) {
      if (!existingSpan) { // initial iteration only
        spans.push({ startIndex: key, spanBg: getSpanBgColor(value.up, value.down), value })
      }
      if (existingSpan) { // add endIndex from previous span and add new span
        existingSpan.endIndex = result.prevKey
        existingSpan.text = text.slice(existingSpan.startIndex, existingSpan.endIndex)
        spans.push({ startIndex: key, spanBg: getSpanBgColor(value.up, value.down), value })
      }
      spanNumber += 1
    }
    if (existingSpan && Number(value.end) === Number(key)) {
      // when there is nothing to compare for current 'value' and 'result.prevVal'
      // add endIndex for the last item (end of iteration)
      existingSpan.endIndex = key
      existingSpan.text = text.slice(existingSpan.startIndex, existingSpan.endIndex)
    }
    // eslint-disable-next-line no-param-reassign
    result = {
      prevVal: value,
      prevKey: key,
    }
    return result
  }, { prevVal: {}, prevKey: 0 })

  let startingIndex = 0
  const postLastIndex = size(text) // 'size' starts counting string at index 0
  const spansLastIndex = size(spans) - 1 // 'size' counts the number of array item
  if (!isEmpty(spans)) {
    spans.forEach((span, index) => {
      const noHighlightText = text.slice(startingIndex, span.startIndex)
      const highlightedText = text.slice(span.startIndex, span.endIndex)
      if (index === 0) { // first iteration only
        if (Number(span.startIndex) === 0) { // when first part of the post have votes
          postText = getTextSpan(highlightedText, null, span.spanBg)
        } else {
          postText = getTextSpan(noHighlightText)
          postText = getTextSpan(highlightedText, postText, span.spanBg)
        }
      } else {
        postText = getTextSpan(noHighlightText, postText)
        postText = getTextSpan(highlightedText, postText, span.spanBg)
        if (spansLastIndex === index && span.endIndex !== postLastIndex) {
          // append the last part of the post that doesn't have votes
          const lastText = text.slice(span.endIndex, postLastIndex)
          postText = getTextSpan(lastText, postText)
        }
      }
      startingIndex = span.endIndex
    })
  }

  return postText
}

export default getTopPostsVoteHighlights
