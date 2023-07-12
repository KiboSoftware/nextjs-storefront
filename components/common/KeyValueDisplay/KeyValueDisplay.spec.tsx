import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './KeyValueDisplay.stories'

const { Common } = composeStories(stories)

describe('[component] - KeyValueDisplay', () => {
  const setup = () => {
    render(<Common {...Common.args} />)
  }

  it('should render component', () => {
    setup()

    const keyValueOptions = screen.getByTestId('keyValueOptions')
    const option = Common.args?.option
    const value = option?.value || ''
    const optionValue = screen.getByText(value)
    const name = option?.value || ''
    const optionName = screen.getByText(name)

    expect(keyValueOptions).toBeVisible()
    expect(optionValue).toBeVisible()
    expect(optionName).toBeVisible()
  })
})
