import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './MegaMenuItem.stories'

const { Common } = composeStories(stories)

describe('[components] - MegaMenuItem', () => {
  const setup = () => {
    render(<Common {...Common.args} />)
  }

  it('should render component', () => {
    setup()

    const title = screen.getByText(`${Common.args?.title}`)
    expect(title).toBeVisible()

    const categoryChildren = Common.args?.categoryChildren
    categoryChildren?.map((cat) => {
      const name = screen.getByText(`${cat?.content?.name}`)
      expect(screen.getByRole('group')).toBeVisible()
      expect(name).toBeVisible()
      expect(name).toHaveAttribute('href', 'category/' + cat?.categoryCode)
    })

    const shopAll = screen.getByText('shop-all')
    expect(shopAll).toBeVisible()
    expect(shopAll).toHaveAttribute('href', 'category/' + Common.args?.categoryCode)
  })
})
