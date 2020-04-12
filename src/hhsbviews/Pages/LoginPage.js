import { omit } from "lodash"
import React from "react"

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles"

import {
  InputAdornment, 
  CircularProgress,
  Hidden,
} from "@material-ui/core"

import Icon from "@material-ui/core/Icon"

// @material-ui/icons
import Face from "@material-ui/icons/Face"

// core components
import GridContainer from "components/Grid/GridContainer.js"
import GridItem from "components/Grid/GridItem.js"
import CustomInput from "components/CustomInput/CustomInput.js"
import Button from "components/CustomButtons/Button.js"
import Card from "components/Card/Card.js"
import CardBody from "components/Card/CardBody.js"
import CardHeader from "components/Card/CardHeader.js"
import CardFooter from "components/Card/CardFooter.js"
import Carousel from "react-material-ui-carousel"

// login method
import { userLogin } from "actions/login"

import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { tokenValidator } from "../../actions/login"

import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js"

const useStyles = makeStyles(styles)

function CarouselImage({ imageUrl,  alt}) {
  return (
    <Card square>
      <img alt={alt} height={500} src={`/assets/${imageUrl}`} style={{ marginTop: '-15px' }} />
    </Card>
  )
}

export default function LoginPage() {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden")
  const dispatch = useDispatch()
  const history = useHistory()
  const { loading, loginError } = useSelector((state) => state.loginReducer)
  const [input, setInput] = React.useState({ password: "", username: "" })

  const images = ['Activities_Page.png', 'Post_Page.png', 'Profile_Page.png', 'Side_Navigation.png', 'Trending_Page.png'  ]

  setTimeout(() => {
    setCardAnimation("")
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
    if (e.key === "Enter") {
      handleSubmit(e)
    }
  }
  return (
    <div className={classes.container}>
      {tokenValidator() && history.push("/hhsb/Home")}
      <GridContainer justify="center" style={{ marginRight: 24 }}>
        <Hidden smDown>
          <GridItem lg={8}>
            <Carousel interval={3000}>
              {
                images.map((image) => (
                  <CarouselImage imageUrl={image} alt={image}/>
                ))
              }
            </Carousel>
          </GridItem>
        </Hidden>
        <GridItem xs={12} sm={6} md={4}>
          <form onKeyPress={(e) => handleFormSubmit(e)}>
            <Card login className={classes[cardAnimaton]}>
              <CardHeader
                className={`${classes.cardHeader} ${classes.textCenter}`}
                color="rose"
              >
                <h4 className={classes.cardTitle}>Log in</h4>
                <div className={classes.socialLine}>
                  {[
                    "fab fa-facebook-square",
                    "fab fa-twitter",
                    "fab fa-google-plus",
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
                    type: "password",
                    autoComplete: "off",
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
