import React from 'react'

import { Button } from '@mui/material'

import { LOGGER_ENDPOINT } from '@/lib/gql/client'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false }
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI

    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    const body = JSON.stringify({
      error: error.message, // Extract message from the error object
      errorInfo: errorInfo, // Send the entire errorInfo object
    })

    fetch(LOGGER_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Error logged successfully, error: ', JSON.stringify({ error, errorInfo }))
      })
      .catch((err) => {
        console.error('Error logging failed: ', err)
      })
  }

  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h2>Oops, there is an error!</h2>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again?
          </Button>
        </div>
      )
    }

    // Return children components in case of no error

    return this.props.children
  }
}

export default ErrorBoundary
