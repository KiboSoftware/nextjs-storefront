import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as cookienext from 'cookies-next'
import { graphql } from 'msw'
import { act } from 'react-dom/test-utils'

import { server } from '@/__mocks__/msw/server'
import { cartCouponMock, cartMock } from '@/__mocks__/stories/cartMock'
import { fulfillmentOptionsMock } from '@/__mocks__/stories/fulfillmentOptionsMock'
import { renderWithQueryClient } from '@/__test__/utils'
import * as stories from '@/components/page-templates/CartTemplate/CartTemplate.stories'
import { DialogRoot, ModalContextProvider } from '@/context'
import { useGetCart } from '@/hooks'

import type { CrCartItem } from '@/lib/gql/types'

const { Common } = composeStories(stories)
const mockCartItems = (cartMock.currentCart.items || []) as CrCartItem[]
const mockFulfillmentOptions = fulfillmentOptionsMock || []

const TestComponent = () => {
  const { data: cart } = useGetCart(cartMock.currentCart)

  return <Common isMultiShipEnabled={false} cart={cart} />
}

const setup = () => {
  const user = userEvent.setup()

  renderWithQueryClient(
    <ModalContextProvider>
      <DialogRoot />
      <TestComponent />
    </ModalContextProvider>
  )
  return {
    user,
  }
}

