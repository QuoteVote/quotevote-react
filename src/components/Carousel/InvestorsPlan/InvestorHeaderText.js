import React from 'react'
import PropTypes from 'prop-types'

function InvestorHeaderText({ classes, index }) {
  const { greenTitleText } = classes
  return (
    <>
      {index === 0 && (
        <>
          Shape VoxPop &
          {' '}
          <span className={greenTitleText}>
            Help it Scale
          </span>
        </>
      )}
      {index === 1 && (
        <>
          All Voices Equal,
          {' '}
          <span className={greenTitleText}>
            All Voices Heard
          </span>
        </>
      )}

      {index === 2 && (
        <>
          Together for
          {' '}
          <span className={greenTitleText}>
            Change
          </span>
        </>
      )}
    </>
  )
}
InvestorHeaderText.propTypes = {
  classes: PropTypes.object,
  index: PropTypes.number,
}

export default InvestorHeaderText
