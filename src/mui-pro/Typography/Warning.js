import React from 'react'
import PropTypes from 'prop-types'

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'

import styles from 'assets/jss/material-dashboard-pro-react/components/typographyStyle'

const useStyles = makeStyles(styles)

export default function Warning(props) {
  const classes = useStyles()
  const { children } = props
  return (
    <div className={`${classes.defaultFontStyle} ${classes.warningText}`}>
      {children}
    </div>
  )
}

Warning.propTypes = {
  children: PropTypes.node,
}
