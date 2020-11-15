import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const useStyles = makeStyles(() => ({
  button: {
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    textAlign: 'right',
    color: '#ffffff',
  },
}))

function SettingsSaveButton(props) {
  const classes = useStyles()

  return (
    <Button
      {...props}
      className={classNames(classes.button, props.className)}
      type="submit"
    >
      Save
    </Button>
  )
}

SettingsSaveButton.propTypes = {
  className: PropTypes.any,
}

export default SettingsSaveButton
