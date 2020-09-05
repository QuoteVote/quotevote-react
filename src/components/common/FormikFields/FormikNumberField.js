import React from 'react'
import TextField from '@material-ui/core/TextField'
import { getIn } from 'formik'
import NumberFormat from 'react-number-format'
import { getHelperText, handleBlur, handleChange } from 'utils/formikUtils'

const FormikNumberField = props => {
  const {
    field,
    form,
    variant = 'standard',
    disabled = false,
    style,
    classes,
    rightAlign,
    alwaysShowHelperText,
    isRequired,
    label,
    inputProps,
    ...rest
  } = props
  const { name, value } = field
  const { touched, errors, isSubmitting } = form

  const fieldError = getIn(errors, name)
  const showError = getIn(touched, name) && !!fieldError

  let newLabel = label

  if (isRequired) {
    newLabel = (
      <>
        {label}
        <span style={{ color: 'red' }}>*</span>
      </>
    )
  }

  return (
    <NumberFormat
      label={newLabel}
      customInput={TextField}
      {...rest}
      {...field}
      style={style ? style : { width: '100%' }}
      helperText={getHelperText(
        showError,
        fieldError,
        rest.helperText,
        alwaysShowHelperText
      )}
      error={showError}
      value={value || value === 0 ? value : ''}
      onChange={handleChange(props)}
      onBlur={handleBlur(value, props)}
      disabled={isSubmitting || disabled}
      variant={variant}
      inputProps={{
        style: rightAlign ? { textAlign: 'right' } : {},
        ...inputProps,
      }}
    />
  )
}

export default FormikNumberField
