import React from 'react'

import { Iron } from '@mui/icons-material'
import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './EditSubscriptionFrequencyDialog.stories'
import { ModalContextProvider } from '@/context'

const { Common } = composeStories(stories)
const user = userEvent.setup()

jest.mock('@/components/common', () => ({
  __esModule: true,
  KiboSelect: jest.fn(({ children, onChange, value }) => (
    <div data-testid="Kibo-Select-Div">
      <select
        name="KiboSelect"
        id="KiboSelect"
        onChange={onChange}
        placeholder="new Placeholder"
        value={value}
      >
        <option value="15 Days">15 Days</option>
        <option value="100 Days" selected>
          100 Days
        </option>
      </select>
    </div>
  )),
}))

// jest.mock('@/components/common/KiboDialog/KiboDialog', () => ({children}) => (
//  {children}
//   <div data-testid="kibo-dialog-mock">
//     <button type="button" onClick={}>
//       cancel
//     </button>
//     <button type="button" onClick={}>
//       confirm
//     </button>
//   </div>
// ))

describe('[components] EditSubscriptionFrequencyDialog', () => {
  const setup = () => {
    return render(<Common {...Common.args} />, {
      wrapper: ModalContextProvider,
    })
  }

  it('should render component', async () => {
    setup()

    const kiboSelectMock = screen.getByRole('combobox')
    const heading = screen.getByRole('heading')

    const cancelButton = screen.getByRole('button', {
      name: /cancel/i,
    })
    const confirmButtton = screen.getByRole('button', {
      name: /confirm/i,
    })

    // Assertions
    expect(kiboSelectMock).toBeVisible()
    expect(heading).toHaveTextContent(/edit-subscription-frequency/i)
    Common.args?.values?.map((value) => {
      const frequency = screen.getByText(`${value.stringValue}`)
      expect(frequency).toBeVisible()
    })

    expect(cancelButton).toBeVisible()
    expect(confirmButtton).toBeVisible()
    expect(confirmButtton).toBeDisabled()
  })

  it.only('sholud only enable Confirm button when user selects frequency', async () => {
    setup()

    const confirmButtton = screen.getByRole('button', {
      name: /confirm/i,
    })
    expect(confirmButtton).toBeVisible()
    expect(confirmButtton).toBeDisabled()

    // Act
    await user.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: '100 Days' })
    )

    // Assert
    // const selectedOption = screen.getByRole('option', { name: '100 Days' }).selected
    // expect(selectedOption).toBe(true)

    // expect(confirmButtton).toBeEnabled()
  })

  it('should save frequency when user selects frequency and clicks on Confirm button', () => {
    //Need to complete
  })
})
