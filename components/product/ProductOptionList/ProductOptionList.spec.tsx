import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './ProductOptionList.stories'

const { Common } = composeStories(stories)

const KeyValueDisplayMock = () => <div data-testid="key-value-display-component" />
jest.mock('@/components/common/KeyValueDisplay/KeyValueDisplay', () => () => KeyValueDisplayMock())

describe('[component] - ProductOptionList', () => {
  const setup = () => {
    render(<Common {...Common.args} />)
  }

  it('should render component', () => {
    setup()

    const productItemOptions = screen.getAllByTestId('key-value-display-component')
    const items = Common.args?.options || []

    const count = items.length || 0
    expect(productItemOptions).toHaveLength(count)
  })
})
