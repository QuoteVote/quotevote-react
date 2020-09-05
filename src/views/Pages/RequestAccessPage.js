import React, { useState } from 'react'

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'

import { Formik } from 'formik'

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
  const [request, setRequest] = useState(null)
  const [isContinued, setContinued] = useState(false)
  const [requestSubmitted, setRequestSubmitted] = useState({ personal: false, business: false })
  const initialValues = {
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    creditCard: {
      cardNumber: '',
      expiry: '',
      cvc: '',
    },
    cost: 0,
  }

  const renderForm = (formikProps) => {
    if (selectedPlan === 'personal') {
      return <PersonalForm requestSubmitted={requestSubmitted} isContinued={isContinued} setContinued={setContinued} {...formikProps} />
    }
    return <BusinessForm requestSubmitted={requestSubmitted} isContinued={isContinued} setContinued={setContinued} {...formikProps} />
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
      ) : (
        <Formik
          enableReinitialize
          render={(props) => renderForm(props)}
          initialValues={initialValues}
          // validationSchema={}
          onSubmit={() => {
            setRequestSubmitted({ ...requestSubmitted, [`${selectedPlan}`]: true })
          }}
        />
      )}
    </div>
  )
}
