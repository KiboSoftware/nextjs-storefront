import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RouterContext } from 'next/dist/shared/lib/router-context'

import { createMockRouter } from '../../../__test__/utils/createMockRouter'
import * as stories from './MegaMenuItem.stories'

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

    const name = screen.getAllByText(`${Common.args?.title}`)
    expect(name[0]).toBeVisible()

    const categoryChildren = Common.args?.categoryChildren
    categoryChildren?.map((cat) => {
      const name = screen.getByText(`${cat?.content?.name}`)
      expect(name).toBeVisible()
    })

    const shopAll = screen.getByText('shop-all')
    expect(shopAll).toBeVisible()
  })

  it('should route to another page when user clicks on item', async () => {
    setup()
    const categoryChildren = Common.args?.categoryChildren
    categoryChildren?.map(() => {
      const button = screen.getAllByRole('button')
      expect(button[0]).toBeEnabled()
      userEvent.click(button[0])
      expect(router.push).toHaveBeenCalledWith('/product/' + Common.args?.categoryCode)
    })
  })
})
