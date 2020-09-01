import { omit } from 'lodash'
import React from 'react'

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'

// images

import { CircularProgress, InputAdornment } from '@material-ui/core'

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

// login method
import { tokenValidator, userLogin } from 'store/user'

import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styles from 'assets/jss/material-dashboard-pro-react/views/loginPageStyle'

const useStyles = makeStyles(styles)

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
