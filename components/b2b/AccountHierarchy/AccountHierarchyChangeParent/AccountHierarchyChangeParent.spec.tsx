import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './AccountHierarchyChangeParent.stories' // import all stories from the stories file
import { b2BAccountHierarchyResult } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils'

const { Common } = composeStories(stories)

const onClose = jest.fn()
const onSave = jest.fn()

const accountToEdit = b2BAccountHierarchyResult?.accounts?.[1]

const setup = () => {
  render(<Common {...Common.args} />, {
    wrapper: createQueryClientWrapper(),
  })
}

describe('[component] Edit Child Account Form', () => {
  it('should render component', async () => {
    setup()

    const currentParentAccount = screen.getByText(accountToEdit?.companyOrOrganization as string)
    expect(currentParentAccount).toBeVisible()

    const parentAccountButton: HTMLInputElement = screen.getByRole('button', {
      name: 'parent-account',
    })
    expect(parentAccountButton).toBeVisible()
    expect(parentAccountButton).toHaveTextContent('select-parent-account')

    const submitButton = await screen.findByTestId('submit-button')
    expect(submitButton).toBeVisible()

    const cancelButton = await screen.findByTestId('cancel-button')
    expect(cancelButton).toBeVisible()
  })

  it('should call onSave callback function when user clicks on Update Account button', async () => {
    render(<Common {...Common.args} onSave={onSave} />)

    const parentAccountButton: HTMLInputElement = screen.getByRole('button', {
      name: 'parent-account',
    })
    expect(parentAccountButton).toBeVisible()
    fireEvent.mouseDown(parentAccountButton)
    const optionsPopupEl = await screen.findByRole('listbox')
    await userEvent.click(within(optionsPopupEl).getByRole('option', { name: 'Child 3' }))

    const submitButton = await screen.findByTestId('submit-button')

    userEvent.click(submitButton)
    await waitFor(() => expect(onSave).toHaveBeenCalledTimes(1))
  })

  it('should call onClose callback function when user clicks on Cancel button', async () => {
    render(<Common {...Common.args} onClose={onClose} />)

    const cancelButton = await screen.findByTestId('cancel-button')
    userEvent.click(cancelButton)
    await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1))
  })
})
