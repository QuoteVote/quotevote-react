import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import GridContainer from 'mui-pro/Grid/GridContainer'
import { tokenValidator, userLogin } from 'store/user'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styles from 'assets/jss/material-dashboard-pro-react/views/loginPageStyle'
import Login from '../../components/Login/Login'

const useStyles = makeStyles(styles)

export default function LoginPage() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [loading, setLoading] = React.useState(false)

  // TODO: Abstract validation into custom hook
  React.useEffect(() => {
    if (tokenValidator(dispatch)) history.push('/hhsb/Home')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const classes = useStyles()
  const handleSubmit = async (values) => {
    const { username, password } = values
    setLoading(true)
    await userLogin(username, password, dispatch, history)
    setLoading(false)
  }

  return (
    <div className={classes.container}>
      <GridContainer justify="center" style={{ marginRight: 24 }}>
        <Login onSubmit={handleSubmit} loading={loading} />
      </GridContainer>
    </div>
  )
}
