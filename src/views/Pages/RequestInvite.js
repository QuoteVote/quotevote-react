import React, {useState} from 'react'
import agent from 'superagent-bluebird-promise'

// firebase

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import InputAdornment from '@material-ui/core/InputAdornment'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Icon from '@material-ui/core/Icon'

// @material-ui/icons
import Timeline from '@material-ui/icons/Timeline'
import Mood from '@material-ui/icons/Mood'
import Money from '@material-ui/icons/Money'
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

import styles from 'assets/jss/material-dashboard-pro-react/views/requestInvitePageStyle'

import 'assets/css/stripe-common.css'
import { Radio } from '@material-ui/core'

const useStyles = makeStyles(styles)

const CheckoutForm = ({product}) => {
  
  const [email, setEmail] = useState('')
  const [number, setCC] = useState('')
  const [mmyy, setMMYY] = useState('')
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [cvv, setCVV] = useState('')
  const classes = useStyles()


  const handleSubmit = async () => {
    console.log('submitting', product)
    const user = {
      email,
      id:'_' + Math.random().toString(36).substr(2, 9)

    }
    agent
    .post('http://localhost:4000/stripe/create-customer')
    .send({user})
    .then(res => {
      console.log('should create a customer', res)
      agent
      .post('http://localhost:4000/stripe/create-payment-method')
      .send({number:number, exp_month:mmyy.split('/')[0], exp_year: mmyy.split('/')[1], cvc: cvv, user})
      .then(res => console.log('should have added payment method', res))
      .catch(console.log)
    })

  }
  return (
    <form>
      <GridContainer>
        <GridItem xs={3} md={3} sm={3}>
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
      <GridItem xs={3} md={3} sm={3}>
          <CustomInput
            inputProps={{
                startAdornment: (
                <InputAdornment
                    position="start"
                    className={classes.inputAdornment}
                >
                    <CreditCard className={classes.inputAdornmentIcon} />
                </InputAdornment>
                ),
                placeholder: 'Credit Card Number',
                onChange:(e) => setCC(e.target.value)
            }}
        />
      </GridItem>
      <GridItem xs={3} md={3} sm={3}>
          <CustomInput
            inputProps={{
                startAdornment: (
                <InputAdornment
                    position="start"
                    className={classes.inputAdornment}
                >
                    <CreditCard className={classes.inputAdornmentIcon} />
                </InputAdornment>
                ),
                placeholder: 'MM/YY',
                onChange:(e) => setMMYY(e.target.value)
            }}
        />
      </GridItem>
      <GridItem xs={3} md={3} sm={3}>
          <CustomInput
            inputProps={{
                startAdornment: (
                <InputAdornment
                    position="start"
                    className={classes.inputAdornment}
                >
                    <CreditCard className={classes.inputAdornmentIcon} />
                </InputAdornment>
                ),
                placeholder: 'CVV',
                onChange:(e) => setCVV(e.target.value)
            }}
        />
      </GridItem>
    </GridContainer>
      
      <Button
          color="rose"
          size="lg"
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
            <h2 className={classes.cardTitle}><Money/> Business Plan</h2>
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
            <h2 className={classes.cardTitle}><Mood/>personal Plan</h2>
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
            <GridContainer md={12} xs={12} sm={12}>
                  <CheckoutForm product={productSelection} />

            </GridContainer>
          </GridItem>
      </GridContainer>
    </div>
  )
}