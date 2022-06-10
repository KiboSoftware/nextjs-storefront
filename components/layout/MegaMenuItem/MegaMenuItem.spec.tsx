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
      expect(name).toBeVisible()
    })

    const shopAll = screen.getByText('shop-all')
    expect(shopAll).toBeVisible()
  })

  it('should route to another page when user clicks on shop all', async () => {
    setup()
    const link = screen.getByTestId('shopAllLink')
    expect(link).toHaveAttribute('href', '/category/' + Common.args?.categoryCode)
  })

  it('should route to another page when user clicks on item', async () => {
    setup()
    const categoryChildren = Common.args?.categoryChildren
    categoryChildren?.map((cat) => {
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '/category/' + cat?.categoryCode)
    })
  })
})
