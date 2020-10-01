import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Card from '../../mui-pro/Card/Card'
import CardBody from '../../mui-pro/Card/CardBody'

const useStyles = makeStyles({
  headerBox: {
    marginBottom: 20,
  },
  header: {
    fontFamily: 'Montserrat',
    fontWeight: 600,
    fontStyle: 'normal',
    fontSize: '20px',
    lineHeight: '24px',
  },
  headerSubText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '19px',
  },
  card: {
    width: 350,
  },
  goToLogin: {
    textTransform: 'none',
    color: 'white',
    textColor: 'white',
  },
})

function EmailSent() {
  const classes = useStyles()
  const history = useHistory()
  const handleLogin = () => {
    history.push('/auth/login')
  }

  return (
    <Card className={classes.card}>
      <CardBody>
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="space-evenly"
          spacing={2}
        >
          <Grid item>
            <Typography className={classes.header}>
              Email Sent
            </Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.headerSubText}>
              We have send you an email to reset your password.
            </Typography>
          </Grid>
          <Grid item>
            <Button
              className={classes.goToLogin}
              size="large"
              color="primary"
              variant="contained"
              fullWidth
              onClick={handleLogin}
            >
              Go to Login
            </Button>
          </Grid>
        </Grid>
      </CardBody>
    </Card>
  )
}

export default EmailSent
