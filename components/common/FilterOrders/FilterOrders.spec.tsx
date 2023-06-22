import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './FilterOrders.stories'
import { FacetTypeForHistory } from '@/lib/constants'

const { Common } = composeStories(stories)

describe('[component] - FilterOrders', () => {
  const setup = () => {
    const user = userEvent.setup()
    const mockOnFilterByClose = jest.fn()
    render(<Common {...Common.args} onFilterByClose={mockOnFilterByClose} />)
    return {
      user,
      mockOnFilterByClose,
    }
  }

  it('should render component', async () => {
    const { user, mockOnFilterByClose } = setup()

    expect(
      screen.getByRole('heading', {
        name: /filter-by/i,
      })
    ).toBeVisible()
    expect(screen.getByText(FacetTypeForHistory[0].label)).toBeVisible()
    Common.args?.appliedFilters?.map(async (option) => {
      expect(screen.getAllByText(option?.label as string)[0]).toBeVisible()
      const button = screen.getByRole('button', {
        name: new RegExp(option?.label as string),
      })

      user.click(button)
      await waitFor(() => {
        expect(button).toBeEnabled()
      })
    })
    const applyButton = screen.getByRole('button', {
      name: /apply/i,
    })

    user.click(applyButton)
    await waitFor(() => {
      expect(mockOnFilterByClose).toBeCalled()
    })
  })

  it('should remove filter tile when users clicks on cross icon', async () => {
    const { user, mockOnFilterByClose } = setup()
    const closeIcon = screen.getAllByTestId('CloseIcon')

    user.click(closeIcon[0])
    await waitFor(() => {
      expect(mockOnFilterByClose).toHaveBeenCalled()
    })
  })
})