describe('[components] CartTemplate integration', () => {
  it('should render component', async () => {
    setup()
    const items = Common.args?.cart?.items || []
    const cartTitle = screen.getByText(/shopping-cart/i)
    const cartItemCount = screen.getAllByText(/item-quantity/i)
    const orderSummaryHeading = screen.getByText('order-summary')

    const gotToCheckout = screen.getByRole('button', {
      name: /go-to-checkout/i,
    })

    const details = mockFulfillmentOptions[0].details
    items?.map((_item, index: number) => {
      expect(screen.getAllByText(details as string)[index]).toBeVisible()
    })
    expect(cartTitle).toBeVisible()
    expect(cartItemCount[0]).toBeVisible()
    expect(orderSummaryHeading).toBeVisible()

    expect(gotToCheckout).toBeVisible()
    expect(gotToCheckout).toBeEnabled()
  })

  it('should update quantity  when click "-" button', async () => {
    const { user } = setup()

    const item = mockCartItems[0]
    const itemQty = item.quantity

    const inputs = screen.getAllByRole('textbox', { name: 'quantity' })
    expect(inputs[0]).toHaveValue(itemQty.toString())

    const minusButton = screen.getAllByRole('button', { name: 'decrease' })
    const button = minusButton[0]

    user.click(button)

    await waitFor(() => {
      const newInputs = screen.getAllByRole('textbox', { name: 'quantity' })
      expect(newInputs[0]).toHaveValue((itemQty - 1).toString())
    })
  })

  it('should update quantity  when click "+" button', async () => {
    const { user } = setup()

    const item = mockCartItems[1]
    const itemQty = item.quantity

    const inputs = screen.getAllByRole('textbox', { name: 'quantity' })
    expect(inputs[1]).toHaveValue(itemQty.toString())

    const plusButton = screen.getAllByRole('button', { name: 'increase' })
    const button = plusButton[1]

    user.click(button)

    await waitFor(() => {
      const newInputs = screen.getAllByRole('textbox', { name: 'quantity' })
      expect(newInputs[1]).toHaveValue((itemQty + 1).toString())
    })
  })

  it('should select ship to home item into the cart', async () => {
    const { user } = setup()
    const item = mockCartItems[1]
    const shipRadio = screen.getAllByRole('radio', {
      name: new RegExp(`${mockFulfillmentOptions[0].shortName}`),
    })
    item.fulfillmentMethod = 'Ship'

    user.click(shipRadio[1])
    await waitFor(() => expect(shipRadio[1]).toBeChecked())
  })

  it('should select pickup item into the cart and show store selector dialog', async () => {
    const { user } = setup()
    const pickupRadio = screen.getAllByRole('radio', {
      name: new RegExp(`${mockFulfillmentOptions[1].shortName}`),
    })

    user.click(pickupRadio[0])

    await waitFor(() => {
      const selectStore = screen.queryByRole('heading', { name: 'select-store', level: 3 })
      expect(selectStore).toBeInTheDocument()
    })
  })

  it('should select pickup radio of item in cart if global store is selected', async () => {
    cookienext.setCookie('kibo_purchase_location', 'IlJJQ0hNT05EIg==')
    const { user } = setup()
    const updatedCartItemsMock = [...mockCartItems]
    updatedCartItemsMock[0].fulfillmentMethod = 'Pickup'
    updatedCartItemsMock[0].fulfillmentLocationCode = 'Richmond'
    const pickupRadio = await screen.findAllByRole('radio', {
      name: new RegExp(`${mockFulfillmentOptions[1].shortName}`),
    })

    user.click(pickupRadio[0])
    await waitFor(() => expect(pickupRadio[0]).toBeChecked())
  })

  it('should apply a coupon when click apply button', async () => {
    server.use(
      graphql.query('cart', (_req, res, ctx) => {
        return res(ctx.data({ currentCart: cartCouponMock.updateCartCoupon }))
      }),
      graphql.query('updateCartCoupon', (_req, res, ctx) => {
        return res(ctx.data(cartCouponMock))
      })
    )
    const { user } = setup()

    const promoCode = '10OFF'
    const PromoCodeInput = screen.getByPlaceholderText('promo-code')

    const PromoCodeApply = screen.getByRole('button', {
      name: /apply/i,
    })

    await act(async () => {
      await user.type(PromoCodeInput, promoCode)
      await user.click(PromoCodeApply)
    })

    await waitFor(async () => {
      const appliedPromoCode = screen.getByText(promoCode)
      expect(appliedPromoCode).toBeVisible()
    })
  })

  it('should remove a coupon when click cross icon', async () => {
    const newCart = { ...cartCouponMock.updateCartCoupon }
    newCart.couponCodes = []

    server.use(
      graphql.query('cart', (_req, res, ctx) => {
        return res(ctx.data({ currentCart: newCart }))
      }),
      graphql.query('updateCartCoupon', (_req, res, ctx) => {
        return res(ctx.data({ updateCartCoupon: newCart }))
      })
    )
    const { user } = setup()

    const promoCode = '10OFF'

    const removeIcon = screen.getAllByLabelText('remove-promo-code')

    user.click(removeIcon[0])
    await waitFor(() => {
      const removedPromoCode = screen.queryByText(promoCode)
      expect(removedPromoCode).not.toBeInTheDocument()
    })
  })

  it('should show error message when applied an invalid coupon', async () => {
    const newCartCoupon = { ...cartCouponMock.updateCartCoupon }
    newCartCoupon.invalidCoupons = [
      {
        couponCode: '11OFF',
        reason: 'Invalid coupon code',
        createDate: '',
        discountId: 234,
        reasonCode: 43,
      },
    ]
    server.use(
      graphql.mutation('updateCartCoupon', (_req, res, ctx) => {
        return res(ctx.data({ updateCartCoupon: newCartCoupon }))
      })
    )
    const { user } = setup()
    const promoCode = '11OFF'
    const PromoCodeInput = screen.getByPlaceholderText('promo-code')

    const PromoCodeApply = screen.getByRole('button', {
      name: /apply/i,
    })

    await act(async () => {
      await user.type(PromoCodeInput, promoCode)
      await user.click(PromoCodeApply)
    })

    await waitFor(() => {
      const errorMessage = screen.getByText('Invalid coupon code')
      expect(errorMessage).toBeVisible()
    })
  })

  it('should delete cart Item  when click delete icon', async () => {
    const { user } = setup()
    const itemCount = mockCartItems.length
    const cartItem = screen.getAllByRole('group')
    expect(cartItem).toHaveLength(itemCount)
    const deleteButton = screen.getAllByRole('button', { name: 'item-delete' })
    server.use(
      graphql.query('cart', (_req, res, ctx) => {
        return res.once(
          ctx.data({
            currentCart: {
              ...cartMock.currentCart,
              items: [mockCartItems[1]],
            },
          })
        )
      })
    )

    user.click(deleteButton[0])
    expect(cartItem).toHaveLength(itemCount)
  })
})
