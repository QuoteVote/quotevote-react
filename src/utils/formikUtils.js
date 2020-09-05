/* eslint-disable no-shadow */
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  get, identity, merge, noop,
} from 'lodash'

export const getHelperText = (showError = false, fieldError = '', helperText = '', alwaysShowHelperText = true) => {
  const message = showError ? fieldError : helperText

  if (message || alwaysShowHelperText) {
    return <HelperText message={message} />
  }

  return null
}

const styles = () => ({
  span: {
    position: 'relative',
    padding: 0,
    color: 'rgb(244, 67, 54)',
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
  },
})

// We can't use <HelperText> directly as even if that returns a null,
// material-ui will decide you want a <span> and <p> regardless.
const HelperText = withStyles(styles)(({ message, classes }) => <span classes={classes.span}>{message}</span>)

export const handleBlur = (
  value,
  {
    form, field, onBlur, handleBlur,
  }
) => (event) => {
  const name = get(field, 'name')

  const overrideDefaultBlur = onBlur || handleBlur

  const formikHandleBlur = () => get(form, 'setFieldTouched', noop)(name)

  if (overrideDefaultBlur) {
    overrideDefaultBlur(
      event,
      {
        value, name, form, field, formikHandleBlur,
      }
    )
  } else {
    formikHandleBlur()
  }
}

export const handleChange = ({
  form, field, regex, onChange, handleChange, formatValue = identity,
}) => (event) => {
  const value = formatValue(get(event, 'target.value', ''))
  const name = get(field, 'name')

  const formikHandleChange = (x = value) => {
    get(form, 'handleChange', noop)(merge(event, { target: { value: x } }))
    get(form, 'setFieldTouched', noop)(name, true, false)
  }

  const overrideDefaultChange = onChange || handleChange

  if (overrideDefaultChange) {
    if (regex) {
      if (regex.test(value) || value === '') {
        overrideDefaultChange(event, {
          value, name, form, field, formikHandleChange,
        })
      }
    } else {
      overrideDefaultChange(event, {
        value, name, form, field, formikHandleChange,
      })
    }
  } else if (regex) {
    if (regex.test(value) || value === '') {
      formikHandleChange()
    }
  } else {
    formikHandleChange()
  }
}
