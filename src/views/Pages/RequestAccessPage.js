import { omit } from 'lodash'
import React from 'react'

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'


import {
  InputAdornment,
  CircularProgress,
  Hidden,
  Typography,
  CardHeader,
} from '@material-ui/core'

import Icon from '@material-ui/core/Icon'

// @material-ui/icons
import Face from '@material-ui/icons/Face'

// core mui-pro
import GridContainer from 'mui-pro/Grid/GridContainer'
import GridItem from 'mui-pro/Grid/GridItem'
import Card from 'mui-pro/Card/Card'
import CardBody from 'mui-pro/Card/CardBody'

// login method
import { userLogin, tokenValidator } from 'store/user'

import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styles from 'assets/jss/material-dashboard-pro-react/views/loginPageStyle'
import reqAccessBusiness from 'assets/img/RequestAccess/Illustration.png'

import PlansPage from 'components/RequestAccess/Plans'


const useStyles = makeStyles(styles)

export default function RequestAccessPage() {
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
        <GridContainer justify="center" style={{ marginRight: 24 }}>
          <GridItem xs={12}>
            <Typography
              align="center"
              style={{
                height: '41px',
                objectFit: 'contain',
                font: 'Montserrat',
                fontSize: '34px',
                fontWeight: 'bold',
                letterspacing: '0.25px',
              }}
            >
              Get access to your
              {' '}
              <span
                style={{
                  height: '41px',
                  objectFit: 'contain',
                  font: 'Montserrat',
                  fontSize: '34px',
                  fontWeight: 'bold',
                  letterspacing: '0.25px',
                  color: '#00cf6e',
                }}
              >
                Business Plan!
              </span>
            </Typography>
          </GridItem>
          <GridItem xs={12}>
            <Typography
              align="center"
              style={{
                height: '28px',
                font: 'Roboto',
                fontSize: '22px',
                letterspacing: '0.25px',
                lineHeight: 1.27,
              }}
            >
              You are one step away from
              {' '}
              <b>
                unlimited access
              </b>
              {' '}
              to voxPOP
            </Typography>
          </GridItem>
          <GridItem xs={12}>
            <GridContainer>
              <GridItem xs={6}>
                <img
                  alt={reqAccessBusiness}
                  height={500}
                  src={`${reqAccessBusiness}`}
                  style={{
                    width: '489px',
                    height: '265px',
                    objectFit: 'contain',
                  }}
                />
              </GridItem>
              <GridItem xs={6}>
                <Card>
                  <CardHeader
                    avatar={(
                      <Typography
                        style={{
                          width: '22px',
                          height: '28px',
                          borderRadius: '6px',
                          backgroundColor: '#00cf6e',
                          opacity: 0.85,
                          font: 'Roboto',
                          fontsize: '18px',
                          lineHeight: 1.56,
                          color: '#ffffff',
                          padding: '3px 6px',
                        }}
                      >
                        1
                      </Typography>
                    )}
                    title={(
                      <Typography
                        style={{
                          font: 'Roboto',
                          fontsize: '18px',
                          lineHeight: 1.56,
                        }}
                      >
                        Your Personal Info
                      </Typography>
                    )}
                  />
                  {/* <CardBody>
                    Body
                  </CardBody> */}
                </Card>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      )}
    </div>
  )
}
