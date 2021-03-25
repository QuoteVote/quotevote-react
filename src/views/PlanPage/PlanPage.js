import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { tokenValidator } from 'store/user'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styles from 'assets/jss/material-dashboard-pro-react/views/landingPageStyle'
import { isMobile } from 'react-device-detect'
import SendRequest from 'components/RequestAccess/Plans/Plans'

const useStyles = makeStyles(styles)

export const MOBILE_IMAGE_WIDTH = 250

export default function LandingPage() {
  const classes = useStyles({ isMobile })
  const dispatch = useDispatch()
  const history = useHistory()
  React.useEffect(() => {
    if (tokenValidator(dispatch)) history.push('/hhsb/Home')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={classes.container}>
      <SendRequest />
    </div>
  )
}
