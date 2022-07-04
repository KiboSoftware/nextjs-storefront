import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './KiboDialog.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

const onCloseMock = jest.fn()

describe('[components] Dialog Component', () => {
  const setup = (params = {}) => {
    const user = userEvent.setup()
    render(<Common {...params} onClose={onCloseMock} />)
    return {
      user,
    }
  }

  it('should not render component by default', () => {
    setup({ isOpen: false })

    const component = screen.queryByTestId('kibo-dialog')

    expect(component).not.toBeInTheDocument()
  })

  it('should open modal, when isOpen = true', () => {
    setup({ isOpen: true })

    const title = screen.getByText(/dialog title/i)
    const closeIconButton = screen.getByRole('button', {
      name: /close/i,
    })
    const content = screen.getByText(/cras mattis consectetur purus sit amet fermentum/i)
    const actions = screen.getByRole('button', {
      name: /save/i,
    })

    expect(title).toBeVisible()
    expect(closeIconButton).toBeVisible()
    expect(content).toBeVisible()
    expect(actions).toBeVisible()
  })

  it('should close modal, when user clicks on close icon', async () => {
    const { user } = setup({ isOpen: true })

    const dialog = screen.getByRole('dialog')
    const closeIconButton = screen.getByRole('button', {
      name: /close/i,
    })
    await user.click(closeIconButton)

    expect(dialog).toBeVisible()
    expect(closeIconButton).toBeVisible()
    expect(onCloseMock).toHaveBeenCalled()
  })
})
