/** @format */

import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './PromoCode.stories' // import all stories from the stories file

const { PromocodeComponent } = composeStories(stories)

describe('PromoCode Component', () => {
  it('should render PromoCode button text', () => {
    render(<PromocodeComponent {...PromocodeComponent.args} />)
    const PromoCodeApply = screen.getByRole('button', {
      name: /apply/i,
    })
    expect(PromoCodeApply).toBeVisible()
  })

  it('should render PromoCode inputfield text', () => {
    render(<PromocodeComponent {...PromocodeComponent.args} />)
    const PromoCode = screen.getByRole('textbox')

    expect(PromoCode).toBeVisible()
  })
})
