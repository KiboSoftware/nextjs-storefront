import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from '../../../../../components/product/ProductInformation/ProductInformation.stories'

const { Common } = composeStories(stories)

describe('[component] - ProductInformation Integration', () => {
  const setup = () => {
    render(<Common {...Common.args} />)
  }

  it('should render component', () => {
    setup()

    const accordian = screen.getByTestId('accordian')
    expect(accordian).toHaveAttribute('aria-expanded', 'false')
    userEvent.click(accordian)
    expect(accordian).toHaveAttribute('aria-expanded', 'true')

    const productItem = screen.getAllByTestId('productOption')
    const count = Common.args?.properties?.length || 0

    expect(productItem).toHaveLength(count)

    Common.args?.properties?.map((option) => {
      const name = screen.getByText(`${option.name}:`)
      expect(name).toBeVisible()

      const value = screen.getByText(`${option.value}`)
      expect(value).toBeVisible()
    })
  })
})
