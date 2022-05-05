/** @format */

import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './PromoCode.stories' // import all stories from the stories file

const { PromocodeComponent: PromoCodeComponent } = composeStories(stories)

describe('PromoCode Component', () => {
  it('should render PromoCode button text', () => {
    render(<PromoCodeComponent />)
    const PromoCode = screen.getByText('Apply')
    expect(PromoCode).toBeVisible()
  })

  it('should render PromoCode inputfield text', () => {
    render(<PromoCodeComponent />)
    const PromoCode = screen.getAllByText('Enter Promo code')
    expect(PromoCode).toBe(PromoCode)
  })
})
