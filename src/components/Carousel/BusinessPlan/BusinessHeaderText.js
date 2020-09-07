import React from 'react'
import PropTypes from 'prop-types'

function BusinessHeaderText({ classes, index }) {
  const { greenTitleText } = classes
  return (
    <>
      {index === 0 && (
        <>
          Equal Teams,
          {' '}
          <span className={greenTitleText}>
            Quality Teamwork
          </span>
        </>
      )}
      {index === 1 && (
        <>
          Share roadmaps,
          {' '}
          <span className={greenTitleText}>
            discuss decisions
          </span>
        </>
      )}

      {index === 2 && (
        <>
          Every Team on the
          {' '}
          <span className={greenTitleText}>
            Same Page
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
