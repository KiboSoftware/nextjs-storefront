import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { fireEvent, render, screen } from '@testing-library/react'

import * as stories from './MegaMenu.stories'

const { Common } = composeStories(stories)

const megaMenuItemMock = () => <div data-testid="mega-menu-item-component" />
jest.mock('@/components/layout/MegaMenuItem/MegaMenuItem', () => () => megaMenuItemMock())

describe('[components] - MegaMenu', () => {
  const setIsBackdropOpenMock = jest.fn((isOpen) => {
    return isOpen
  })

  const setup = () => {
    render(<Common {...Common.args} onBackdropToggle={setIsBackdropOpenMock} />)
  }
  it('should render component', () => {
    setup()

    const categoryTree = Common.args?.categoryTree?.filter((c) => c?.isDisplayed === true) || []
    categoryTree.forEach((cat) => {
      const name = screen.getByText(`${cat?.content?.name}`)
      expect(name).toBeVisible()
    })

    const menuItems = screen.getAllByRole('group')
    expect(menuItems).toHaveLength(categoryTree.length)
  })

  it('should display menu items and advertisement while hovering on category', () => {
    setup()

    const category = Common.args?.categoryTree?.filter((c) => c?.isDisplayed === true) || []
    const childrenCategories = category[0]?.childrenCategories || []
    const menuItems = screen.getAllByRole('group')
    fireEvent.mouseOver(menuItems[0])

    const megaMenuItems = screen.getAllByTestId('mega-menu-item-component')
    expect(megaMenuItems[0]).toBeInTheDocument()
    expect(megaMenuItems).toHaveLength(childrenCategories.length)
  })
})
