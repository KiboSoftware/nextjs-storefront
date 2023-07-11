import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { locationInventoryCollectionMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils'
import * as stories from '@/components/dialogs/Store/StoreLocatorDialog/StoreLocatorDialog.stories'
import { DialogRoot, ModalContextProvider, useModalContext } from '@/context'

const { Common, WithProduct } = composeStories(stories)
const handleSetStoreMock = jest.fn()
const inventory =
  locationInventoryCollectionMock?.productLocationInventory?.items &&
  locationInventoryCollectionMock?.productLocationInventory?.items[0]

const TestComponent = (props: { component: any }) => {
  const { component } = props
  const { showModal } = useModalContext()

  const showYourModal = () => {
    showModal({
      Component: component,
      props: { ...component.args, handleSetStore: handleSetStoreMock },
    })
  }

  return (
    <div>
      <DialogRoot />
      <button data-testid="show-modal" onClick={showYourModal}>
        Show Modal
      </button>
    </div>
  )
}

const setup = (prop?: any) => {
  const user = userEvent.setup()
  prop = prop || Common
  render(
    <ModalContextProvider>
      <TestComponent component={prop} />
    </ModalContextProvider>,
    {
      wrapper: createQueryClientWrapper(),
    }
  )

  return {
    user,
  }
}

describe('[components] Store Locator Dialog integration', () => {
  it('should render component', async () => {
    const { user } = setup()

    const showModalButton = screen.getByRole('button', { name: 'Show Modal' })
    user.click(showModalButton)

    expect(await screen.findByText(/zip-code/i)).toBeVisible()
    expect(await screen.findAllByRole('button', { name: /search/i })).toHaveLength(3)
    expect(await screen.findByText(/use-current-location/i)).toBeVisible()
    expect(await screen.findByText(/find-stores-within-miles/i)).toBeVisible()
  })

  it('should close dialog when user clicks on closeIcon button', async () => {
    const { user } = setup()

    const showModalButton = screen.getByRole('button', { name: 'Show Modal' })
    user.click(showModalButton)

    const dialog = await screen.findByRole('dialog')
    expect(dialog).toBeVisible()

    const closeIconButton = await screen.findByRole('button', {
      name: /close/i,
    })
    expect(closeIconButton).toBeVisible()

    user.click(closeIconButton)

    await waitFor(() => {
      expect(dialog).not.toBeVisible()
    })
    expect(closeIconButton).not.toBeVisible()
  })

  it('should search location by zipcode when user clicks on Search button', async () => {
    const { user } = setup()
    const userEnteredText = '87110'

    const showModalButton = screen.getByRole('button', { name: 'Show Modal' })

    user.click(showModalButton)
    const input = await screen.findByRole('textbox', { name: 'search-input' })
    expect(input).toHaveValue('')

    user.type(input, userEnteredText)
    await waitFor(() => {
      expect(input).toHaveValue(userEnteredText)
    })

    const searchStoreButton = screen.getAllByRole('button', {
      name: /search/i,
    })[2]
    user.click(searchStoreButton)

    const radio = await screen.findByRole('radio', {
      name: /Richmond/i,
    })
    expect(radio).toBeInTheDocument()
  })

  it('should set the location when user select the radio button', async () => {
    const { user } = setup()

    const showModalButton = screen.getByRole('button', { name: 'Show Modal' })
    user.click(showModalButton)

    const dialog = await screen.findByRole('dialog')
    expect(dialog).toBeVisible()

    const setStoreButton = await screen.findByRole('button', {
      name: /set-store/i,
    })
    expect(setStoreButton).toBeVisible()

    user.click(setStoreButton)
    await waitFor(() => {
      expect(handleSetStoreMock).toHaveBeenCalled()
    })
  })

  it('should display product details and with available stock if inventory available for searched location', async () => {
    const { user } = setup(WithProduct)
    const userEnteredText = '87110'

    const showModalButton = screen.getByRole('button', { name: 'Show Modal' })

    user.click(showModalButton)
    const input = await screen.findByRole('textbox', { name: 'search-input' })

    user.type(input, userEnteredText)
    await waitFor(() => {
      expect(input).toHaveValue(userEnteredText)
    })

    const searchStoreButton = await screen.findAllByRole('button', {
      name: /search/i,
    })
    user.click(searchStoreButton[2])
    expect(await screen.findByText(`${inventory?.stockAvailable} available`)).toBeVisible()
  })
})
