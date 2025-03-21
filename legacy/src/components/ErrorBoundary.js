import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: !!error }
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // eslint-disable-next-line no-console
    console.log('Something went wrong!', { error, errorInfo })
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { children } = this.props
    const { hasError } = this.state
    if (hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong. Please refresh the page.</h1>
    }

    // eslint-disable-next-line react/prop-types
    return children
  }
}

export default ErrorBoundary
