import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { createQueryClientWrapper } from '@/__test__/utils'
import * as stories from '@/components/dialogs/Store/StoreLocatorDialog/StoreLocatorDialog.stories'
import { DialogRoot, ModalContextProvider, useModalContext } from '@/context'

const { Common } = composeStories(stories)
const handleSetStoreMock = jest.fn()

const TestComponent = () => {
  const { showModal } = useModalContext()

  const showYourModal = () => {
    showModal({ Component: Common, props: { ...Common.args, handleSetStore: handleSetStoreMock } })
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

const setup = () => {
  const user = userEvent.setup()

  render(
    <ModalContextProvider>
      <TestComponent />
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
    await user.click(showModalButton)

    expect(screen.getByText(/zip-code/i)).toBeVisible()
    expect(screen.getAllByRole('button', { name: /search/i })).toHaveLength(3)
    expect(screen.getByText(/use-current-location/i)).toBeVisible()
    expect(screen.getByText(/show-stores-with-availability/i)).toBeVisible()
    expect(screen.getByText(/find-stores-within-miles/i)).toBeVisible()
  })

  it('should close dialog when user clicks on closeIcon button', async () => {
    const { user } = setup()

    const showModalButton = screen.getByRole('button', { name: 'Show Modal' })
    await user.click(showModalButton)

    const dialog = screen.getByRole('dialog')
    const closeIconButton = screen.getByRole('button', {
      name: /close/i,
    })
    await user.click(closeIconButton)

    expect(dialog).not.toBeVisible()
    expect(closeIconButton).not.toBeVisible()
  })

  it('should search location by zipcode when user clicks on Search button', async () => {
    const { user } = setup()
    const userEnteredText = '87110'

    const showModalButton = screen.getByRole('button', { name: 'Show Modal' })
    await user.click(showModalButton)

    const input = screen.getByRole('textbox', { name: 'search-input' })
    expect(input).toHaveValue('')
    await user.type(input, userEnteredText)
    expect(input).toHaveValue(userEnteredText)

    const searchStoreButton = screen.getAllByRole('button', {
      name: /search/i,
    })
    expect(searchStoreButton[2]).toBeVisible()
    await user.click(searchStoreButton[2])

    await waitFor(() => {
      const radio = screen.getByRole('radio', {
        name: /Albuquerque/i,
      })
      expect(radio).toBeVisible()
    })
  })

  it('should set the location when user select the radio button', async () => {
    const { user } = setup()

    const showModalButton = screen.getByRole('button', { name: 'Show Modal' })
    await user.click(showModalButton)

    const dialog = screen.getByRole('dialog')
    const setStoreButton = screen.getByRole('button', {
      name: /set-store/i,
    })

    expect(dialog).toBeVisible()
    expect(setStoreButton).toBeVisible()
    await user.click(setStoreButton)
    expect(handleSetStoreMock).toHaveBeenCalled()
  })
})
