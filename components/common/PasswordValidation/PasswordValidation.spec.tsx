import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './PasswordValidation.stories'

const { Common } = composeStories(stories)

describe('[components] PasswordValidation', () => {
  const setup = () => {
    render(<Common {...Common.args} />)
  }

  it('should render component', () => {
    setup()

    const checkCircleIcons = screen.getAllByTestId('CheckCircleIcon')

    expect(checkCircleIcons).toHaveLength(4)
  })
})
