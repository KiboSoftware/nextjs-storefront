import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './AddressList.stories' // import all stories from the stories file
import { userAddressResponse } from '@/__mocks__/stories/userAddressMock'
import { userGetters } from '@/lib/getters'

const { Common, Radio } = composeStories(stories)

const KiboAddressListMock = () => <div data-testid="address-card-list-mock" />
jest.mock('@/components/common/AddressCard/AddressCard', () => () => KiboAddressListMock())

const KiboRadioAddressListMock = () => <div data-testid="address-card-list-radio-mock" />
jest.mock('@/components/common/KiboRadio/KiboRadio', () => () => KiboRadioAddressListMock())
const userShippingAddress = userGetters.getUserShippingAddress(userAddressResponse?.items)

describe('[component] - AddressList', () => {
  const addressCount = userShippingAddress?.length
  it('should render the component without radio when radio prop is false', () => {
    render(<Common {...Common.args} />)
    const addressList = screen.getAllByTestId('address-card-list-mock')
    expect(addressList[0]).toBeVisible()
    expect(addressList).toHaveLength(addressCount)
  })

  it('should render the component with radio button when radio prop is true', () => {
    render(<Radio {...Radio.args} />)
    const addressListRadio = screen.getAllByTestId('address-card-list-radio-mock')
    expect(addressListRadio[0]).toBeVisible()
    expect(addressListRadio).toHaveLength(addressCount)
  })
})
