import React from 'react'

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'

// login method
import { tokenValidator } from 'store/user'

import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styles from 'assets/jss/material-dashboard-pro-react/views/loginPageStyle'

import PlansPage from 'components/RequestAccess/Plans'
import BusinessForm from 'components/RequestAccess/Business'
import PersonalForm from 'components/RequestAccess/Personal'

const useStyles = makeStyles(styles)

export default function RequestAccessPage() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const [selectedPlan, setSelectedPlan] = React.useState(null)
  const [request, setRequest] = React.useState(null)
  const [isContinued, setContinued] = React.useState(false)

  const renderForm = () => {
    if (selectedPlan === 'personal') {
      return <PersonalForm isContinued={isContinued} setContinued={setContinued} />
    }
    return <BusinessForm isContinued={isContinued} setContinued={setContinued} />
  }

  // TODO: Abstract validation into custom hook
  React.useEffect(() => {
    if (tokenValidator(dispatch)) history.push('/hhsb/Home')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={classes.container}>
      {!selectedPlan || !request ? (
        <PlansPage selectedPlan={selectedPlan} onPlanSelect={setSelectedPlan} setRequest={setRequest} />
      ) : renderForm()}
    </div>
  )
}
