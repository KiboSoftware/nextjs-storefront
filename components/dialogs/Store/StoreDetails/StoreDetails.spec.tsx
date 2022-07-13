import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './StoreDetails.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

const AddressCardMock = () => <div data-testid="address-card-mock" />
jest.mock('@/components/common/AddressCard/AddressCard', () => AddressCardMock)

describe('[components] Store Details', () => {
  const setup = () => {
    const user = userEvent.setup()
    render(<Common {...Common.args} />)
    return { user }
  }

  it('should render component', () => {
    setup()

    const location = Common.args

    expect(screen.getByText(location?.name || '')).toBeVisible()
    expect(screen.getByText(location?.streetAddress?.trim() || '')).toBeVisible()
    expect(screen.getByText(location?.cityState?.trim() || '')).toBeVisible()
    expect(screen.getByText(/available-for-pickup/i)).toBeVisible()
    expect(screen.getByTestId('collapsible')).toBeVisible()
    expect(screen.getByTestId('KeyboardArrowDownIcon')).toBeVisible()
    expect(screen.queryByTestId('KeyboardArrowUpIcon')).not.toBeInTheDocument()
    expect(screen.queryByText(/get-directions/i)).not.toBeInTheDocument()
  })

  it('should expand store info', async () => {
    const { user } = setup()
    const location = Common.args
    const collapsible = screen.getByTestId('collapsible')

    expect(screen.getByTestId('KeyboardArrowDownIcon')).toBeVisible()
    await user.click(collapsible)
    expect(screen.getByTestId('KeyboardArrowUpIcon')).toBeVisible()
    expect(screen.getByText(/get-directions/i)).toBeVisible()
    expect(screen.getByText(location?.phone || '')).toBeVisible()
    expect(screen.getByTestId('address-card-mock')).toBeVisible()
    expect(screen.getByText(/store-hours/i)).toBeVisible()
    Common.args?.hours?.map((hour) => {
      expect(screen.getByText(`${hour?.day}`)).toBeVisible()
      expect(screen.getAllByText(`${hour?.storeTime}`)).toHaveLength(7)
    })
    expect(screen.queryByTestId('KeyboardArrowDownIcon')).not.toBeInTheDocument()
  })

  it('should collase store info', async () => {
    const { user } = setup()

    const collapsible = screen.getByTestId('collapsible')
    expect(screen.getByTestId('KeyboardArrowDownIcon')).toBeVisible()
    await user.click(collapsible)
    expect(screen.getByTestId('KeyboardArrowUpIcon')).toBeVisible()
    await user.click(collapsible)
    expect(screen.queryByTestId('KeyboardArrowUpIcon')).not.toBeInTheDocument()
    expect(screen.queryByText(/get-directions/i)).not.toBeInTheDocument()
  })
})
