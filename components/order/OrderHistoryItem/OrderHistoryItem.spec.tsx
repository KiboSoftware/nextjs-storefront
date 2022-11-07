import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './OrderHistoryItem.stories' // import all stories from the stories file

import type { OrderHistoryItemProps } from './OrderHistoryItem'
const { Common } = composeStories(stories)

const priceMock = () => <div data-testid="price-mock" />
const FullWidthDividerMock = () => <div data-testid="full-width-divider-mock"></div>

jest.mock('@/components/common/Price/Price', () => () => priceMock())
jest.mock(
  '@/components/common/FullWidthDivider/FullWidthDivider',
  () => () => FullWidthDividerMock()
)

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn().mockReturnValue(false),
}))

describe('[component] - OrderHistoryItem', () => {
  const { id, submittedDate, productNames, orderStatus } = Common?.args as OrderHistoryItemProps

  const setup = () => {
    const onHistoryItemClickMock = jest.fn()
    const user = userEvent.setup()
    render(<Common {...Common?.args} onHistoryItemClick={onHistoryItemClickMock} />)
    return { onHistoryItemClickMock, user }
  }

  it('should render component', () => {
    setup()

    const submittedDateText = screen.getByText(submittedDate)
    const productNamesText = screen.getByText(productNames)
    const orderTotalText = screen.getByTestId('price-mock')
    const orderStatusText = screen.getByText(orderStatus)
    const fullWidthDividerMock = screen.getAllByTestId('full-width-divider-mock')

    expect(submittedDateText).toBeVisible()
    expect(productNamesText).toBeVisible()
    expect(orderTotalText).toBeVisible()
    expect(orderStatusText).toBeVisible()
    expect(fullWidthDividerMock.length).toBeGreaterThan(0)
  })

  it('should call onHistoryItemClick callback function when user clicks on HistoryItem', async () => {
    const { onHistoryItemClickMock, user } = setup()

    const historyItem = screen.getByTestId('history-item')
    await user.click(historyItem)

    expect(onHistoryItemClickMock).toHaveBeenCalledWith(id)
  })
})
