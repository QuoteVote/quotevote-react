import React from 'react'
// nod library to set properties for components
import PropTypes from 'prop-types'
// nod library that concatenates classes
import classNames from 'classnames'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Input from '@material-ui/core/Input'

import styles from 'assets/jss/material-dashboard-pro-react/components/customInputStyle'

const useStyles = makeStyles(styles)

export default function CustomInput(props) {
  const classes = useStyles()
  const {
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    white,
    inputRootCustomClasses,
    success,
    helperText,
  } = props

  const labelClasses = classNames({
    [` ${classes.labelRootError}`]: error,
    [` ${classes.labelRootSuccess}`]: success && !error,
  })
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true,
    [classes.whiteUnderline]: white,
  })
  const marginTop = classNames({
    [inputRootCustomClasses]: inputRootCustomClasses !== undefined,
  })
  const inputClasses = classNames({
    [classes.input]: true,
    [classes.whiteInput]: white,
  })
  let formControlClasses
  if (formControlProps !== undefined) {
    formControlClasses = classNames(
      formControlProps.className,
      classes.formControl
    )
  } else {
    formControlClasses = classes.formControl
  }
  const helpTextClasses = classNames({
    [classes.labelRootError]: error,
    [classes.labelRootSuccess]: success && !error,
  })
  return (
    <FormControl {...formControlProps} className={formControlClasses}>
      {labelText !== undefined ? (
        <InputLabel
          className={`${classes.labelRoot} ${labelClasses}`}
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null}
      <Input
        classes={{
          input: inputClasses,
          root: marginTop,
          disabled: classes.disabled,
          underline: underlineClasses,
        }}
        id={id}
        {...inputProps}
      />
      {helperText !== undefined ? (
        <FormHelperText id={`${id}-text`} className={helpTextClasses}>
          {helperText}
        </FormHelperText>
      ) : null}
    </FormControl>
  )
}

CustomInput.propTypes = {
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  inputRootCustomClasses: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool,
  white: PropTypes.bool,
  helperText: PropTypes.node,
}
