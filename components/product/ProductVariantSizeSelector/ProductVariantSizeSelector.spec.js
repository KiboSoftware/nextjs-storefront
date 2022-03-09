import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { composeStories } from '@storybook/testing-react'

import * as stories from './ProductVariantSizeSelector.stories' // import all stories from the stories file
import theme from '../../../styles/theme'

const { Default } = composeStories(stories)

describe('Product variant size selector component', () => {
  it('should render Default Product variant size selector', () => {
    const selectOption = jest.fn()
    render(<Default {...Default.args} selectOption={selectOption} />)
    const sizeSelector = screen.getByTestId('product-variant-size-selector')
    const sizeOptions = screen.getAllByTestId(/size-options/)
    const selectedOptions = screen.getAllByTestId('size-options-selected')
    const disabledOptions = screen.getAllByTestId('size-options-disabled')

    expect(sizeSelector).toBeVisible()
    expect(sizeOptions).toHaveLength(Default.args.productOption.values.length)
    selectedOptions.map((option) => {
      expect(option).toHaveStyle(`background-color: ${theme.palette.text.primary}`)
    })
    disabledOptions.map((option) => {
      expect(option).toHaveStyle(`opacity: 0.3`)
    })
  })
})
