import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import ErrorMessage from '@/pages/error-page'

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { useTranslation } from 'next-i18next'

jest.mock('next-i18next', () => ({
  useTranslation: jest.fn(),
}))

describe('ErrorMessage Component', () => {
  beforeEach(() => {
    ;(useTranslation as jest.Mock).mockReturnValue({
      t: (key: string) => key,
    })
  })

  it('should render the status and errorMessage', () => {
    const { getByText } = render(<ErrorMessage errorMessage="Test error message" status={500} />)

    expect(getByText('500')).toBeInTheDocument()
    expect(getByText('Test error message')).toBeInTheDocument()
  })

  it('should render the error-cartTakeover message', () => {
    const { getByText } = render(<ErrorMessage errorMessage="Test error message" status={500} />)

    expect(getByText('error-cartTakeover')).toBeInTheDocument()
  })

  it('should not render status and errorMessage when they are not provided', () => {
    const { queryByText } = render(<ErrorMessage errorMessage="" status={0} />)

    expect(queryByText('500')).not.toBeInTheDocument()
    expect(queryByText('Test error message')).not.toBeInTheDocument()
  })
})
