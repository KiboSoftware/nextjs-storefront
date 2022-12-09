import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './MegaMenuItem.stories'

const { Common } = composeStories(stories)
const closeBackDropMock = jest.fn()

describe('[components] - MegaMenuItem', () => {
  const user = userEvent.setup()
  const setup = () => {
    render(<Common {...Common.args} onBackDropClose={closeBackDropMock} />)
    return {
      user,
    }
  }

  it('should render component', () => {
    setup()

    const title = screen.getByText(`${Common.args?.title}`)
    expect(title).toBeVisible()
    const categoryChildren = Common.args?.categoryChildren
    categoryChildren?.map((cat) => {
      const linkPath = 'category' + cat?.categoryCode
      const name = screen.getByRole('link', { name: `${cat?.content?.name}` })
      expect(screen.getByRole('group')).toBeVisible()
      expect(name).toBeVisible()
      expect(name).toHaveAttribute('href', linkPath)
    })

    const shopAll = screen.getByText('shop-all')
    expect(shopAll).toBeVisible()
  })

  it('should call closeBackDrop when click a menu item', async () => {
    const { user } = setup()

    const menuLink = screen.getByText('shop-all')
    await user.click(menuLink)
    expect(closeBackDropMock).toBeCalled()

    const categoryChildren = Common.args?.categoryChildren
    categoryChildren?.map(async (cat) => {
      const name = screen.getByRole('link', { name: `${cat?.content?.name}` })
      await user.click(name)
      expect(closeBackDropMock).toBeCalled()
    })
  })
})
