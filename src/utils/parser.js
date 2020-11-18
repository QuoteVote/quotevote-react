export const CONTENT_REGEX = /(\w|\.)+/g

export function parser(doc, selected, select) {
  const charStartIndex = select.anchorOffset
  const charEndIndex = select.focusOffset

  const selections = selected.match(CONTENT_REGEX)
  const words = doc.match(CONTENT_REGEX)

  if (!selections) return

  const startIndex = words.findIndex((word) => word === selections[0])
  let endIndex = words.findIndex(
    (word) => word === selections[selections.length - 1]
  )

  if (endIndex < 0) {
    endIndex = words.findIndex(
      (word) => word === selections[selections.length - 2]
    )
  }

  // eslint-disable-next-line consistent-return
  return {
    startIndex: charStartIndex,
    endIndex: charEndIndex,
    text: selected/* words.slice(startIndex, endIndex + 1).join(' ') */,
    points: endIndex - startIndex + 1,
  }
}
