import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { tokenValidator } from 'store/user'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import styles from 'assets/jss/material-dashboard-pro-react/views/loginPageStyle'

import PlansPage from 'components/RequestAccess/Plans'
import PersonalForm from 'components/RequestAccess/PersonalForm'
import BusinessForm from 'components/RequestAccess/BusinessForm'

const useStyles = makeStyles(styles)

export default function RequestAccessPage() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const [selectedPlan, setSelectedPlan] = React.useState(null)
  const [request, setRequest] = useState(null)

  const defaultValues = {
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
  }
  const [userDetails, setUserDetails] = useState(defaultValues)
  const {
    register, errors, getValues, handleSubmit,
  } = useForm({ defaultValues })
  const [requestInviteSuccessful, setRequestInviteSuccessful] = useState(false)
  const [isContinued, setContinued] = useState(false)

  const cardDefaultValues = {
    cardNumber: '',
    expiry: '',
    cvv: '',
    cost: selectedPlan === 'business' ? 10 : 0,
  }
  const [cardDetails, setCardDetails] = useState(cardDefaultValues)

  const onContinue = () => {
    const newUserDetails = getValues()
    if (!Object.keys(errors).length) { // if there are no errors proceed to card number form
      setUserDetails(newUserDetails)
      setContinued(true)
    }
  }

  const onSubmit = () => {
    setRequestInviteSuccessful(true)
    // eslint-disable-next-line no-console
    console.log({ userDetails, cardDetails })
    // TODO add mutation
  }

  const renderForm = () => {
    if (selectedPlan === 'personal') {
      return (
        <PersonalForm
          setCardDetails={setCardDetails}
          cardDetails={cardDetails}
          isContinued={isContinued}
          onSubmit={onSubmit}
          errors={errors}
          handleSubmit={handleSubmit}
          onContinue={onContinue}
          setContinued={setContinued}
          register={register}
          requestInviteSuccessful={requestInviteSuccessful}
        />
      )
    }
    return (
      <BusinessForm
        setCardDetails={setCardDetails}
        cardDetails={cardDetails}
        isContinued={isContinued}
        onSubmit={onSubmit}
        errors={errors}
        handleSubmit={handleSubmit}
        onContinue={onContinue}
        setContinued={setContinued}
        register={register}
        requestInviteSuccessful={requestInviteSuccessful}
      />
    )
  }

  // TODO: Abstract validation into custom hook
  React.useEffect(() => {
    if (tokenValidator(dispatch)) history.push('/hhsb/Home')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={classes.container}>
      {!selectedPlan || !request ? (
        <PlansPage
          selectedPlan={selectedPlan}
          onPlanSelect={setSelectedPlan}
          setRequest={setRequest}
          setCardDetails={setCardDetails}
          cardDetails={cardDetails}
        />
      ) : renderForm()}
    </div>
  )
}
