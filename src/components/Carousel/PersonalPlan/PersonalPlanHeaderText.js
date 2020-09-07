import React from 'react'
import PropTypes from 'prop-types'

function PersonalPlanHeaderText({ classes, index }) {
  const { greenTitleText } = classes
  return (
    <>
      {index === 0 && (
        <>
          Share
          {' '}
          <span className={greenTitleText}>
            your voice
          </span>
          , democratically
        </>
      )}
      {index === 1 && (
        <>
          Share
          {' '}
          <span className={greenTitleText}>
            your thoughts
          </span>
          , ideas and plans
        </>
      )}

      {index === 2 && (
        <>
          <span className={greenTitleText}>
            Trending
          </span>
          {' '}
          with no bias
        </>
      )}

    </>
  )
}
PersonalPlanHeaderText.propTypes = {
  classes: PropTypes.object,
  index: PropTypes.number,
}

export default PersonalPlanHeaderText
