import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './Title.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

describe('[components] Add To Cart Dialog Title', () => {
  const setup = () => render(<Common />)

  it('should render component', () => {
    setup()

    const component = screen.getByTestId('title-component')
    const title = screen.getByRole('heading', { name: /added-to-cart/i })

    expect(component).toBeInTheDocument()
    expect(title).toBeVisible()
  })
})
