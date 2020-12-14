import React from 'react'
import PropTypes from 'prop-types'

function PersonalPlanHeaderText({ classes, index }) {
  const { greenTitleText } = classes
  return (
    <>
      {index === 0 && (
        <>
          What is
          {' '}
          <span className={greenTitleText}>
            VoxPOP
          </span>
        </>
      )}
      {index === 1 && (
        <>
          Share
          {' '}
          <span className={greenTitleText}>
            a thought
          </span>
          , get feedback
        </>
      )}

      {index === 2 && (
        <>
          Share
          {' '}
          <span className={greenTitleText}>
            your voice
          </span>
          {' '}
          , democratically
        </>
      )}

      {index === 3 && (
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
