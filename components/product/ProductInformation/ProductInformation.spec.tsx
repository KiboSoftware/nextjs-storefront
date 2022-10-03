import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './ProductInformation.stories'

const { Common } = composeStories(stories)

const productOptionMock = () => <div data-testid="product-option-list-component" />
jest.mock(
  '@/components/product/ProductOptionList/ProductOptionList',
  () => () => productOptionMock()
)

describe('[component] - ProductInformation', () => {
  const setup = () => {
    const user = userEvent.setup()
    render(<Common {...Common.args} />)
    return {
      user,
    }
  }

  it('should render component', () => {
    setup()
    const content = screen.getByTestId('product-content')
    expect(screen.getByText('product-information')).toBeVisible()
    expect(content.innerHTML).toBe(Common.args?.productFullDescription)
    expect(screen.getByText('product-specs')).toBeVisible()

    const accordian = screen.getByTestId('accordian')
    expect(accordian).toHaveAttribute('aria-expanded', 'false')

    const productItemOptions = screen.getByTestId('product-option-list-component')
    expect(productItemOptions).not.toBeVisible()
  })

  it('should open product spec accordion when user clicks on accordion header', async () => {
    const { user } = setup()

    const accordian = screen.getByTestId('accordian')
    expect(accordian).toHaveAttribute('aria-expanded', 'false')
    await user.click(accordian)
    expect(accordian).toHaveAttribute('aria-expanded', 'true')
    const productItemOptions = screen.getByTestId('product-option-list-component')
    expect(productItemOptions).toBeVisible()
  })

  it('should close accordion when accordion is already open and the user clicks on accordion header', async () => {
    const { user } = setup()

    const accordian = screen.getByTestId('accordian')
    await user.click(accordian)
    expect(accordian).toHaveAttribute('aria-expanded', 'true')
    await user.click(accordian)
    expect(accordian).toHaveAttribute('aria-expanded', 'false')
  })
})
