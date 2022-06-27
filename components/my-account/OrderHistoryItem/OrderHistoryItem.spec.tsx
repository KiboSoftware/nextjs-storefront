import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './OrderHistoryItem.stories' // import all stories from the stories file

import type { OrderHistoryItemProps } from './OrderHistoryItem'
const { Common } = composeStories(stories)

const priceMock = () => <div data-testid="price-mock" />
jest.mock('@/components/common/Price/Price', () => priceMock)

describe('[component] - OrderHistoryItem', () => {
  const { id, submittedDate, productNames, orderStatus } = Common?.args as OrderHistoryItemProps

  const setup = () => {
    const onHistoryItemClickMock = jest.fn()
    render(<Common {...Common?.args} onHistoryItemClick={onHistoryItemClickMock} />)
    return { onHistoryItemClickMock }
  }

  it('should render component', () => {
    setup()

    const submittedDateText = screen.getByText(submittedDate as string)
    const productNamesText = screen.getByText(productNames as string)
    const orderTotalText = screen.getByTestId('price-mock')
    const orderStatusText = screen.getByText(orderStatus as string)

    expect(submittedDateText).toBeVisible()
    expect(productNamesText).toBeVisible()
    expect(orderTotalText).toBeVisible()
    expect(orderStatusText).toBeVisible()
  })

  it('should call onHistoryItemClick callback function when user clicks on HistoryItem', () => {
    const { onHistoryItemClickMock } = setup()

    const historyItem = screen.getByTestId('history-item')
    userEvent.click(historyItem)

    expect(onHistoryItemClickMock).toHaveBeenCalledWith(id)
  })
})
