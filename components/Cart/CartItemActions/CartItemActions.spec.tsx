import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './CartItemActions.stories'

const { Common } = composeStories(stories)

describe('[components] - CartItemActions', () => {
  const setup = () => {
    render(<Common {...Common.args} />)
  }

  it('should render component', () => {
    setup()

    const cardActions = screen.getByRole('cardActions')

    expect(cardActions).toBeVisible()
  })

  it('should render Edit link', () => {
    setup()

    const editLink = screen.getByText('edit')

    expect(editLink).toBeVisible()
  })

  it('should render save-for-later link', () => {
    setup()

    const editLink = screen.getByText('save-for-later')

    expect(editLink).toBeVisible()
  })

  it('should render add-to-favorites link', () => {
    setup()

    const editLink = screen.getByText('add-to-favorites')

    expect(editLink).toBeVisible()
  })
})
