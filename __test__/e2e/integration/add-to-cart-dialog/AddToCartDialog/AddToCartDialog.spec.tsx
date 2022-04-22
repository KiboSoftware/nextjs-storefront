import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RouterContext } from 'next/dist/shared/lib/router-context'

import { createMockRouter } from '../../../../utils/createMockRouter'
import * as stories from '@/components/add-to-cart-dialog/AddToCartDialog/AddToCartDialog.stories' // import all stories from the stories file

import type { CartItem as CartItemType } from '@/lib/gql/types'

const { Common } = composeStories(stories)

const onCloseMock = jest.fn()

interface CartDetailsProps {
  cartItem: CartItemType
  isOpen: boolean
  isCenteredDialog: boolean
}

const cartItem: CartItemType = {
  id: '1beef214158842d7a305ae68009d4d4c',
  fulfillmentMethod: 'Ship',
  product: {
    productCode: 'MS-BTL-002',
    fulfillmentTypesSupported: ['DirectShip'],
    name: 'SoftBottle Water Bottle',
    description:
      'The taste-free Platypus Platy bottle with screw cap is an excellent option for bringing water on your backcountry adventures.<br>',
    imageUrl:
      '//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/c186f113-6150-40a2-a210-1684f25f273b',
    options: [
      {
        attributeFQN: 'Tenant~color',
        name: 'Color',
        value: 'Blue',
      },
      {
        attributeFQN: 'Tenant~size',
        name: 'Size',
        value: 'Large',
      },
    ],
    properties: [],
    sku: null,
    price: {
      price: 15,
      salePrice: null,
    },
  },
  quantity: 6,
  subtotal: 219.99,
  itemTaxTotal: 13.73,
  total: 233.72,
}

describe('[components] Add To Cart Dialog integration', () => {
  const setup = (params: CartDetailsProps) => render(<Common {...params} onClose={onCloseMock} />)

  it('should render component', async () => {
    setup({
      cartItem,
      isOpen: true,
      isCenteredDialog: false,
    })

    const item = Common.args?.cartItem
    const name = item?.product?.name || ''

    const component = screen.getByRole('dialog')
    const title = screen.getByText(/add-to-cart/i)
    const closeIconButton = screen.getByRole('button', {
      name: /close/i,
    })
    const productName = screen.getByText(name)
    const fulfillmentMethod = screen.getByText(`${item?.fulfillmentMethod}`)
    const taxSubTotalTotal = screen.getAllByText(/currency/i)
    const goToCartButton = screen.getByRole('button', {
      name: /go-to-cart/i,
    })
    const continueShoppingButton = screen.getByRole('button', {
      name: /continue-shopping/i,
    })

    expect(component).toBeVisible()
    expect(title).toBeVisible()
    expect(closeIconButton).toBeVisible()
    expect(productName).toBeInTheDocument()
    expect(fulfillmentMethod).toBeVisible()
    expect(taxSubTotalTotal).toHaveLength(4)
    expect(goToCartButton).toBeVisible()
    expect(continueShoppingButton).toBeVisible()
  })

  it('should close dialog when user clicks on closeIcon button', () => {
    setup({
      cartItem,
      isOpen: true,
      isCenteredDialog: false,
    })

    const dialog = screen.getByRole('dialog')
    const closeIconButton = screen.getByRole('button', {
      name: /close/i,
    })
    userEvent.click(closeIconButton)

    expect(dialog).toBeVisible()
    expect(closeIconButton).toBeVisible()
    expect(onCloseMock).toHaveBeenCalled()
  })

  it('should redirect to /cart page when user clicks on "Add To Cart" button', async () => {
    setup({
      cartItem,
      isOpen: true,
      isCenteredDialog: false,
    })

    const router = createMockRouter()

    render(
      <RouterContext.Provider value={router}>
        <Common />;
      </RouterContext.Provider>
    )

    const dialog = screen.getByRole('dialog')
    const goToCartButton = screen.getByRole('button', {
      name: /go\-to\-cart/i,
    })

    expect(dialog).toBeVisible()
    expect(goToCartButton).toBeVisible()

    userEvent.click(goToCartButton)

    await waitFor(() => {
      expect(router.push).toHaveBeenCalledWith('/cart')
    })
    expect(goToCartButton).not.toBeVisible()
  })

  it('should close dialog when user clicks on "Continue Shopping" button', () => {
    setup({
      cartItem,
      isOpen: true,
      isCenteredDialog: false,
    })

    const dialog = screen.getByRole('dialog')
    const continueShoppingButton = screen.getByRole('button', {
      name: /continue-shopping/i,
    })

    expect(dialog).toBeVisible()
    expect(continueShoppingButton).toBeVisible()

    userEvent.click(continueShoppingButton)

    expect(continueShoppingButton).not.toBeVisible()
  })
})
