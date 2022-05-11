import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RouterContext } from 'next/dist/shared/lib/router-context'

import { createMockRouter } from '../../../__test__/utils/createMockRouter'
import * as stories from './Content.stories'

const { Common } = composeStories(stories)

describe('[components] - Content', () => {
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
    const name = screen.getByText('Product Name')
    expect(name).toBeVisible()
  })

  it('should route to another page when user clicks on item', async () => {
    setup()
    const button = screen.getByRole('button')
    expect(button).toBeEnabled()
    userEvent.click(button)

    await waitFor(() => {
      expect(router.push).toHaveBeenCalledWith('/product/ProductCode')
    })
  })
})
