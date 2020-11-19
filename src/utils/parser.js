export const CONTENT_REGEX = /(\w|\.)+/g

export function parser(doc, selected, select) {
  if (!selected) return
  const charStartIndex = select.anchorOffset
  const charEndIndex = select.focusOffset
  // eslint-disable-next-line consistent-return
  return {
    startIndex: charStartIndex,
    endIndex: charEndIndex,
    text: selected,
    points: charEndIndex - charStartIndex + 1,
  }
}
