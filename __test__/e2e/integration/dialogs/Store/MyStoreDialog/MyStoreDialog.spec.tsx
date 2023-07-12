import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { createQueryClientWrapper } from '@/__test__/utils'
import * as stories from '@/components/dialogs/Store/MyStoreDialog/MyStoreDialog.stories'
import { DialogRoot, ModalContextProvider, useModalContext } from '@/context'
import { storeLocationGetters } from '@/lib/getters/storeLocationGetters'

import type { Location, Maybe } from '@/lib/gql/types'

const { Common } = composeStories(stories)

const TestComponent = () => {
  const { showModal } = useModalContext()

  const showYourModal = () => {
    showModal({ Component: Common, props: Common.args })
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
describe('[components] My Store Dialog integration', () => {
  it('should render component', async () => {
    const { user } = setup()

    const showModalButton = screen.getByRole('button', { name: 'Show Modal' })
    user.click(showModalButton)

    const location = storeLocationGetters.getLocation(Common.args?.location as Maybe<Location>)

    expect(await screen.findByText(location?.name as string)).toBeVisible()
    expect(screen.getByText(location?.streetAddress?.trim() as string)).toBeVisible()
    expect(screen.getByText(location?.cityState as string)).toBeVisible()
    expect(screen.getByText(/available/i)).toBeVisible()
    expect(screen.getByText(/store-info/i)).toBeVisible()
  })

  it('should close dialog when user clicks on close icon button', async () => {
    const { user } = setup()

    const showModalButton = screen.getByRole('button', { name: 'Show Modal' })

    user.click(showModalButton)
    const dialog = await screen.findByRole('dialog')
    expect(dialog).toBeVisible()

    const closeIconButton = screen.getByRole('button', {
      name: /close/i,
    })
    user.click(closeIconButton)

    await waitFor(() => {
      expect(dialog).not.toBeVisible()
    })
    expect(closeIconButton).not.toBeVisible()
  })

  it('should open store locator dialog when user clicks on Change Store button', async () => {
    const { user } = setup()

    const showModalButton = screen.getByRole('button', { name: 'Show Modal' })

    user.click(showModalButton)
    expect(await screen.findByRole('dialog')).toBeVisible()

    const changeStoreButton = await screen.findByRole('button', {
      name: /change-store/i,
    })
    user.click(changeStoreButton)

    expect(await screen.findByText(/select-store/i)).toBeVisible()
  })
})
