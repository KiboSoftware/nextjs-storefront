import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './MegaMenu.stories'

const { Common } = composeStories(stories)

describe('[components] - MegaMenu', () => {
  const setIsBackdropOpenMock = jest.fn((isOpen) => {
    return isOpen
  })

  const setup = () => {
    render(<Common {...Common.args} setIsBackdropOpen={setIsBackdropOpenMock} />)
  }
  it('should render component', () => {
    setup()

    const categoryTree = Common.args?.categoryTree || []
    const categoryTreeCount = categoryTree?.filter((c) => c.isDisplayed).length || 0
    const menuItems = screen.getAllByRole('group')

    expect(menuItems).toHaveLength(categoryTreeCount)
  })

  it('should display category names', () => {
    setup()

    const categoryTree = Common.args?.categoryTree?.filter((c) => c.isDisplayed === true) || []
    categoryTree.forEach((cat) => {
      const name = screen.getByText(`${cat.content?.name}`)
      expect(name).toBeVisible()
    })
  })

  it('should display children category titles on the modal while hovering on category', () => {
    setup()

    const categoryTree = Common.args?.categoryTree?.filter((c) => c.isDisplayed === true) || []
    const menuItems = screen.getAllByRole('group')
    userEvent.hover(menuItems[0])

    expect(setIsBackdropOpenMock).toBeCalled()
    categoryTree[0].childrenCategories?.map((cat) => {
      const name = screen.getByText(`${cat?.content?.name}`)
      expect(name).toBeVisible()
    })

    const advertisment = screen.getByText('advertisment')
    const shopAll = screen.getAllByText('shop-all')
    expect(advertisment).toBeVisible()
    expect(shopAll).toHaveLength(categoryTree[0].childrenCategories?.length || 0)
  })

  it('should display sub-categories along with shop all option on the modal', () => {
    setup()

    const categoryTree = Common.args?.categoryTree?.filter((c) => c.isDisplayed === true) || []
    const childrenCategories = categoryTree[0] || []
    const menuItems = screen.getAllByRole('group')
    userEvent.hover(menuItems[0])

    childrenCategories?.childrenCategories?.map((cat) => {
      const name = screen.getByText(`${cat?.content?.name}`)
      expect(name).toBeVisible()
    })
  })
})
