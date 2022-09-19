import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { userAddressResponse } from '@/__mocks__/stories/userAddressMock'
import * as stories from '@/components/common/AddressList/AddressList.stories'
import { userGetters } from '@/lib/getters'

const { Common, Radio, WithoutRadio } = composeStories(stories)
const userShippingAddress = userGetters.getUserShippingAddress(userAddressResponse?.items)

const onAddressSelectionMock = jest.fn()
const setup = (params) => {
  const user = userEvent.setup()
  const props = params ? params : Common.args

  render(<Common {...props} onAddressSelection={onAddressSelectionMock} />)
  return {
    user,
  }
}

describe('[component] - AddressList', () => {
  const addressCount = userShippingAddress?.length
  it('should render the component without radio when radio prop is false', () => {
    setup(WithoutRadio.args)
    const addressCard = screen.getAllByTestId('address-card')
    const heading = screen.getByText(WithoutRadio.args.heading)
    expect(heading).toBeVisible()
    expect(addressCard[0]).toBeVisible()
    expect(addressCard).toHaveLength(addressCount)
  })

  it('should render the component with radio button when radio prop is true', () => {
    setup(Radio.args)
    const heading = screen.getByText(Radio.args.heading)
    const subHeading = screen.getByText(Radio.args.subHeading)
    const addressList = screen.getAllByRole('radio')

    expect(heading).toBeVisible()
    expect(subHeading).toBeVisible()
    expect(addressList[0]).toBeInTheDocument()
    expect(addressList).toHaveLength(addressCount)
  })

  it('should handle address option selection', async () => {
    const { user } = setup(Radio.args)

    const radio = screen.getAllByRole('radio')

    await user.click(radio[0])
    expect(radio[0]).toBeChecked()
    expect(onAddressSelectionMock).toBeCalled()
  })
})
