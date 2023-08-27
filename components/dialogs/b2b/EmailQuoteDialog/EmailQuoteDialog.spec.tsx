import { composeStories } from '@storybook/testing-react'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './EmailQuoteDialog.stories'
import { renderWithQueryClient } from '@/__test__/utils'

const { Common } = composeStories(stories)
const user = userEvent.setup()

const onEmailSendMock = jest.fn()
const closeModalMock = jest.fn()

describe('[components]  EmailQuoteDialog', () => {
  it('should render EmailQuoteDialog component', () => {
    renderWithQueryClient(<Common closeModal={closeModalMock} onEmailSend={onEmailSendMock} />)

    expect(screen.getByRole('combobox')).toBeVisible()

    expect(screen.getByRole('button', { name: 'send' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'cancel' })).toBeVisible()
  })

  it('should handle onEmailSend callback with one email address', async () => {
    renderWithQueryClient(<Common closeModal={closeModalMock} onEmailSend={onEmailSendMock} />)

    const input = screen.getByRole('combobox')

    expect(screen.getByRole('button', { name: 'send' })).toBeDisabled()

    await user.type(input, 'test@gmail.com')

    await user.keyboard('{Enter}')

    await user.click(screen.getByRole('button', { name: 'send' }))

    await waitFor(() => {
      expect(onEmailSendMock).toBeCalledWith(['test@gmail.com'])
    })
  })

  it('should handle onEmailSend callback with multiple email address', async () => {
    renderWithQueryClient(<Common closeModal={closeModalMock} onEmailSend={onEmailSendMock} />)

    const input = screen.getByRole('combobox')

    expect(screen.getByRole('button', { name: 'send' })).toBeDisabled()

    await user.type(input, 'test-1@gmail.com')

    await user.keyboard('{Enter}')

    await user.type(input, 'test-2@gmail.com')

    await user.keyboard('{Enter}')

    await user.click(screen.getByRole('button', { name: 'send' }))

    await waitFor(() => {
      expect(onEmailSendMock).toBeCalledWith(['test-1@gmail.com', 'test-2@gmail.com'])
    })
  })

  it('should handle individual email removal', async () => {
    renderWithQueryClient(<Common closeModal={closeModalMock} onEmailSend={onEmailSendMock} />)

    const input = screen.getByRole('combobox')

    expect(screen.getByRole('button', { name: 'send' })).toBeDisabled()

    await user.type(input, 'test-1@gmail.com')

    await user.keyboard('{Enter}')

    await user.type(input, 'test-2@gmail.com')

    await user.keyboard('{Enter}')

    await user.click(screen.getAllByTestId('CancelIcon')[0])

    await user.click(screen.getByRole('button', { name: 'send' }))

    await waitFor(() => {
      expect(onEmailSendMock).toBeCalledWith(['test-2@gmail.com'])
    })
  })
})
