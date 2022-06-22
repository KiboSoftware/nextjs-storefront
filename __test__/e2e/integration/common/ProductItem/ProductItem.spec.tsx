import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from '@/components/common/ProductItem/ProductItem.stories'

const { Common } = composeStories(stories)

describe('[component] - ProductItem Integration', () => {
  const setup = () => {
    render(<Common {...Common.args} />)
  }

  it('should render component', () => {
    setup()

    const image = screen.getByRole('img')
    const options = Common.args?.options || []

    expect(image).toHaveAttribute('alt', Common.args?.name)

    options?.map((option) => {
      expect(screen.getByText(`${option?.name}:`)).toBeVisible()
      expect(screen.getByText(`${option?.value}`)).toBeVisible()
    })
  })
})
