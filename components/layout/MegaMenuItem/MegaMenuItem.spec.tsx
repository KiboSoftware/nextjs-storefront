import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RouterContext } from 'next/dist/shared/lib/router-context'

import * as stories from './MegaMenuItem.stories'
import { createMockRouter } from '@/__test__/utils/createMockRouter'

const { Common } = composeStories(stories)

describe('[components] - MegaMenuItem', () => {
  const router = createMockRouter()

  const setup = () => {
    render(
      <RouterContext.Provider value={router}>
        <Common {...Common.args} />;
      </RouterContext.Provider>
    )
  }

  it('should render component', () => {
    setup()

    const title = screen.getByText(`${Common.args?.title}`)
    expect(title).toBeVisible()

    const categoryChildren = Common.args?.categoryChildren
    categoryChildren?.map((cat) => {
      const name = screen.getByText(`${cat?.content?.name}`)
      expect(name).toBeVisible()
    })

    const shopAll = screen.getByText('shop-all')
    expect(shopAll).toBeVisible()
  })

  it('should route to another page when user clicks on shop all', async () => {
    setup()
    const button = screen.getByTestId('shopAllLink')
    expect(button).toBeEnabled()
    userEvent.click(button)
    expect(router.push).toHaveBeenCalledWith('/product/' + Common.args?.categoryCode)
  })

  it('should route to another page when user clicks on item', async () => {
    setup()
    const categoryChildren = Common.args?.categoryChildren
    categoryChildren?.map((cat) => {
      const button = screen.getByRole('button')
      expect(button).toBeEnabled()
      userEvent.click(button)
      expect(router.push).toHaveBeenCalledWith('/product/' + cat?.categoryCode)
    })
  })
})
