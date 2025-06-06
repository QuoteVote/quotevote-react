import React from 'react'
import PropTypes from 'prop-types'

function BusinessHeaderText({ classes, index }) {
  const { greenTitleText } = classes
  return (
    <>
      {index === 0 && (
        <>
          Highlight text,
          {' '}
          <span className={greenTitleText}>
            discuss decisions
          </span>
        </>
      )}
      {index === 1 && (
        <>
          Every team on the
          {' '}
          <span className={greenTitleText}>
            Same Page
          </span>
        </>
      )}

      {index === 2 && (
        <>
          Equal Teams,
          {' '}
          <span className={greenTitleText}>
            Quality Teamwork
          </span>
        </>
      )}

    </>
  )
}
BusinessHeaderText.propTypes = {
  classes: PropTypes.object,
  index: PropTypes.number,
}

export default BusinessHeaderText
