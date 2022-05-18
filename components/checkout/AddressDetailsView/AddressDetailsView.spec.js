import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './AddressDetailsView.stories' // import all stories from the stories file

const { Common, Radio } = composeStories(stories)

const AddressCardMock = () => <div data-testid="address-card-mock" />
jest.mock('@/components/common/AddressCard/AddressCard', () => AddressCardMock)

const KiboRadioMock = () => <div data-testid="kibo-radio-mock" />
jest.mock('@/components/common/KiboRadio/KiboRadio', () => KiboRadioMock)

describe('[component] - AddressDetailsView', () => {
  it('should render the component without radio when radio prop is false', () => {
    render(<Common {...Common.args} />)

    expect(screen.getByTestId('address-card-mock')).toBeVisible()
  })

  it('should render the component with radio button when radio prop is true', () => {
    render(<Radio {...Radio.args} />)

    expect(screen.getByTestId('kibo-radio-mock')).toBeVisible()
  })
})
