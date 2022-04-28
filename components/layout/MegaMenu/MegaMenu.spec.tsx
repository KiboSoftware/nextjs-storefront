import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './MegaMenu.stories'

const { Common } = composeStories(stories)

describe('[components] - MegaMenu', () => {
  const setup = () => {
    render(<Common {...Common.args} />)
  }
  it('should render component', () => {
    setup()

    const categoryTree = Common.args?.categoryTree || []
    const categoryTreeCount = categoryTree?.filter((c) => c.isDisplayed).length || 0

    expect(screen.getAllByRole('group')).toHaveLength(categoryTreeCount)
    expect(screen.getByText(categoryTree[0]?.content?.name as string)).toBeVisible()
  })
})
