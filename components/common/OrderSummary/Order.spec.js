/** @format */

import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './Order.stories' // import all stories from the stories file
const { Checkout, Shipping } = composeStories(stories)

describe('checkout Component', () => {
  describe('checkout', () => {
    it('should render checkout text', () => {
      render(<Checkout {...Checkout.args} />)
      const checkout = screen.getByText(Checkout.args.name)
      expect(checkout).toBeVisible()
    })
  })

  describe('checkout cart', () => {
    describe('checkout cartTotal', () => {
      it('should render checkout cartTotal', () => {
        render(<Checkout {...Checkout.args} />)
        const checkout = screen.getByText(Checkout.args.cartTotal)
        expect(checkout).toBeVisible()
      })
    })
  })

  describe('checkout standardShippingAmount', () => {
    describe('checkout standardShippingAmount', () => {
      it('should render checkout standardShippingAmount', () => {
        render(<Checkout {...Checkout.args} />)
        const checkout = screen.getByText(Checkout.args.standardShippingAmount)
        expect(checkout).toBeVisible()
      })
    })
  })

  describe('checkout estTaxamt', () => {
    describe('checkout estTaxamt', () => {
      it('should render checkout estTaxamt', () => {
        render(<Checkout {...Checkout.args} />)
        const checkout = screen.getByText(Checkout.args.estTaxamt)
        expect(checkout).toBeVisible()
      })
    })
  })

  describe('checkout estTax', () => {
    describe('checkout estTax', () => {
      it('should render checkout estTax', () => {
        render(<Checkout {...Checkout.args} />)
        const checkout = screen.getByText(Checkout.args.estTax)
        expect(checkout).toBeVisible()
      })
    })
  })

  describe('checkout orderTotal', () => {
    describe('checkout orderTotal', () => {
      it('should render checkout orderTotal', () => {
        render(<Checkout {...Checkout.args} />)
        const checkout = screen.getByText(Checkout.args.orderTotal)
        expect(checkout).toBeVisible()
      })
    })
  })

  describe('checkout subTotal', () => {
    describe('checkout subTotal', () => {
      it('should render checkout subTotal', () => {
        render(<Checkout {...Checkout.args} />)
        const checkout = screen.getByText(Checkout.args.subTotal)
        expect(checkout).toBeVisible()
      })
    })
  })

  describe('checkout estOrderTotal', () => {
    describe('checkout estOrderTotal', () => {
      it('should render checkout estOrderTotal', () => {
        render(<Checkout {...Checkout.args} />)
        const checkout = screen.getByText(Checkout.args.estOrderTotal)
        expect(checkout).toBeVisible()
      })
    })
  })
})

describe('shipping Component', () => {
    describe('shipping', () => {
      it('should render shipping text', () => {
        render(<Shipping {...Shipping.args} />)
        const shipping = screen.getByText(Shipping.args.name)
        expect(shipping).toBeVisible()
      })
    })
  
    describe('shipping cart', () => {
      describe('shipping cartTotal', () => {
        it('should render shipping cartTotal', () => {
          render(<Shipping {...Shipping.args} />)
          const shipping = screen.getByText(Shipping.args.cartTotal)
          expect(shipping).toBeVisible()
        })
      })
    })
  
    describe('shipping standardShippingAmount', () => {
      describe('shipping standardShippingAmount', () => {
        it('should render shipping standardShippingAmount', () => {
          render(<Shipping {...Shipping.args} />)
          const shipping = screen.getByText(Shipping.args.standardShippingAmount)
          expect(shipping).toBeVisible()
        })
      })
    })
  
    describe('shipping estTaxamt', () => {
      describe('shipping estTaxamt', () => {
        it('should render shipping estTaxamt', () => {
          render(<Shipping {...Shipping.args} />)
          const shipping = screen.getByText(Shipping.args.estTaxamt)
          expect(shipping).toBeVisible()
        })
      })
    })
  
    describe('shipping estTax', () => {
      describe('shipping estTax', () => {
        it('should render shipping estTax', () => {
          render(<Shipping {...Shipping.args} />)
          const shipping = screen.getByText(Shipping.args.estTax)
          expect(shipping).toBeVisible()
        })
      })
    })
  
    describe('shipping orderTotal', () => {
      describe('shipping orderTotal', () => {
        it('should render shipping orderTotal', () => {
          render(<Shipping {...Shipping.args} />)
          const shipping = screen.getByText(Shipping.args.orderTotal)
          expect(shipping).toBeVisible()
        })
      })
    })
  
    describe('shipping subTotal', () => {
      describe('shipping subTotal', () => {
        it('should render shipping subTotal', () => {
          render(<Shipping {...Shipping.args} />)
          const shipping = screen.getByText(Shipping.args.subTotal)
          expect(shipping).toBeVisible()
        })
      })
    })
  
    describe('shipping estOrderTotal', () => {
      describe('shipping estOrderTotal', () => {
        it('should render shipping estOrderTotal', () => {
          render(<Shipping {...Shipping.args} />)
          const shipping = screen.getByText(Shipping.args.estOrderTotal)
          expect(shipping).toBeVisible()
        })
      })
    })
  })
