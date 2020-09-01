import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { green } from '@material-ui/core/colors'
import React from 'react'
import { useHistory } from 'react-router-dom'

const GetAccessButtonStyle = withStyles(() => ({
  root: {
    color: 'white',
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
    padding: '10px 15px 10px 15px',
    borderRadius: '8px',
  },
}))(Button)

function GetAccessButton() {
  const history = useHistory()
  const handleClick = () => {
    history.push('/auth/request-access')
  }

  return (
    <GetAccessButtonStyle
      variant="contained"
      color="primary"
      onClick={handleClick}
    >
      Get Access
    </GetAccessButtonStyle>
  )
}
export default GetAccessButton
