import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import '@testing-library/jest-dom'

import * as stories from './Preview.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

const mockFetch = jest.fn(() => {
  return {
    json: () => ({ isSuccessful: true }),
  }
}) as any

// Assign the mock fetch implementation to the global object
global.fetch = mockFetch

const setup = () => {
  const user = userEvent.setup()
  render(<Common {...Common.args} />)

  return {
    user,
  }
}

describe('[component] Preview component', () => {
  it('renders properly', () => {
    setup()
    expect(screen.getByLabelText('Preview Date')).toBeInTheDocument()
    expect(
      screen.getByRole('textbox', {
        name: /price list/i,
      })
    ).toBeInTheDocument()
    expect(screen.getByText('Apply')).toBeInTheDocument()
    expect(screen.getByText('Close Preview')).toBeInTheDocument()
  })
})
