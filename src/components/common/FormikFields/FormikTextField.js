import React from 'react'
import TextField from '@material-ui/core/TextField'
import { getIn } from 'formik'
import { toLower } from 'lodash'
import { withStyles } from '@material-ui/core/styles'
import { getHelperText, handleBlur, handleChange } from 'utils/formikUtils'

const styles = theme => ({
  textField: {
    width: '100%',
  },
  bold: {
    paddingLeft: 3,
    color: 'red',
    fontWeight: 'bolder',
  }
})

export const FormikTextField = props => {
  const {
    field,
    form,
    variant = 'standard',
    disabled = false,
    inputStyle,
    classes,
    label,
    isRequired,
    onChange,
    InputLabelProps,
    alwaysShowHelperText = true,
    istouched = false,
    ...rest
  } = props
  const { name, value } = field
  const { touched, errors, isSubmitting } = form
  const fieldError = getIn(errors, name)
  const showError = (getIn(touched, name) && !!fieldError) || (istouched && !!fieldError)
  const shrink = field.value !== null && toLower(field.value).length > 0
  const labelProps = { shrink, ...InputLabelProps }

  let newLabel = label
  if (isRequired) {
    newLabel = (
      <>
        {label}
        <span className={classes.bold}>*</span>
      </>
    )
  }

  return (
    <TextField
      {...rest}
      {...field}
      label={newLabel}
      helperText={getHelperText(showError, fieldError, rest.helperText, alwaysShowHelperText)}
      value={value || value === 0 ? value : ''}
      error={showError}
      onChange={handleChange(props)}
      onClick={rest.onClick || null}
      onBlur={handleBlur(value, props)}
      disabled={isSubmitting || disabled}
      variant={variant}
      InputLabelProps={labelProps}
      fullWidth
    />
  )
}

export default withStyles(styles)(FormikTextField)
