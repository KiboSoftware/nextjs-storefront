import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './Content.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

describe('[components] Add To Cart Dialog', () => {
  const setup = () => render(<Common {...Common.args} />)

  it('should render component', () => {
    setup()

    const component = screen.getByTestId('content-component')

    expect(component).toBeInTheDocument()
  })
})
