import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './FulfillmentOptions.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

describe('[components] Fulfillment Options Component', () => {
  const setup = () => {
    const user = userEvent.setup()
    const mockOnStoreSelectClick = jest.fn()
    const mockOnFullfillmentOptionChange = jest.fn()
    render(
      <Common
        {...Common.args}
        onStoreSelection={mockOnStoreSelectClick}
        onFullfillmentOptionChange={mockOnFullfillmentOptionChange}
      />
    )

    return {
      user,
      mockOnStoreSelectClick,
      mockOnFullfillmentOptionChange,
    }
  }

  it('should render component', () => {
    setup()

    const radioLabels = screen.getAllByRole('radio')
    const shipLabel = screen.getByText(Common.args.fulfillmentOptions[0].label)
    const pickupLabel = screen.getByText(Common.args.fulfillmentOptions[1].label)

    const shipDetails = screen.getByText(Common.args.fulfillmentOptions[0].details)
    const pickupDetails = screen.getByText(Common.args.fulfillmentOptions[1].details)

    const changeStoreTexts = screen.getAllByText(/Change-Store/i)
    const selectStoreTexts = screen.queryAllByText(/Select-Store/i)

    expect(radioLabels.length).toBe(2)
    expect(shipLabel).toBeVisible()
    expect(pickupLabel).toBeVisible()
    expect(shipDetails).toBeVisible()
    expect(pickupDetails).toBeVisible()
    expect(changeStoreTexts).toHaveLength(2)
    expect(selectStoreTexts).toStrictEqual([])
  })

  it('should call onStoreSelection if change store or select store is clicked', async () => {
    const { user, mockOnStoreSelectClick } = setup()

    await user.click(screen.getAllByText(/Change-Store/i)[0])

    expect(mockOnStoreSelectClick).toBeCalled()
  })

  it('should call onFullfillmentOptionChange if radio option selection is changed', async () => {
    const { user, mockOnFullfillmentOptionChange } = setup()

    const radio = screen.getByRole('radio', {
      name: /ship to home/i,
    })

    await user.click(radio)

    expect(mockOnFullfillmentOptionChange).toBeCalled()
  })
})
