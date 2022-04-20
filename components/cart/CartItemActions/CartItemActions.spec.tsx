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

    const editLink = screen.getByText('edit')
    const saveLink = screen.getByText('save-for-later')
    const addLink = screen.getByText('add-to-favorites')

    expect(editLink).toBeVisible()
    expect(saveLink).toBeVisible()
    expect(addLink).toBeVisible()
  })
})
