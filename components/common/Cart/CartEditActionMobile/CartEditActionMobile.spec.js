import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, fireEvent } from '@testing-library/react'

import * as stories from './CartEditActionMobile.stories' // import all stories from the stories file

const { CartAction } = composeStories(stories)

describe('[component] - CartEditActionMobile', () => {
  it('should render button', () => {
    render(<CartAction />)
    const buttonElement = screen.getByRole('button')

    expect(buttonElement).toBeVisible()
  })

  it('should render button', () => {
    render(<CartAction />)
    const buttonElement = screen.getByRole('button')
    fireEvent.click(buttonElement)
    const items = screen.getAllByRole('menuitem')
    const menuItems = items.map((item) => item.textContent)
    expect(menuItems).toStrictEqual(CartAction.args.options)
  })
})
