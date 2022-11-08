import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './OrderReturnItemsDialog.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

const productItemListMock = () => <div data-testid="product-item-list-component" />
jest.mock('@/components/common/ProductItemList/ProductItemList', () => () => productItemListMock())

describe('[components] (OrderReturnItemsDialog)', () => {
  const setup = () => render(<Common {...Common.args} />)

  it('should render component', async () => {
    setup()
    const title = screen.getByText(/return-request-submitted/i)
    const returnReason = screen.getByText(/reason-for-your-return/i)
    const closeIcon = screen.getByRole('button', { name: 'close' })
    const productItemList = screen.getByTestId('product-item-list-component')

    expect(title).toBeVisible()
    expect(returnReason).toBeVisible()
    expect(closeIcon).toBeVisible()
    expect(productItemList).toBeVisible()
  })
})
