import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './ConfirmationDialog.stories'
import { ModalContextProvider } from '@/context'

const { Common } = composeStories(stories)

const onDeleteMock = jest.fn()
const renderComponent = () => {
  return render(<Common {...Common.args} onConfirm={onDeleteMock} />, {
    wrapper: ModalContextProvider,
  })
}

const user = userEvent.setup()

describe('[components] ConfirmationDialog', () => {
  const setup = () => renderComponent()

  it('should render component', async () => {
    setup()
    const title = screen.getByText(Common.args?.contentText as string)

    expect(title).toBeVisible()

    await user.click(screen.getByRole('button', { name: 'Delete' }))

    expect(onDeleteMock).toBeCalled()
  })
})
