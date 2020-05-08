import React, {useState} from 'react'

// firebase

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import InputAdornment from '@material-ui/core/InputAdornment'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Icon from '@material-ui/core/Icon'

// @material-ui/icons
import Timeline from '@material-ui/icons/Timeline'
import Code from '@material-ui/icons/Code'
import Group from '@material-ui/icons/Group'
import Email from '@material-ui/icons/Email'
import CreditCard from '@material-ui/icons/CreditCard'
// import LockOutline from "@material-ui/icons/LockOutline";
import Check from '@material-ui/icons/Check'

// core components
import GridContainer from 'mui-pro/Grid/GridContainer'
import GridItem from 'mui-pro/Grid/GridItem'
import Button from 'mui-pro/CustomButtons/Button'
import CustomInput from 'mui-pro/CustomInput/CustomInput'
import InfoArea from 'mui-pro/InfoArea/InfoArea'
import Card from 'mui-pro/Card/Card'
import CardBody from 'mui-pro/Card/CardBody'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';


import styles from 'assets/jss/material-dashboard-pro-react/views/registerPageStyle'

import 'assets/css/stripe-common.css'
import { Radio } from '@material-ui/core'

const useStyles = makeStyles(styles)
const stripePromise = loadStripe('pk_test_qIQR5bxjcD4pkfx0Cwq0XVtJ001dsWFwah');

const CheckoutForm = ({product}) => {
  
  const [email, setEmail] = useState('')
  const [paymentMethod, setPaymentMethod] = useState(null);
  const classes = useStyles()
  const stripe = useStripe()
  const elements = useElements();
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async () => {
    console.log('submitting', product)
    const billingDetails = {
      email
    }
    const payload = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: billingDetails,
    });
    if(payload.error) {
      console.log('error', error)
    }
    else {
      setPaymentMethod(payload.paymentMethod)
    }

    

  }
  return (
    <form>
      {paymentMethod ? <div style={{color: 'black'}}> No money was charged but stripe is working!</div>:null}
      <GridContainer>
        <GridItem xs={12} md={12} sm={12}>
        <CustomInput
          inputProps={{
              startAdornment: (
              <InputAdornment
                  position="start"
                  className={classes.inputAdornment}
              >
                  <Email className={classes.inputAdornmentIcon} />
              </InputAdornment>
              ),
              placeholder: 'Enter email',
              onChange:(e) => setEmail(e.target.value)
          }}
      />
      </GridItem>
    </GridContainer>
      <CardElement />
      
      <Button
          color="rose"
          size="lg"
          style={{'marginLeft':'100px'}}
          onClick={handleSubmit}
      >
          Pay Now
      </Button>
      </form>
  )
}
export default function RequestInvite() {
  const [productSelection, selectProduct] = useState(0)
  
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <GridContainer>
        <GridItem xs={6} sm={6} md={6}>
          <Card className={classes.cardSignup}>
            <h2 className={classes.cardTitle}>Business</h2>
            <CardBody>
              <GridContainer justify="center">
                  <GridItem xs={12} md={12} sm={12}>
                  <InfoArea
                    title="Monthly License fee $10 per month"
                    description="Pay 10 cents per pop prediction"
                    icon={Timeline}
                    iconColor="rose"
                  />

                  </GridItem>
                  <Radio
                    checked={productSelection === 0}
                    onChange={() => selectProduct(0)}
                  />
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={6} sm={6} md={6}>
          <Card className={classes.cardSignup}>
            <h2 className={classes.cardTitle}>Personal</h2>
            <CardBody>
              <GridContainer justify="center">
              <GridItem xs={12} md={12} sm={12}>
                  <InfoArea
                    title="Full feature access with zero fees."
                    description="Pay what you like to support."
                    icon={Timeline}
                    iconColor="rose"
                  />
                </GridItem>
                <Radio
                  checked={productSelection===1}
                  onChange={() => selectProduct(1) }
                />
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer style={{backgroundColor:'#fff'}}>
          <GridItem xs={12} md={12} sm={12}>
          <Elements stripe={stripePromise}>
                <GridContainer md={12} xs={12} sm={12}>
                     <CheckoutForm product={productSelection} />

                </GridContainer>
            </Elements>
          </GridItem>
      </GridContainer>
    </div>
  )
}