import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './ShippingGroupsWithMethod.stories'

import type { ShippingGroupsWithMethodProps } from './ShippingGroupsWithMethod'

const { Common } = composeStories(stories)

const productItemMock = () => <div data-testid="product-item-component-shipping-group" />
jest.mock('@/components/common/ProductItem/ProductItem', () => () => productItemMock())

const KiboSelectMock = () => <div data-testid="kibo-select-component" />
jest.mock('@/components/common/KiboSelect/KiboSelect', () => () => KiboSelectMock())

const onClickEditMock = jest.fn()

describe('[component] - ShippingGroupsWithMethod', () => {
  const user = userEvent.setup()
  const setup = (params?: ShippingGroupsWithMethodProps) => {
    const props = params ? params : Common.args
    render(<Common {...props} onClickEdit={onClickEditMock} />)
    return {
      user,
    }
  }

  it('should render component', async () => {
    const { user } = setup()

    const heading = screen.getByText(/multiple-addresses/i)
    const editLink = screen.getByRole('button', { name: 'edit' })
    const shippingMethodText = screen.getByText(/shipping-method/i)
    const subTitle = screen.getAllByText(/shipments-of/i)
    const shipTo = screen.getAllByText(/ship-to/i)
    const addressSelect = screen.getAllByTestId('kibo-select-component')
    const productItems = screen.getAllByTestId('product-item-component-shipping-group')
    const itemsCount = (Common.args?.items && Common.args?.items.length) || 0

    expect(heading).toBeVisible()
    expect(editLink).toBeVisible()
    expect(shippingMethodText).toBeVisible()
    expect(subTitle[0]).toBeVisible()
    expect(shipTo[0]).toBeVisible()
    expect(addressSelect[0]).toBeVisible()
    expect(productItems[0]).toBeInTheDocument()
    expect(productItems[0]).toBeVisible()
    expect(productItems).toHaveLength(itemsCount)
    await user.click(editLink)
    expect(onClickEditMock).toBeCalled()
  })
})
