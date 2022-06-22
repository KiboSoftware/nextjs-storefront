import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './OrderPrice.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

describe('[components] OrderPrice', () => {
  it('should render component', async () => {
    render(<Common {...Common.args} />)

    expect(screen.getByText(/cart subtotal \(6 items\)/i)).toBeVisible()
    expect(screen.getByText(/\$219\.99/i)).toBeVisible()
    expect(screen.getByText(/standard shipping/i)).toBeVisible()
    expect(screen.getByText(/estimated tax/i)).toBeVisible()
    expect(screen.getByText(/\$13\.73/i)).toBeVisible()
    expect(screen.getByText(/\$233\.72/i)).toBeVisible()
  })
})
