import { omit } from 'lodash'
import React from 'react'

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'

// images
import activiesPageImg from 'assets/img/carousel/Activities_Page.png'
import postPageImg from 'assets/img/carousel/Post_Page.png'
import profilePageImg from 'assets/img/carousel/Profile_Page.png'
import sideNavImg from 'assets/img/carousel/Side_Navigation.png'
import trendingPageImg from 'assets/img/carousel/Trending_Page.png'

import {
  InputAdornment,
  CircularProgress,
  Hidden,
} from '@material-ui/core'

import Icon from '@material-ui/core/Icon'

// @material-ui/icons
import Face from '@material-ui/icons/Face'

// core mui-pro
import GridContainer from 'mui-pro/Grid/GridContainer'
import GridItem from 'mui-pro/Grid/GridItem'
import CustomInput from 'mui-pro/CustomInput/CustomInput'
import Button from 'mui-pro/CustomButtons/Button'
import Card from 'mui-pro/Card/Card'
import CardBody from 'mui-pro/Card/CardBody'
import CardHeader from 'mui-pro/Card/CardHeader'
import CardFooter from 'mui-pro/Card/CardFooter'
import Carousel from 'react-material-ui-carousel'

// login method
import { userLogin, tokenValidator } from 'store/user'

import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styles from 'assets/jss/material-dashboard-pro-react/views/loginPageStyle'

const useStyles = makeStyles(styles)

// eslint-disable-next-line react/prop-types
function CarouselImage({ imageUrl, alt }) {
  return (
    <Card square>
      <img alt={alt} height={500} src={`${imageUrl}`} style={{ marginTop: '-15px' }} />
    </Card>
  )
}

export default function LoginPage() {
  const [cardAnimaton, setCardAnimation] = React.useState('cardHidden')
  const dispatch = useDispatch()
  const history = useHistory()
  const loading = useSelector((state) => state.user.loading)
  const loginError = useSelector((state) => state.user.loginError)
  const [input, setInput] = React.useState({ password: '', username: '' })

  // TODO: Abstract validation into custom hook
  React.useEffect(() => {
    if (tokenValidator(dispatch)) history.push('/hhsb/Home')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // This needs to be fixed so that we are importing the images instead of using the public/assets folder
  const images = [activiesPageImg, postPageImg, profilePageImg, sideNavImg, trendingPageImg]

  setTimeout(() => {
    setCardAnimation('')
  }, 700)

  const classes = useStyles()
  const handleInputs = (e) => {
    const { id, value } = e.target
    setInput({ ...omit(input, [id]), [id]: value })
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    const { username, password } = input
    userLogin(username, password, dispatch, history)
  }
  const handleFormSubmit = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }
  return (
    <div className={classes.container}>
      <GridContainer justify="center" style={{ marginRight: 24 }}>
        <Hidden smDown>
          <GridItem lg={8}>
            <Carousel interval={3000}>
              {
                images.map((image) => (
                  <CarouselImage imageUrl={image} alt={image} />
                ))
              }
            </Carousel>
          </GridItem>
        </Hidden>
        <GridItem xs={12} sm={6} md={4}>
          <form onSubmit={(e) => handleFormSubmit(e)}>
            <Card login className={classes[cardAnimaton]}>
              <CardHeader
                className={`${classes.cardHeader} ${classes.textCenter}`}
                color="rose"
              >
                <h4 className={classes.cardTitle}>Log in</h4>
                <div className={classes.socialLine}>
                  {[
                    'fab fa-facebook-square',
                    'fab fa-twitter',
                    'fab fa-google-plus',
                  ].map((prop, key) => (
                    <Button
                      color="transparent"
                      justIcon
                      key={key}
                      className={classes.customButtonClass}
                    >
                      <i className={prop} />
                    </Button>
                  ))}
                </div>
              </CardHeader>
              <CardBody>
                <CustomInput
                  labelText="Username"
                  id="username"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Face className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    ),
                    onChange: (e) => handleInputs(e),
                  }}
                  error={loginError}
                />
                <CustomInput
                  labelText="Password"
                  id="password"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className={classes.inputAdornmentIcon}>
                          lock_outline
                        </Icon>
                      </InputAdornment>
                    ),
                    onChange: (e) => handleInputs(e),
                    type: 'password',
                    autoComplete: 'off',
                  }}
                  error={loginError}
                  helperText={loginError}
                />
              </CardBody>
              <CardFooter className={classes.justifyContentCenter}>
                {loading ? (
                  <CircularProgress color="secondary" />
                ) : (
                  <Button
                    onClick={(e) => handleSubmit(e)}
                    color="rose"
                    simple
                    size="lg"
                    block
                  >
                    LOGIN
                  </Button>
                )}
              </CardFooter>
            </Card>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  )
}
