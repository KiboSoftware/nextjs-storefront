import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from '../../../../../components/product/ProductInformation/ProductInformation.stories'

const { Common } = composeStories(stories)

describe('[component] - ProductInformation Integration', () => {
  const setup = () => {
    const user = userEvent.setup()
    render(<Common {...Common.args} />)
    return { user }
  }

  it('should render component', async () => {
    const { user } = setup()

    const accordian = screen.getByTestId('accordian')
    expect(accordian).toHaveAttribute('aria-expanded', 'false')
    await user.click(accordian)
    expect(accordian).toHaveAttribute('aria-expanded', 'true')

    const productItem = screen.getAllByTestId('productOption')
    const count = Common.args?.options?.length || 0

    expect(productItem).toHaveLength(count)

    Common.args?.options?.map((option) => {
      const name = screen.getByText(`${option.name}:`)
      expect(name).toBeVisible()

      const value = screen.getByText(`${option.value}`)
      expect(value).toBeVisible()
    })
  })
})
