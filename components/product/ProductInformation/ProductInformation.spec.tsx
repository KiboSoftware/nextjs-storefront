import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './ProductInformation.stories'

const { Common } = composeStories(stories)

describe('[component] - ProductInformation', () => {
  const setup = () => {
    render(<Common {...Common.args} />)
  }

  it('should render component', () => {
    setup()

    expect(screen.getByText('product-information')).toBeVisible()
    expect(screen.getByTestId('product-content')).toBeVisible()
    expect(screen.getByText('product-specs')).toBeVisible()

    const accordian = screen.getByTestId('accordian')
    expect(accordian).toHaveAttribute('aria-expanded', 'false')
  })

  it('should expand product spec section while opening the accordian', () => {
    setup()

    const accordian = screen.getByTestId('accordian')
    userEvent.click(accordian)
    expect(accordian).toHaveAttribute('aria-expanded', 'true')

    Common.args?.properties?.map((option) => {
      const name = screen.getByText(`${option.name}:`)
      expect(name).toBeVisible()

      const value = screen.getByText(`${option.value}`)
      expect(value).toBeVisible()
    })
  })
})
