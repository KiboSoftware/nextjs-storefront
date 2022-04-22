import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './Content.stories' // import all stories from the stories file

const { Common } = composeStories(stories)
const { cartItem } = stories

describe('[components] Add To Cart Dialog', () => {
  const setup = (params = {}) => render(<Common {...params} />)

  it('should render component', () => {
    setup(cartItem)

    const component = screen.getByTestId('content-component')

    expect(component).toBeInTheDocument()
  })
})
