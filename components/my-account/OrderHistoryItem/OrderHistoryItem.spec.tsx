import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './OrderHistoryItem.stories' // import all stories from the stories file
import { orderGetters } from '@/lib/getters'

import type { Order } from '@/lib/gql/types'

const { Common } = composeStories(stories)

describe('[component] - OrderHistoryItem', () => {
  it('should render component', () => {
    render(<Common {...Common?.args} />)

    const order = (Common && Common.args && Common.args.order) as Order
    const { submittedDate, productNames, orderStatus } = orderGetters.getOrderDetails(order)

    const submittedDateText = screen.getByText(submittedDate)
    const productNamesText = screen.getByText(productNames as string)
    const orderTotalText = screen.getByText('currency')
    const orderStatusText = screen.getByText(orderStatus as string)

    expect(submittedDateText).toBeVisible()
    expect(productNamesText).toBeVisible()
    expect(orderTotalText).toBeVisible()
    expect(orderStatusText).toBeVisible()
  })
})
