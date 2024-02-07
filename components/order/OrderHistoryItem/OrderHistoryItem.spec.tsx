import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './OrderHistoryItem.stories' // import all stories from the stories file
import { renderWithQueryClient } from '@/__test__/utils'
import { generateQueryClient } from '@/lib/react-query/queryClient'

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

  beforeEach(() => {
    jest.clearAllMocks()
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  const onHistoryItemClickMock = jest.fn()
  const showSnackbarMock = jest.fn()

  const generateTestQueryClient = () => {
    const client = generateQueryClient(showSnackbarMock)
    const options = client.getDefaultOptions()
    options.queries = { ...options.queries, retry: false }

    return client
  }

  const setup = () => {
    const user = userEvent.setup()
    renderWithQueryClient(
      <Common {...Common?.args} onHistoryItemClick={onHistoryItemClickMock} />,
      generateTestQueryClient()
    )
    return { user }
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

  it('should call onHistoryItemClick callback function when user clicks on right arrow icon', async () => {
    const { user } = setup()

    const navigator = screen.getByTestId('order-history-details-navigator')
    await user.click(navigator)

    expect(onHistoryItemClickMock).toHaveBeenCalledWith(id)
  })

  it('should add order items to cart when user clicks on reorder button', async () => {
    const { user } = setup()

    const reorderButton = screen.getByRole('button', { name: 'Reorder' })
    await user.click(reorderButton)

    // await waitFor(() => {
    //   expect(screen.getByText('list-added-to-cart')).toBeVisible()
    // })

    // const snackbar = within(await screen.findByRole('alert'))
    // expect(snackbar.getByText('Hello there')).toBeInTheDocument()

    // await waitFor(() => {
    //   expect(showSnackbarMock).toBeCalled()
    // })
  })
})
