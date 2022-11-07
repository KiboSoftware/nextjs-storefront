import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './StoreLocatorDialog.stories'
import { ModalContextProvider } from '@/context'

const { Common } = composeStories(stories)

const searchStoreMock = () => <div data-testid="search-store-content" />
jest.mock('../SearchStore/SearchStore', () => () => searchStoreMock())

const renderComponent = () => {
  return render(<Common {...Common.args} />, { wrapper: ModalContextProvider })
}

describe('[components] Store Locator Dialog', () => {
  const setup = () => renderComponent()

  it('should render component', async () => {
    setup()

    expect(screen.getByText('select-store')).toBeVisible()
    expect(screen.getByRole('button', { name: 'close' })).toBeVisible()
    expect(screen.getByTestId('search-store-content')).toBeVisible()

    const setStoreLink = screen.getByRole('button', { name: 'set-store' })
    expect(setStoreLink).toBeVisible()
  })
})
