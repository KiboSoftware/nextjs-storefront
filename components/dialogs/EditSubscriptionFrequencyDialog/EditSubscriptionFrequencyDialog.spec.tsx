import React from 'react'

import { InputLabel, FormControl, Select } from '@mui/material'
import { composeStories } from '@storybook/testing-react'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './EditSubscriptionFrequencyDialog.stories'
import { ModalContextProvider } from '@/context'

const { Common } = composeStories(stories)
const user = userEvent.setup()

interface KiboSelectProps {
  children: React.ReactNode
  onChange: (name: string, value: string) => void
  value: string
}

interface KiboDialogProps {
  Content: React.ReactNode
  Actions: React.ReactNode
}

jest.mock('@/components/common/KiboSelect/KiboSelect', () => ({
  __esModule: true,
  default: ({ children, onChange, value }: KiboSelectProps) => (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Frequency Mocked</InputLabel>
      <Select
        data-testid="KiboSelect"
        labelId="KiboSelect"
        value={value}
        label="Frequency"
        onChange={(event) => onChange(event.target.name, event.target.value)}
        placeholder="select-subscription-frequency"
      >
        {children}
      </Select>
    </FormControl>
  ),
}))

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

describe('[components] EditSubscriptionFrequencyDialog', () => {
  const onFrequencySaveMock = jest.fn()
  const onCloseMock = jest.fn()

  const setup = () => {
    render(
      <Common {...Common.args} onFrequencySave={onFrequencySaveMock} onClose={onCloseMock} />,
      {
        wrapper: ModalContextProvider,
      }
    )

    return {
      onFrequencySaveMock,
      onCloseMock,
    }
  }

  it('should render component', async () => {
    setup()

    const kiboSelectMock = screen.getByRole('button', { expanded: false })
    const cancelButton = screen.getByRole('button', {
      name: /cancel/i,
    })
    const confirmButton = screen.getByRole('button', {
      name: /confirm/i,
    })

    // Assertions
    expect(kiboSelectMock).toBeVisible()

    await user.click(kiboSelectMock)
    Common.args?.values?.map((value) => {
      const frequency = screen.getByText(`${value.stringValue}`)
      expect(frequency).toBeVisible()
    })

    expect(cancelButton).toBeVisible()
    expect(confirmButton).toBeVisible()
    expect(confirmButton).toBeDisabled()
  })

  it('should only enable Confirm button when user selects frequency', async () => {
    setup()

    const confirmButton = screen.getByRole('button', {
      name: /confirm/i,
    })
    expect(confirmButton).toBeVisible()
    expect(confirmButton).toBeDisabled()

    // Act
    const kiboSelectBtn = screen.getByRole('button', {
      name: /​/i,
    })
    await user.click(kiboSelectBtn)

    const listbox = await screen.findByRole('listbox')
    await user.click(within(listbox).getByRole('option', { name: '45 Days' }))

    //Assert
    expect(confirmButton).toBeEnabled()
  })

  it('should call callback function when user selects frequency and clicks on Confirm button', async () => {
    const { onFrequencySaveMock } = setup()

    // Select Frequency
    const kiboSelectBtn = screen.getByRole('button', {
      name: /​/i,
    })
    await user.click(kiboSelectBtn)

    const listbox = await screen.findByRole('listbox')
    await user.click(within(listbox).getByRole('option', { name: '45 Days' }))

    // Click on Confirm button
    const confirmButton = screen.getByRole('button', {
      name: /confirm/i,
    })

    expect(confirmButton).toBeVisible()
    expect(confirmButton).toBeEnabled()
    await user.click(confirmButton)

    expect(onFrequencySaveMock).toHaveBeenCalledWith({
      subscriptionId: '1',
      frequencyInput: {
        value: 45,
        unit: 'Day',
      },
    })
  })

  it('should close modal when user clicks on Cancel button', async () => {
    const { onCloseMock } = setup()

    const cancelButton = screen.getByRole('button', {
      name: /cancel/i,
    })
    expect(cancelButton).toBeVisible()
    await user.click(cancelButton)

    expect(onCloseMock).toHaveBeenCalledTimes(1)
  })
})
