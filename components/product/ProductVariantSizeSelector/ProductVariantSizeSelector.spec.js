import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import theme from '../../../styles/theme'
import * as stories from './ProductVariantSizeSelector.stories' // import all stories from the stories file

const { Default } = composeStories(stories)

describe('Product variant size selector component', () => {
  const setup = () => {
    const selectOption = jest.fn()
    render(<Default {...Default.args} selectOption={selectOption} />)
    return {
      selectOption,
    }
  }

  it('should render the component', () => {
    setup()

    const sizeSelector = screen.getByTestId('product-variant-size-selector')

    expect(sizeSelector).toBeVisible()
  })

  it('should contain the number of sizes passed from prop as values', () => {
    setup()

    const sizeOptions = screen.getAllByTestId(/size-options/)

    expect(sizeOptions).toHaveLength(Default.args.values.length)
  })

  it('should have text.primary background color for the selected options', () => {
    setup()

    const selectedOptions = screen.getAllByTestId('size-options-selected')

    selectedOptions.map((option) => {
      expect(option).toHaveStyle(`background-color: ${theme.palette.text.primary}`)
    })
  })

  it('should have opacity 0.3 for the disabled options', () => {
    setup()

    const disabledOptions = screen.getAllByTestId('size-options-disabled')

    disabledOptions.map((option) => {
      expect(option).toHaveStyle(`opacity: 0.3`)
    })
  })

  it('should call selectOption method', () => {
    const { selectOption } = setup()

    const sizeOptions = screen.getAllByTestId(/size-options/)

    userEvent.click(sizeOptions[0])

    expect(selectOption).toHaveBeenCalled()
    expect(selectOption).toHaveBeenCalledWith(
      Default.args.attributeFQN,
      Default.args.values[0].value
    )
  })

  it('should not call selectOption method if option is disabled', () => {
    const { selectOption } = setup()

    const sizeOptions = screen.getAllByTestId('size-options-disabled')

    userEvent.click(sizeOptions[0])

    expect(selectOption).toHaveBeenCalledTimes(0)
  })
})
