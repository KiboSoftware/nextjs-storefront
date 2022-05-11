import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './PaymentCardDetailsView.stories' // import all stories from the stories file

const { Common, Radio } = composeStories(stories)

const KiboRadioMock = () => <div data-testid="kibo-radio-mock" />
jest.mock('@/components/common/KiboRadio/KiboRadio', () => KiboRadioMock)

const PaymentCardMock = () => <div data-testid="payment-card-mock" />
jest.mock('@/components/common/PaymentCard/PaymentCard', () => PaymentCardMock)

describe('[component] - PaymentCardDetailsView', () => {
  it('should render radio button if radio prop is true', () => {
    render(<Radio {...Radio.args} />)

    expect(screen.getByTestId('kibo-radio-mock')).toBeVisible()
  })

  it('should render component if radio is false', () => {
    render(<Common {...Common.args} />)

    expect(screen.getByTestId('payment-card-mock')).toBeVisible()
  })
})
