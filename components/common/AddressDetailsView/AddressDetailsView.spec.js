import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './AddressDetailsView.stories' // import all stories from the stories file

const { Common, Radio } = composeStories(stories)

const AddressCardMock = () => <div data-testid="address-card-mock" />
jest.mock('@/components/common/AddressCard/AddressCard', () => () => AddressCardMock())

const setupRadio = () => {
  const mockHandleRadioChange = jest.fn()

  render(<Radio {...Radio.args} handleRadioChange={mockHandleRadioChange} />)

  const { address1, address2, cityOrTown, stateOrProvince, postalOrZipCode } = Radio.args

  const radioName = [address1, address2, cityOrTown, stateOrProvince, postalOrZipCode].join(',')

  const radio = screen.getByRole('radio', {
    name: new RegExp(radioName),
  })

  return { radio, mockHandleRadioChange }
}

describe('[component] - AddressDetailsView', () => {
  it('should render the component without radio when radio prop is false', () => {
    render(<Common {...Common.args} />)

    expect(screen.getByTestId('address-card-mock')).toBeVisible()
  })

  it('should render the component with radio button when radio prop is true', () => {
    const { radio } = setupRadio()

    expect(radio).toBeEnabled()
  })

  it('should call handleRadioChange callback when user selects/deselects radio button', async () => {
    const user = userEvent.setup()
    const { radio, mockHandleRadioChange } = setupRadio()

    await user.click(radio)

    expect(mockHandleRadioChange).toBeCalled()
  })
})
