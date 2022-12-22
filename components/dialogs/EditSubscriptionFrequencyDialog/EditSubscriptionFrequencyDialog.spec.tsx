import React from 'react'

import { InputLabel, FormControl, Select, MenuItem } from '@mui/material'
import { composeStories } from '@storybook/testing-react'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './EditSubscriptionFrequencyDialog.stories'
import { ModalContextProvider } from '@/context'

const { Common } = composeStories(stories)
const user = userEvent.setup()

jest.mock('@/components/common', () => ({
  __esModule: true,
  KiboSelect: jest.fn(({ children, onChange, value }) => (
    <div data-testid="Kibo-Select-Div">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Frequency</InputLabel>
        <Select
          labelId="KiboSelect"
          value={value}
          label="Frequency"
          onChange={(event) => onChange(event.target.name, event.target.value)}
          placeholder="select-subscription-frequency"
        >
          {children}
        </Select>
      </FormControl>
    </div>
  )),
}))

jest.mock('@/components/common/KiboDialog/KiboDialog', () => ({
  __esModule: true,
  default: ({ children, Actions }) => {
    return (
      <>
        {children}
        {Actions}
      </>
    )
  },
}))

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

  it('sholud only enable Confirm button when user selects frequency', async () => {
    setup()

    const confirmButtton = screen.getByRole('button', {
      name: /confirm/i,
    })
    expect(confirmButtton).toBeVisible()
    expect(confirmButtton).toBeDisabled()

    // Act
    const kiboSelectBtn = screen.getByRole('button', {
      name: /​/i,
    })
    await user.click(kiboSelectBtn)

    const listbox = await screen.findByRole('listbox')
    await user.click(within(listbox).getByRole('option', { name: '45 Days' }))

    //Assert
    expect(confirmButtton).toBeEnabled()
  })

  it('should save frequency and display SnackBar when user selects frequency and clicks on Confirm button', async () => {
    setup()

    // Select Frequency
    const kiboSelectBtn = screen.getByRole('button', {
      name: /​/i,
    })
    await user.click(kiboSelectBtn)

    const listbox = await screen.findByRole('listbox')
    await user.click(within(listbox).getByRole('option', { name: '45 Days' }))

    // Click on Confrim button
    const confirmlButton = screen.getByRole('button', {
      name: /confirm/i,
    })

    expect(confirmlButton).toBeVisible()
    expect(confirmlButton).toBeEnabled()
    user.click(confirmlButton)

    //TODO
    // 1. Mock the handler and verify the response
    // 2. Check whether SnackBar is displayed or not
  })

  it('should close modal when user clicks on Cancel button', () => {
    const cancelButton = screen.getByRole('button', {
      name: /cancel/i,
    })
    expect(cancelButton).toBeVisible()

    //TODO
    // 1. Verify that Dialog is closed
  })
})
