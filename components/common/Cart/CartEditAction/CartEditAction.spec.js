import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './CartEditAction.stories' // import all stories from the stories file

const { CartAction } = composeStories(stories)

describe('[component] - CartEditAction', () => {
  const setup = () => {
    const onMenuItemSelectionMock = jest.fn()
    render(<CartAction onMenuItemSelection={onMenuItemSelectionMock} />)
    return { onMenuItemSelectionMock }
  }

  it('should render component', () => {
    setup()
    const buttonElement = screen.getByRole('button')

    expect(buttonElement).toBeVisible()
  })

  it('should show popover menu when user clicks on icon button', () => {
    setup()

    const buttonElement = screen.getByRole('button')
    userEvent.click(buttonElement)

    const items = screen.getAllByRole('menuitem')
    const menuItems = items.map((item) => item.textContent)

    expect(menuItems).toStrictEqual(CartAction.args.options)
  })

  it('should call onMenuItemClick function when user selects any menu item', () => {
    const { onMenuItemSelectionMock } = setup()
    const buttonElement = screen.getByRole('button')
    userEvent.click(buttonElement)

    const items = screen.getAllByRole('menuitem')
    items[0].click()

    expect(onMenuItemSelectionMock).toHaveBeenCalledWith(items[0].textContent)
  })

  it('should hide popover menu when user selects menu item', async () => {
    setup()
    const buttonElement = screen.getByRole('button')
    userEvent.click(buttonElement)

    const menu = screen.getByRole('menu')
    const menuItems = screen.getAllByRole('menuitem')

    const menuItem = menuItems[0]
    userEvent.click(menuItem)

    expect(menu).not.toBeVisible()
  })
})
