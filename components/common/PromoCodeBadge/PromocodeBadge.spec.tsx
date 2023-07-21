/** @format */

import React from 'react'

import '@testing-library/jest-dom/extend-expect'
import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { PromoCodeBadgeProps } from './PromoCodeBadge'
import * as stories from './PromoCodeBadge.stories' // import all stories from the stories file

const { PromocodeBadgeComponent } = composeStories(stories)
describe('PromoCodeBadge Component', () => {
  const setup = (params?: PromoCodeBadgeProps) => {
    const props = params ? params : PromocodeBadgeComponent.args
    const user = userEvent.setup()
    render(<PromocodeBadgeComponent {...props} />)
    return {
      user,
    }
  }
  const userEnteredText = 'SAVE60'

  it('should render component', () => {
    setup()
    const PromoCode = screen.getByRole('textbox')
    const removeButton = screen.getByRole('button')
    const ApplyPromocode = screen.getByTestId('promo-button')

    expect(PromoCode).toBeVisible()
    expect(removeButton).toBeVisible()
    expect(ApplyPromocode).toBeVisible()
  })

  it('should render promocode badge', () => {
    setup()
    const PromoCode = screen.getByText(PromocodeBadgeComponent?.args?.promoList?.[0] as string)
    expect(PromoCode).toBeVisible()
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
    user.type(input, userEnteredText)

    await waitFor(() => {
      expect(input).toHaveValue(userEnteredText)
    })

    await waitFor(() => {
      expect(ApplyButton).toBeEnabled()
    })
  })

  it('should disable Apply button when a user enters Promo code and apply it', async () => {
    const { user } = setup()
    const input = screen.getByRole('textbox')
    const PromoCodebutton = screen.getByRole('button', {
      name: /apply/i,
    })

    await act(async () => {
      await user.type(input, userEnteredText)
      user.click(PromoCodebutton)
    })

    await waitFor(() => {
      expect(PromoCodebutton).toBeDisabled()
    })
  })

  it('should display promocode when a user enter and apply it', async () => {
    const { user } = setup()
    const input = screen.getByRole('textbox')
    const PromoCodebutton = screen.getByRole('button', { name: /apply/i })

    user.type(input, userEnteredText)
    await waitFor(() => {
      expect(input).toHaveValue(userEnteredText)
    })

    user.click(PromoCodebutton)
    await waitFor(() => {
      expect(screen.getAllByTestId('applied-coupon')[1]).toBeInTheDocument()
    })
  })

  it('should display multiple promocode when a user enter and apply it', async () => {
    const promoCode = '10OFF'
    const params = {
      ...PromocodeBadgeComponent.args,
      promoList: [promoCode],
      onApplyCouponCode: () => ({}),
      onRemoveCouponCode: () => ({}),
    }
    const { user } = setup(params)
    const input = screen.getByRole('textbox')
    const PromoCodebutton = screen.getByRole('button', { name: /apply/i })

    await act(async () => {
      await user.type(input, userEnteredText)
      user.click(PromoCodebutton)
    })

    await waitFor(() => {
      const appliedPromoCode = screen.getByText(promoCode)
      expect(appliedPromoCode).toBeVisible()
    })

    await waitFor(() => {
      const appliedPromoCode2 = screen.getByText('10OFF')
      user.click(PromoCodebutton)
      expect(appliedPromoCode2).toBeVisible()
    })
  })

  it('should display an error message when the user applies the same promo code more than once', async () => {
    const params = {
      ...PromocodeBadgeComponent.args,
      promoList: ['10OFF'],
      onApplyCouponCode: () => ({}),
      onRemoveCouponCode: () => ({}),
    }
    const { user } = setup(params)
    const input = screen.getByRole('textbox')
    const PromoCodebutton = screen.getByRole('button', { name: /apply/i })

    await act(async () => {
      await user.type(input, '10OFF')
      user.click(PromoCodebutton)
    })

    await waitFor(() => {
      const errorMessage = screen.getByText('promo-code-already-in-use')
      expect(errorMessage).toBeVisible()
    })
  })

  it('should remove a coupon when click cross icon', async () => {
    const promoCode = '10OFF'
    const params = {
      ...PromocodeBadgeComponent.args,
      promoList: [promoCode],
      onApplyCouponCode: () => ({}),
      onRemoveCouponCode: () => ({}),
    }
    const { user } = setup(params)
    const removeIcon = screen.getAllByLabelText('remove-promo-code')

    user.click(removeIcon[0])

    await waitFor(() => {
      const removedPromoCode = screen.queryByText(promoCode)
      expect(removedPromoCode).not.toBeInTheDocument()
    })
  })
})
