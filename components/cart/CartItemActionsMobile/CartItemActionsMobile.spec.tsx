import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './CartItemActionsMobile.stories' // import all stories from the stories file

const { CartAction } = composeStories(stories)

describe('[component] - CartItemActionsMobile', () => {
  const setup = () => {
    const onMenuItemSelectionMock = jest.fn()
    const user = userEvent.setup()
    render(<CartAction onMenuItemSelection={onMenuItemSelectionMock} />)
    return { onMenuItemSelectionMock, user }
  }

  it('should render component', () => {
    setup()
    const buttonElement = screen.getByRole('button')

    expect(buttonElement).toBeVisible()
  })

  it('should show popover menu when user clicks on icon button', async () => {
    const { user } = setup()

    const buttonElement = screen.getByRole('button')
    await user.click(buttonElement)

    const items = screen.getAllByRole('menuitem')
    const menuItems = items.map((item) => item.textContent)

    expect(menuItems).toStrictEqual(CartAction?.args?.actions)
  })

  it('should call onMenuItemClick function when user selects any menu item', async () => {
    const { onMenuItemSelectionMock, user } = setup()
    const buttonElement = screen.getByRole('button')
    await user.click(buttonElement)

    const items = screen.getAllByRole('menuitem')
    items[0].click()

    expect(onMenuItemSelectionMock).toHaveBeenCalledWith(items[0].textContent)
  })

  it('should hide popover menu when user selects menu item', async () => {
    const { user } = setup()
    const buttonElement = screen.getByRole('button')
    await user.click(buttonElement)

    const menu = screen.getByRole('menu')
    const menuItems = screen.getAllByRole('menuitem')

    const menuItem = menuItems[0]
    await user.click(menuItem)

    expect(menu).not.toBeVisible()
  })
})
