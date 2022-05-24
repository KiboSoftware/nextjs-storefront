/** @format */

import React from 'react'

import '@testing-library/jest-dom/extend-expect'
import { composeStories } from '@storybook/testing-react'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

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

  it('should enable button', () => {
    render(<PromocodeBadgeComponent {...PromocodeBadgeComponent.args} />)
    const PromoCode = screen.getByRole('textbox')
    fireEvent.change(PromoCode, { target: { value: 'SAVE50' } })
    const ApplyButton = screen.getByTestId('promo-button')
    expect(ApplyButton).not.toHaveClass('Mui-disabled')
  })

  it('should render remove button', () => {
    render(<PromocodeBadgeComponent {...PromocodeBadgeComponent.args} />)
    const removeButton = screen.getByRole('button')
    expect(removeButton).toBeVisible()
  })

  it('should render ApplyPromocode button', () => {
    render(<PromocodeBadgeComponent {...PromocodeBadgeComponent.args} />)
    const ApplyPromocode = screen.getByTestId('promo-button')
    expect(ApplyPromocode).toBeVisible()
  })

  it('Test the Apply Button is visible', () => {
    render(<PromocodeBadgeComponent {...PromocodeBadgeComponent.args} />)
    const PromoCodeApply = screen.getByRole('button', {
      name: /apply/i,
    })
    expect(PromoCodeApply).toBeVisible()
  })

  it('Test the promocode textBox is visible', () => {
    render(<PromocodeBadgeComponent {...PromocodeBadgeComponent.args} />)
    const PromoCode = screen.getByRole('textbox')
    expect(PromoCode).toBeVisible()
  })

  it('Test the Apply Button is disable at default', () => {
    render(<PromocodeBadgeComponent {...PromocodeBadgeComponent.args} />)
    const ApplyButton = screen.getByTestId('promo-button')
    expect(ApplyButton).toHaveClass('Mui-disabled')
  })

  it('should enable Apply button when a user enters Promo code', () => {
    render(<PromocodeBadgeComponent {...PromocodeBadgeComponent.args} />)
    const PromoCode = screen.getByRole('textbox')
    fireEvent.change(PromoCode, { target: { value: 'SAVE50' } })
    const ApplyButton = screen.getByTestId('promo-button')
    expect(ApplyButton).not.toHaveClass('Mui-disabled')
  })

  it('should disable Apply button when a user enters Promo code and apply it', () => {
    render(<PromocodeBadgeComponent {...PromocodeBadgeComponent.args} />)
    const PromoCode = screen.getByRole('textbox')
    const PromoCodebutton = screen.getByRole('button', { name: /apply/i })
    fireEvent.change(PromoCode, { target: { value: 'SAVE50' } })
    userEvent.click(PromoCodebutton)
    expect(PromoCodebutton).toHaveClass('Mui-disabled')
  })

  it('should display promocode when a user enter and apply it', () => {
    render(<PromocodeBadgeComponent {...PromocodeBadgeComponent.args} />)
    const PromoCode = screen.getByRole('textbox')
    const PromoCodebutton = screen.getByRole('button', { name: /apply/i })
    fireEvent.change(PromoCode, { target: { value: 'SAVE50' } })
    userEvent.click(PromoCodebutton)
    expect(screen.getByTestId('promotype')).toHaveTextContent('SAVE50')
  })

  it('should not able to add duplicate promo code', () => {
    render(<PromocodeBadgeComponent {...PromocodeBadgeComponent.args} />)
  })

  it('should able to remove specific promo code', () => {
    render(<PromocodeBadgeComponent {...PromocodeBadgeComponent.args} />)
  })
})
