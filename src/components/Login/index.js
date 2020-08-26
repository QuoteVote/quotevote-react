import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import GridContainer from 'mui-pro/Grid/GridContainer'
import GridItem from 'mui-pro/Grid/GridItem'
import Typography from '@material-ui/core/Typography'
import CustomInput from 'mui-pro/CustomInput/CustomInput'
import Face from '@material-ui/icons/Face'
import { InputAdornment } from '@material-ui/core'
import styles from 'assets/jss/material-dashboard-pro-react/views/loginPageStyle'


const useStyles = makeStyles(styles)

const Login = (props) => {
  const { open, setOpen } = props
  const classes = useStyles()
  console.log('open: ', open);
  return (
    <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title" maxWidth="xs">
      <DialogContent>
        <GridContainer>
          <GridItem xs={12}>Log in with Google</GridItem>
          <GridItem xs={12}>Log in with Facebook</GridItem>
          <GridItem xs={12}>Log in with Twitter</GridItem>
          <GridItem xs={12}>
            <Typography align="center" variant="subtitle1" style={{ textTransform: "none" }}>or</Typography>
          </GridItem>
          <GridItem xs={12}>
            <CustomInput
              labelText="Email..."
              id="username"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                startAdornment: (
                  <InputAdornment position="end">
                    <Face className={classes.inputAdornmentIcon} />
                  </InputAdornment>
                ),
                // onChange: (e) => handleInputs(e),
              }}
              // error={loginError}
            />
          </GridItem>
          <GridItem xs={12}>Password</GridItem>
          <GridItem xs={12}>Log in</GridItem>
          <GridItem xs={12}>Forgot Password</GridItem>
          <GridItem xs={12}>No account? Request invite</GridItem>
        </GridContainer>
      </DialogContent>
    </Dialog>
  )
}

export default Login