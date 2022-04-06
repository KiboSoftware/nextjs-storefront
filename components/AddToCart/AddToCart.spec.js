import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './AddToCart.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

const onClose = jest.fn()

jest.mock('@storybook/client-api', () => {
  return {
    useArgs: jest.fn(() => {
      const open = true
      const updateArgs = jest.fn()
      return [{ open }, updateArgs]
    }),
  }
})

describe('[components] Add To Cart Component', () => {
  describe('Default Add To Cart', () => {
    const setup = () => render(<Common onClose={onClose} {...Common.args} />)

    it('should render fullfillmentOption', () => {
      setup()

      const fullfillmentOption = screen.getByText(Common.args.fullfillmentOption)

      expect(fullfillmentOption).toBeVisible()
    })

    it('should render subtotal', () => {
      setup()

      const subtotal = screen.getByText(`$${Common.args.subtotal}`)

      expect(subtotal).toBeVisible()
    })

    it('should render tax', () => {
      setup()

      const tax = screen.getByText(`$${Common.args.tax}`)

      expect(tax).toBeVisible()
    })

    it('should render total', () => {
      setup()

      const total = screen.getByText(`$${Common.args.total}`)

      expect(total).toBeVisible()
    })
  })
})
