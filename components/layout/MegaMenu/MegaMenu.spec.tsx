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

  it('should display menu item on hover on category', () => {
    setup()

    const categoryTree = Common.args?.categoryTree || []
    const menuItems = screen.getAllByRole('group')
    userEvent.hover(menuItems[0])

    expect(setIsBackdropOpenMock).toBeCalled()
    categoryTree
      .filter((c) => c.isDisplayed === true)
      .map((cat) => {
        const name = screen.getByText(`${cat.content?.name}`)
        expect(name).toBeVisible()
      })
  })
})
