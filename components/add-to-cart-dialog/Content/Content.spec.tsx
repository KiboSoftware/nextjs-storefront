import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './Content.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

describe('[components] Add To Cart Dialog', () => {
  const setup = (params = {}) => render(<Common {...params} />)

  it('should render component', () => {
    setup({
      fullfillmentOption: 'free',
      quantity: 2,
      subtotal: 219.99,
      tax: 13.73,
      total: 233.72,
    })

    const component = screen.getByTestId('content-component')

    expect(component).toBeInTheDocument()
  })
})
