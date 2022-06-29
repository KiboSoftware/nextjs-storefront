import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './FilterOrders.stories'

const { Common } = composeStories(stories)

describe('[component] - FilterOrders', () => {
  it('should render component', () => {
    render(<Common />)

    const filterOrderChip = screen.getByRole('button', {
      name: /filter-orders/i,
    })
    expect(filterOrderChip).toBeVisible()
  })
})
