/**
 *
 * Dialog
 *
 */
import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles, useTheme } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    width: (props) => (props.width ? props.width : '100%'),
  },
  actions: {
    justifyContent: 'flex-end',
  },
}))

export function Dialog({
  title = 'Title',
  body = 'Body',
  confirmText = 'Discard',
  width,
  onCancel = () => {},
  onConfirm = () => {},
}) {
  const theme = useTheme()
  const classes = useStyles({ width })
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" color="primary">
          {title}
        </Typography>
        <Typography variant="body1">{body}</Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button onClick={onCancel} style={{ color: theme.palette.accent.main }}>
          Cancel
        </Button>
        <Button onClick={onConfirm} variant="contained" color="secondary">
          {confirmText}
        </Button>
      </CardActions>
    </Card>
  )
}

Dialog.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  width: PropTypes.number,
  confirmText: PropTypes.string,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
}
