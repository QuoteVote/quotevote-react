import React from 'react'

import Typography from '@material-ui/core/Typography'
import CardHeader from '@material-ui/core/CardHeader'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

import GridContainer from 'mui-pro/Grid/GridContainer'
import GridItem from 'mui-pro/Grid/GridItem'
// import Card from 'mui-pro/Card/Card'
// import CardBody from 'mui-pro/Card/CardBody'

import reqAccessBusiness from 'assets/img/RequestAccess/Illustration.png'
import reqAccessPersonal from 'assets/img/RequestAccess/PersonalPlan.png'

const Plans = (props) => {
  const { onPlanSelect } = props
  return (
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
          What is best for you
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
            ?
          </span>
        </Typography>
      </GridItem>
      <GridItem xs={12}>
        <GridContainer justify="center" spacing={6} /* style={{ backgroundColor: 'red' }} */>
          <GridItem xs={3}>
            <img
              alt={reqAccessPersonal}
              height={500}
              src={`${reqAccessPersonal}`}
              style={{
                width: '200.6px',
                height: '140px',
              }}
            />
            <Card>
              <CardContent>
                <p
                  style={{
                    font: 'Montserrat',
                    fontsize: 30,
                    lineHeight: 1.56,
                    fontWeight: 600,
                    color: '#333333',
                    height: 37
                  }}
                >
                  Personal Plan
                </p>
                <p
                  style={{
                    font: 'Roboto',
                    fontsize: 20,
                    lineHeight: 0.75,
                    fontWeight: 500,
                    color: '#333333',
                  }}
                >
                  Pay what you like
                </p>
              </CardContent>
            </Card>
          </GridItem>
          <GridItem xs={3}>
            <img
              alt={reqAccessBusiness}
              height={500}
              src={`${reqAccessBusiness}`}
              style={{
                width: '200.6px',
                height: '140px',
              }}
            />
            <Card>
              <CardHeader
                title={(
                  <Typography
                    style={{
                      font: 'Roboto',
                      fontsize: '18px',
                      lineHeight: 1.56,
                    }}
                  >
                    Business Plan
                  </Typography>
                )}
              />
            </Card>
          </GridItem>
        </GridContainer>
      </GridItem>
    </GridContainer>
  )
}

export default Plans
