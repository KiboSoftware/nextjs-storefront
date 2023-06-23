import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './PaymentCard.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

describe('[component] - PaymentCard', () => {
  it('should display the payment card details', () => {
    render(<Common {...Common.args} />)

    expect(screen.getByText(Common.args?.title as string)).toBeVisible()
    expect(screen.getByText(Common.args?.cardNumberPart as string)).toBeVisible()
    expect(
      screen.getByText(new RegExp(Common.args?.expireMonth + '/' + Common.args?.expireYear))
    ).toBeVisible()
    expect(screen.getByAltText(Common.args?.cardType as string)).toBeVisible()
  })
})
