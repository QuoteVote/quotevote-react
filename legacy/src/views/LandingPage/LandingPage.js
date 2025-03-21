import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { tokenValidator } from 'store/user'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styles from 'assets/jss/material-dashboard-pro-react/views/landingPageStyle'
import { ListItem } from '@material-ui/core'
import { isMobile } from 'react-device-detect'
import GridContainer from '../../mui-pro/Grid/GridContainer'
import GridItem from '../../mui-pro/Grid/GridItem'
import Button from '../../mui-pro/CustomButtons/Button'

const useStyles = makeStyles(styles)

export const MOBILE_IMAGE_WIDTH = 250

export default function LandingPage() {
  const classes = useStyles({ isMobile })
  const dispatch = useDispatch()
  const history = useHistory()

  React.useEffect(() => {
    if (tokenValidator(dispatch)) history.push('/Home')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <GridContainer
      direction="column"
      alignItems="center"
      justify="center"
      className={classes.container}
    >
      <GridItem xs={12}>
        <ListItem className={classes.listItem}>
          <Button
            variant="contained"
            className={classes.listItemTextRequestInvite}
            type="submit"
            onClick={() => history.push('/auth/request-access')}
          >
            Request Invite
          </Button>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Button
            variant="contained"
            className={classes.listItemTextRequestInvite}
            type="submit"
            onClick={() => history.push('/auth/learn-more')}
          >
            Learn More
          </Button>
        </ListItem>
      </GridItem>
    </GridContainer>
  )
}
