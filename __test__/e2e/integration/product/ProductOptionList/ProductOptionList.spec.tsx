import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from '@/components/product/ProductOptionList/ProductOptionList.stories'

const { Common } = composeStories(stories)

describe('[component] - ProductOptionList Integration', () => {
  const setup = () => {
    render(<Common {...Common.args} />)
  }

  it('should render component', () => {
    setup()

    const productItem = screen.getAllByTestId('productOption')
    const count = Common.args?.options?.length || 0

    expect(productItem).toHaveLength(count)

    Common.args?.options?.map((option) => {
      const name = screen.getByText(`${option?.name}:`)
      expect(name).toBeVisible()

      const value = screen.getByText(`${option?.value}`)
      expect(value).toBeVisible()
    })
  })
})
