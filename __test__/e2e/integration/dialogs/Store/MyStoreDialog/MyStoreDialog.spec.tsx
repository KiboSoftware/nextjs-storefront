import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

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
    </ModalContextProvider>
  )

  return {
    user,
  }
}
describe('[components] My Store Dialog integration', () => {
  it('should render component', async () => {
    const { user } = setup()

    const showModalButton = screen.getByRole('button', { name: 'Show Modal' })
    await user.click(showModalButton)

    const location = storeLocationGetters.getLocation(Common.args?.location as Maybe<Location>)
    const name = location?.name || ''

    const component = screen.getByRole('dialog')
    const title = screen.getAllByRole('heading', { name: /my-store/i })[0]
    const closeIconButton = screen.getByRole('button', {
      name: /close/i,
    })
    const locationName = screen.getByText(name)
    const changeStoreButton = screen.getByRole('button', {
      name: /change-store/i,
    })

    expect(component).toBeVisible()
    expect(title).toBeVisible()
    expect(closeIconButton).toBeVisible()
    expect(locationName).toBeInTheDocument()
    expect(changeStoreButton).toBeVisible()
  })
})
