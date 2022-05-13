/** @format */

import React from 'react'

import '@testing-library/jest-dom/extend-expect'
import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './PromoCodeBadge.stories' // import all stories from the stories file

const { PromocodeBadgeComponent, PromocodeBadge } = composeStories(stories)

describe('PromoCode Component', () => {
  it('should render PromoCode text', () => {
    render(<PromocodeBadgeComponent {...PromocodeBadgeComponent.args} />)
    const PromoCode = screen.getByRole('textbox')

    expect(PromoCode).toBeVisible()
  })

  it('should render PromoCode apply button', () => {
    render(<PromocodeBadgeComponent {...PromocodeBadgeComponent.args} />)
    const PromoCodeApply = screen.getByRole('button', {
      name: /apply/i,
    })
    expect(PromoCodeApply).toBeVisible()
  })

  it('should render promocode badge', () => {
    render(<PromocodeBadge {...PromocodeBadge.args} />)
    const PromoCode = screen.getByText(PromocodeBadge.args.promoCode)
    expect(PromoCode).toBeVisible()
  })

  it('should disable button', () => {
    render(<PromocodeBadgeComponent />)
    const ApplyButton = screen.getByTestId('promo-button')
    expect(ApplyButton).toHaveClass('Mui-disabled')
  })
})
