import React, { useEffect, useState } from 'react'

import ErrorBoundary from '../../../components/ErrorBoundary'

const SomeComponent = () => {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setHasError(true)
    }, 1000)
  }, [])

  if (hasError) {
    throw new Error('Test error for ErrorBoundary.')
  }

  return (
    <div>
      <h1>Test Component</h1>
      <p>This content relies on fetched data.</p>
    </div>
  )
}

const App = () => {
  return (
    <ErrorBoundary>
      <SomeComponent />
    </ErrorBoundary>
  )
}

export default App
