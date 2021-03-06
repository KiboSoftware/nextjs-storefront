/** @format */

import React from 'react'

import '@testing-library/jest-dom/extend-expect'
import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './PromoCodeBadge.stories' // import all stories from the stories file

const { PromocodeBadgeComponent, PromocodeBadge } = composeStories(stories)

describe('PromoCode Component', () => {
  const setup = () => {
    const user = userEvent.setup()
    render(<PromocodeBadgeComponent {...PromocodeBadgeComponent.args} />)
    return {
      user,
    }
  }
  const userEnteredText = 'T'

  it('should render PromoCode text', () => {
    setup()
    const PromoCode = screen.getByRole('textbox')

    expect(PromoCode).toBeVisible()
  })

  it('should render PromoCode apply button', () => {
    setup()
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

  it('should enable button', async () => {
    const { user } = setup()
    const PromoCode = screen.getByRole('textbox')
    await user.click(PromoCode, 'SAVE50')
    expect(PromoCode).toBeInTheDocument('SAVE50')
    const ApplyButton = screen.getByTestId('promo-button')
    expect(ApplyButton).toBeInTheDocument()
  })

  it('should render remove button', () => {
    setup()
    const removeButton = screen.getByRole('button')
    expect(removeButton).toBeVisible()
  })

  it('should render ApplyPromocode button', () => {
    setup()
    const ApplyPromocode = screen.getByTestId('promo-button')
    expect(ApplyPromocode).toBeVisible()
  })

  it('Test the Apply Button is disable at default', () => {
    setup()
    const ApplyButton = screen.getByTestId('promo-button')
    expect(ApplyButton).toBeDisabled()
  })

  it('should enable Apply button when a user enters Promo code', async () => {
    const { user } = setup()

    const input = screen.getByRole('textbox')
    const ApplyButton = screen.getByTestId('promo-button')
    expect(ApplyButton).toBeDisabled()
    await user.type(input, userEnteredText)

    expect(input).toHaveValue(userEnteredText)
    expect(ApplyButton).toBeEnabled()
  })

  it('should disable Apply button when a user enters Promo code and apply it', async () => {
    setup()
    const PromoCodebutton = screen.getByRole('button', {
      name: /apply/i,
    })
    expect(PromoCodebutton).toBeDisabled()
  })

  it('should display promocode when a user enter and apply it', async () => {
    const { user } = setup()
    const input = screen.getByRole('textbox')
    const PromoCodebutton = screen.getByRole('button', { name: /apply/i })
    await user.type(input, userEnteredText)
    expect(input).toHaveValue(userEnteredText)

    await user.click(PromoCodebutton)
    expect(screen.getByTestId('promotype')).toBeInTheDocument('SAVE50')
  })
})
