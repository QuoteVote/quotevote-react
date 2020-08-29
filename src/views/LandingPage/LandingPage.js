import React from 'react'

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'

// @material-ui/icons
// core mui-pro

// login method
import { tokenValidator } from 'store/user'

import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styles from 'assets/jss/material-dashboard-pro-react/views/landingPageStyle'

import PlansPage from 'components/RequestAccess/Plans'
import LandingPageContent from './LandingPageContent'

const useStyles = makeStyles(styles)

export default function LandingPage() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const [selectedPlan, setSelectedPlan] = React.useState(null)

  // TODO: Abstract validation into custom hook
  React.useEffect(() => {
    if (tokenValidator(dispatch)) history.push('/hhsb/Home')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={classes.container}>
      {!selectedPlan ? (
        <PlansPage onPlanSelect={setSelectedPlan} />
      ) : (
        <LandingPageContent />
      )}
    </div>
  )
}
