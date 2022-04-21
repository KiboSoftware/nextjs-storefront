import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './FulfillmentOptions.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

describe('[components] Fulfillment Options Component', () => {
  const setup = () => {
    render(<Common />)
  }

  it('should render component', () => {
    setup()

    const radiogroup = screen.getByRole('radiogroup')

    expect(radiogroup).toBeVisible()
  })
})
