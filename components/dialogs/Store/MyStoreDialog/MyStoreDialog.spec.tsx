import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './MyStoreDialog.stories'
import { ModalContextProvider } from '@/context'

const { Common } = composeStories(stories)

const storeDetailsMock = () => <div data-testid="store-details-content" />
jest.mock('../StoreDetails/StoreDetails', () => () => storeDetailsMock())

const storeLocatorDialogMock = () => <div data-testid="store-locator-dialog" />
jest.mock(
  '@/components/dialogs/Store/StoreLocatorDialog/StoreLocatorDialog',
  () => () => storeLocatorDialogMock()
)

const renderComponent = () => {
  return render(<Common {...Common.args} />, { wrapper: ModalContextProvider })
}

describe('[components] My Store Dialog', () => {
  const setup = () => renderComponent()

  it('should render component', async () => {
    setup()
    const title = screen.getByText('my-store')
    const closeIcon = screen.getByRole('button', { name: 'close' })
    const content = screen.getByTestId('store-details-content')

    expect(title).toBeVisible()
    expect(closeIcon).toBeVisible()
    expect(content).toBeVisible()

    const changeStoreLink = screen.getByRole('button', { name: 'change-store' })
    expect(changeStoreLink).toBeVisible()
  })
})
