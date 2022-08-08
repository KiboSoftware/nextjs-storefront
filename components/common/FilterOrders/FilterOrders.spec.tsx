import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './FilterOrders.stories'
import { FacetTypeForHistory } from '@/lib/constants'

const { Common } = composeStories(stories)

describe('[component] - FilterOrders', () => {
  const user = userEvent.setup()
  it('should render component', () => {
    render(<Common />)

    expect(screen.getByText(/filter-by/i)).toBeVisible()
    expect(screen.getByText(FacetTypeForHistory[0].label)).toBeVisible()
    FacetTypeForHistory[0].values?.map(async (option) => {
      expect(screen.getAllByText(`${option?.label}`)[0]).toBeVisible()
      const checkbox = screen.getByRole('checkbox', {
        name: new RegExp(option?.label),
      })
      await user.click(checkbox)
      await waitFor(() => expect(checkbox).toBeChecked())
    })

    expect(screen.getByText(/filter-by/i)).toBeVisible()
  })
})
