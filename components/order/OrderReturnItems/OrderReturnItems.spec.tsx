import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './OrderReturnItems.stories'

const { Common } = composeStories(stories)

const KeyValueDisplayMock = () => <div data-testid="key-value-display-component" />
jest.mock('@/components/common/KeyValueDisplay/KeyValueDisplay', () => () => KeyValueDisplayMock())

const KiboSelectMock = () => <div data-testid="kibo-select-component" />
jest.mock('@/components/common/KiboSelect/KiboSelect', () => () => KiboSelectMock())

const returnItemListMock = () => <div data-testid="return-item-list-component" />
jest.mock('@/components/common/ReturnItemList/ReturnItemList', () => () => returnItemListMock())

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn().mockReturnValue(false),
}))

describe('[component] - OrderReturnItems', () => {
  it('should render component', async () => {
    render(<Common {...Common?.args} />)
    const orderDetails = screen.getByText(/order-details/i)
    const backArrowButton = screen.getByTestId('ArrowBackIosIcon')
    const chooseItemsHeading = screen.getByText(/choose-items-to-return/i)
    const returnReasonHeading = screen.getByText(/reason-for-your-return/i)
    const kiboSelect = screen.getByTestId('kibo-select-component')
    const keyValueDisplays = screen.getAllByTestId('key-value-display-component')
    const returnItemList = screen.getAllByTestId('return-item-list-component')

    expect(orderDetails).toBeVisible()
    expect(backArrowButton).toBeVisible()
    expect(chooseItemsHeading).toBeVisible()
    expect(returnReasonHeading).toBeVisible()
    expect(kiboSelect).toBeInTheDocument()
    expect(keyValueDisplays[0]).toBeInTheDocument()
    expect(returnItemList[0]).toBeInTheDocument()
  })
})
