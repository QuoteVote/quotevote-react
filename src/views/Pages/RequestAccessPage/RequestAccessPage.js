import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { tokenValidator } from 'store/user'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useApolloClient, useMutation } from '@apollo/react-hooks'
import { SET_SELECTED_PLAN } from 'store/ui'
import styles from 'assets/jss/material-dashboard-pro-react/views/loginPageStyle'

import PlansPage from 'components/RequestAccess/Plans/Plans'
import PersonalForm from 'components/RequestAccess/PersonalForm/PersonalForm'
import BusinessForm from 'components/RequestAccess/BusinessForm/BusinessForm'
import { REQUEST_USER_ACCESS_MUTATION } from 'graphql/mutations'
import { GET_CHECK_DUPLICATE_EMAIL } from 'graphql/query'

const useStyles = makeStyles(styles)

export default function RequestAccessPage() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const selectedPlan = useSelector((state) => state.ui.selectedPlan)
  const [request, setRequest] = useState(null)

  const defaultValues = {
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
  }
  const [userDetails, setUserDetails] = useState(defaultValues)
  const {
    register, errors, getValues, handleSubmit, setError,
  } = useForm({ defaultValues })
  const [requestInviteSuccessful, setRequestInviteSuccessful] = useState(false)
  const [isContinued, setContinued] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const cardDefaultValues = {
    cardNumber: '',
    expiry: '',
    cvv: '',
    cost: selectedPlan === 'business' ? 10 : 0,
  }
  const [cardDetails, setCardDetails] = useState(cardDefaultValues)

  const client = useApolloClient()

  const setSelectedPlan = (planType) => {
    dispatch(SET_SELECTED_PLAN(planType))
  }

  const onContinue = async () => {
    const newUserDetails = getValues()
    const { data } = await client.query({
      query: GET_CHECK_DUPLICATE_EMAIL,
      variables: { email: newUserDetails.email },
      fetchPolicy: 'network-only',
    })
    const hasDuplicateEmail = data && data.checkDuplicateEmail.length
    if (hasDuplicateEmail) {
      setError('email', {
        type: 'manual',
        message: 'Email already exist!',
      })
    }
    if (!hasDuplicateEmail && !Object.keys(errors).length) { // if there are no errors proceed to card number form
      setUserDetails(newUserDetails)
      setContinued(true)
    }
  }

  const [requestUserAccess, { data, error, loading }] = useMutation(REQUEST_USER_ACCESS_MUTATION)
  const onSubmit = async () => {
    try {
      // eslint-disable-next-line no-console
      console.log({ userDetails, cardDetails })
      const { fullName, ...otherUserDetails } = userDetails
      const requestUserAccessInput = {
        ...otherUserDetails,
        firstName: fullName || otherUserDetails.firstName,
      }
      const {
        cardNumber, expiry, cvv, cost,
      } = cardDetails
      if (cardNumber && expiry && cvv) {
        const expirySplit = expiry.split('/')
        requestUserAccessInput.cardDetails = {
          number: cardNumber.replace(/\s+/g, ''),
          exp_month: expirySplit[0].replace(/\s+/g, ''),
          exp_year: `20${expirySplit[1]}`.replace(/\s+/g, ''),
          cvc: cvv.replace(/\s+/g, ''),
        }
        requestUserAccessInput.amount = cost
      }
      await requestUserAccess({ variables: { requestUserAccessInput } })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('onSubmit', e)
    }
  }

  React.useEffect(() => {
    if (error) {
      setErrorMessage(error.toString())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  React.useEffect(() => {
    if (data) {
      setRequestInviteSuccessful(true)
    }
  }, [data])

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
          errorMessage={errorMessage}
          loading={loading}
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
        errorMessage={errorMessage}
        loading={loading}
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
