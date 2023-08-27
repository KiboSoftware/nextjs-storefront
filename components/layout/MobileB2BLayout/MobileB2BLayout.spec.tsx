import React from 'react'

import { useMediaQuery } from '@mui/material'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'

import MobileB2BLayout from './MobileB2BLayout'

const user = userEvent.setup()

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn(),
}))

describe('MobileB2BLayout', () => {
  const mockOnBackClick = jest.fn()

  const testProps = {
    headerText: 'Test Header',
    backText: 'Back',
    onBackClick: mockOnBackClick,
  }

  it('renders component correctly', () => {
    render(<MobileB2BLayout {...testProps} />)

    const headerElement = screen.getByText('Test Header')
    expect(headerElement).toBeInTheDocument()

    const arrowIcon = screen.getByTestId('arrow-icon')
    expect(arrowIcon).toBeInTheDocument()
  })

  it('calls onBackClick when back button is clicked', async () => {
    render(<MobileB2BLayout {...testProps} />)

    const arrowIcon = screen.getByTestId('arrow-icon')

    await user.click(arrowIcon)

    expect(mockOnBackClick).toHaveBeenCalled()
  })

  it('displays header text in the correct format for md screens', () => {
    const useMediaQueryMock = useMediaQuery as jest.Mock
    useMediaQueryMock.mockReturnValue(true)
    const { rerender } = render(<MobileB2BLayout {...testProps} />)

    const headerText = screen.getByText('Test Header')
    expect(headerText).toBeInTheDocument()

    const backTextElement = screen.getByText('Back')
    expect(backTextElement).toBeInTheDocument()

    rerender(<MobileB2BLayout {...testProps} />)

    const headerTextH1 = screen.getByRole('heading', { level: 1 })
    expect(headerTextH1).toBeInTheDocument()
  })

  it('displays header text in the correct format for xs screens', () => {
    const useMediaQueryMock = useMediaQuery as jest.Mock
    useMediaQueryMock.mockReturnValue(false)
    const { rerender } = render(<MobileB2BLayout {...testProps} />)
    const headerText = screen.getByText('Test Header')
    expect(headerText).toBeInTheDocument()

    rerender(<MobileB2BLayout {...testProps} />)

    const headerTextH2 = screen.getByRole('heading', { level: 2 })
    expect(headerTextH2).toBeInTheDocument()
  })
})
