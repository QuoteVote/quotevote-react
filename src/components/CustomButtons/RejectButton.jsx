import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles(() => ({
  button: {
    color: '#f44336',
    borderColor: '#f44336',
  },
  contained: {
    backgroundColor: '#f44336',
    color: '#fff',
    borderColor: '#f44336',
    '&:hover': {
      backgroundColor: '#d32f2f',
    },
  },
  outlined: {
    backgroundColor: 'transparent',
    color: '#f44336',
    borderColor: '#f44336',
  },
}))

function RejectButton(props) {
  const { selected, ...rest } = props;
  const classes = useStyles();

  return (
    <Button
      {...rest}
      variant={selected ? 'contained' : 'outlined'}
      className={selected ? `${classes.button} ${classes.contained}` : `${classes.button} ${classes.outlined}`}
      startIcon={<CloseIcon style={{ width: 24, height: 24 }} />}
    >
      DISAGREE
    </Button>
  );
}

export default RejectButton
