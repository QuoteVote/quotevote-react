import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import React from 'react'
import { useHistory } from 'react-router-dom'

const InvestButtonStyle = withStyles(() => ({
  root: {
    color: 'green',
    backgroundColor: 'white',
    '&:hover': {
      color: 'white',
      boxShadow: '1px 2px #FAFAFA',
    },
    padding: '10px 15px 10px 15px',
    borderRadius: '8px',
    boxShadow: '1px 2px #00CF6E',
  },
}))(Button)

function InvestButton() {
  const history = useHistory()
  const handleClick = () => {
    history.push('/auth/landing-page')
  }

  return (
    <InvestButtonStyle
      variant="contained"
      color="primary"
      onClick={handleClick}
    >
      Invest for change
    </InvestButtonStyle>
  )
}
export default InvestButton
