import { composeStories } from '@storybook/testing-react'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './QuotesFilterDialog.stories'
import { renderWithQueryClient } from '@/__test__/utils'

const { Common } = composeStories(stories)
const user = userEvent.setup()

const onFilterActionMock = jest.fn()
const closeModalMock = jest.fn()

describe('[components]  QuotesFilterDialog', () => {
  it('should render QuotesFilterDialog component', () => {
    renderWithQueryClient(
      <Common closeModal={closeModalMock} onFilterAction={onFilterActionMock} />
    )

    expect(screen.getByRole('textbox', { name: 'expiration-date' })).toBeVisible()
    expect(screen.getByRole('textbox', { name: 'date-created' })).toBeVisible()

    const statusRadioGroup = screen.getByRole('radiogroup', { name: 'quote-status' })

    expect(statusRadioGroup).toBeVisible()
  })

  it("should select a status filter and call 'onApply' callback", async () => {
    renderWithQueryClient(
      <Common closeModal={closeModalMock} onFilterAction={onFilterActionMock} />
    )

    expect(screen.getByRole('radio', { name: 'pending' })).not.toBeChecked()
    expect(screen.getByRole('radio', { name: 'inReview' })).not.toBeChecked()
    expect(screen.getByRole('radio', { name: 'readyForCheckout' })).not.toBeChecked()

    await user.click(screen.getByRole('radio', { name: 'pending' }))

    expect(screen.getByRole('radio', { name: 'pending' })).toBeChecked()

    await user.click(screen.getByRole('button', { name: 'apply' }))

    await waitFor(() => {
      expect(onFilterActionMock).toHaveBeenLastCalledWith({
        ...Common?.args?.filters,
        status: 'Pending',
      })
    })
  })

  it("should handle expirationDate input and call 'onApply' callback", async () => {
    renderWithQueryClient(
      <Common closeModal={closeModalMock} onFilterAction={onFilterActionMock} />
    )

    expect(screen.getByRole('textbox', { name: 'expiration-date' })).toBeVisible()

    await user.type(screen.getByRole('textbox', { name: 'expiration-date' }), '2021-10-10')

    await user.click(screen.getByRole('button', { name: 'apply' }))

    await waitFor(() => {
      expect(onFilterActionMock).toHaveBeenLastCalledWith({
        ...Common?.args?.filters,
        expirationDate: '2021-10-10',
      })
    })
  })

  it("should handle status and expirationDate input and call 'onApply' callback", async () => {
    renderWithQueryClient(
      <Common closeModal={closeModalMock} onFilterAction={onFilterActionMock} />
    )

    expect(screen.getByRole('textbox', { name: 'expiration-date' })).toBeVisible()

    await user.type(screen.getByRole('textbox', { name: 'expiration-date' }), '2021-10-10')

    expect(screen.getByRole('radio', { name: 'inReview' })).not.toBeChecked()

    await user.click(screen.getByRole('radio', { name: 'inReview' }))

    expect(screen.getByRole('radio', { name: 'inReview' })).toBeChecked()

    await user.click(screen.getByRole('button', { name: 'apply' }))

    await waitFor(() => {
      expect(onFilterActionMock).toHaveBeenLastCalledWith({
        ...Common?.args?.filters,
        expirationDate: '2021-10-10',
        status: 'InReview',
      })
    })
  })
})
