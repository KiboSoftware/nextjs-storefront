import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './EditOrderDateDialog.stories'
import { ModalContextProvider } from '@/context'

const { Common } = composeStories(stories)
const user = userEvent.setup()

// Types
interface KiboDialogProps {
  Content: React.ReactNode
  Actions: React.ReactNode
}

// Mocks
jest.mock('@/components/common/KiboDialog/KiboDialog', () => ({
  __esModule: true,
  default: ({ Content, Actions }: KiboDialogProps) => {
    return (
      <>
        {Content}
        {Actions}
      </>
    )
  },
}))

const setup = () => {
  const onOrderDateUpdateMock = jest.fn()
  const onCloseMock = jest.fn()

  render(
    <Common {...Common.args} onOrderDateUpdate={onOrderDateUpdateMock} onClose={onCloseMock} />,
    {
      wrapper: ModalContextProvider,
    }
  )

  return {
    onOrderDateUpdateMock,
    onCloseMock,
  }
}

describe('[component]', () => {
  it('should render component', () => {
    setup()

    // Arrange
    const orderDateInput = screen.getByRole('textbox')
    const message = screen.getByText(/date-must-be-in-the-future/i)
    const cancelButton = screen.getByRole('button', { name: /cancel/i })
    const confirmButton = screen.getByRole('button', { name: /confirm/i })

    // Assert
    expect(orderDateInput).toBeVisible()
    expect(message).toBeVisible()
    expect(cancelButton).toBeVisible()
    expect(confirmButton).toBeVisible()
  })

  describe('validations', () => {
    it('should display required fild validation when user do not enter date', async () => {
      setup()

      // Arrange
      const orderDateInput = screen.getByRole('textbox')

      // Act
      await user.clear(orderDateInput)

      // Assert
      const message = screen.getByText(/order-date-is-required/i)
      expect(message).toBeVisible()
    })

    it('should display invalid date message when user enters invalid date', async () => {
      setup()

      // Arrange
      const orderDateInput = screen.getByRole('textbox')

      // Act
      await user.clear(orderDateInput)
      await user.type(orderDateInput, '01/01/01')

      // Assert
      const message = screen.getByText(/order-date-must-be-valid/i)
      expect(message).toBeVisible()
    })

    it('should display date must be in the future message when user enters todays or past date', async () => {
      setup()

      // Arrange
      const orderDateInput = screen.getByRole('textbox')

      // Act
      await user.clear(orderDateInput)
      await user.type(orderDateInput, '01/01/2023')

      // Assert
      const message = screen.getByText(/date-must-be-in-the-future/i)
      expect(message).toBeVisible()
    })

    it('should enable Confirm button only when user enters valid future date', async () => {
      setup()

      // Arrange
      const orderDateInput = screen.getByRole('textbox')
      const confirmButton = screen.getByRole('button', { name: /confirm/i })

      // Act
      await user.clear(orderDateInput) // no date
      expect(confirmButton).toBeDisabled()

      await user.type(orderDateInput, '01/01/01') // invalid date
      expect(confirmButton).toBeDisabled()

      await user.clear(orderDateInput)
      await user.type(orderDateInput, '01/01/2023') // valid past date
      expect(confirmButton).toBeDisabled()

      await user.clear(orderDateInput)
      await user.type(orderDateInput, '01/01/2030') // valid future date
      expect(confirmButton).toBeEnabled()
    })
  })

  it('should call callback function when user enters valid date and clicks on Confirm button', async () => {
    const { onOrderDateUpdateMock } = setup()

    // Arrange
    const orderDateInput = screen.getByRole('textbox')
    const confirmButton = screen.getByRole('button', { name: /confirm/i })

    // Act
    await user.clear(orderDateInput)
    await user.type(orderDateInput, '01/01/2030') // valid future date
    expect(confirmButton).toBeEnabled()
    await user.click(confirmButton)

    // Assert
    expect(onOrderDateUpdateMock).toHaveBeenCalledTimes(1)
    expect(onOrderDateUpdateMock).toBeCalledWith('1', '01/01/2030')
  })

  it('should call callback function when user clicks on Cancel button', async () => {
    const { onCloseMock } = setup()

    // Arrange
    const cancelButton = screen.getByRole('button', { name: /cancel/i })

    // Act
    await user.click(cancelButton)

    // Assert
    expect(onCloseMock).toHaveBeenCalledTimes(1)
  })
})
