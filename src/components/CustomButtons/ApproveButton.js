import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import CheckIcon from '@material-ui/icons/Check'

const useStyles = makeStyles(() => ({
  button: {
    color: '#4caf50',
    borderColor: '#4caf50',
  },
  contained: {
    backgroundColor: '#4caf50',
    color: '#fff',
    borderColor: '#4caf50',
    '&:hover': {
      backgroundColor: '#43a047',
    },
  },
  outlined: {
    backgroundColor: 'transparent',
    color: '#4caf50',
    borderColor: '#4caf50',
  },
}))

function ApproveButton(props) {
  const { selected, ...rest } = props;
  const classes = useStyles();

  return (
    <Button
      {...rest}
      variant={selected ? 'contained' : 'outlined'}
      className={selected ? `${classes.button} ${classes.contained}` : `${classes.button} ${classes.outlined}`}
      startIcon={<CheckIcon style={{ width: 24, height: 24 }} />}
    >
      APPROVE
    </Button>
  );
}

export default ApproveButton
