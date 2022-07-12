import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './MyStoreDialog.stories'
import { ModalContextProvider } from '@/context'

const { Common } = composeStories(stories)

const storeDetailsMock = () => <div data-testid="store-details-content" />
jest.mock('../StoreDetails/StoreDetails', () => storeDetailsMock)

const storeLocatorDialogMock = () => <div data-testid="store-locator-dialog" />
jest.mock(
  '@/components/dialogs/Store/StoreLocatorDialog/StoreLocatorDialog',
  () => storeLocatorDialogMock
)

const renderComponent = () => {
  return render(<Common {...Common.args} />, { wrapper: ModalContextProvider })
}

describe('[components] My Store Dialog', () => {
  const setup = () => {
    const user = userEvent.setup()

    renderComponent()
    return {
      user,
    }
  }

  it('should render component', async () => {
    const { user } = setup()
    const title = screen.getByText('my-store')
    const closeIcon = screen.getByRole('button', { name: 'close' })
    const content = screen.getByTestId('store-details-content')

    expect(title).toBeVisible()
    expect(closeIcon).toBeVisible()
    expect(content).toBeVisible()

    const changeStoreLink = screen.getByRole('button', { name: 'change-store' })
    expect(changeStoreLink).toBeVisible()

    await user.click(changeStoreLink)
    // const dialog = await screen.findByTestId('store-locator-dialog')
    // expect(dialog).toBeVisible()
  })
})
