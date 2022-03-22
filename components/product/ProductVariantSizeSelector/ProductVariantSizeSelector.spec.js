import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import theme from '../../../styles/theme'
import * as stories from './ProductVariantSizeSelector.stories' // import all stories from the stories file

const { Default } = composeStories(stories)

describe('[component] ProductVariantSizeSelector component', () => {
  const setup = () => {
    const selectOptionMock = jest.fn()
    render(<Default {...Default.args} selectOption={selectOptionMock} />)
    return {
      selectOptionMock,
    }
  }

  it('should render the component', () => {
    setup()

    const sizeSelector = screen.getByTestId('product-variant-size-selector')

    expect(sizeSelector).toBeVisible()
  })

  it('should contain the number of sizes passed from prop as values', () => {
    setup()

    const sizeOptions = screen.getAllByTestId(/size-options/i)

    expect(sizeOptions).toHaveLength(Default.args.values.length)
  })

  it('should call selectOption method only when size-option is enabled and not selected', () => {
    const { selectOptionMock } = setup()

    const option = screen.getByText('8')

    userEvent.click(option)

    expect(selectOptionMock).toHaveBeenCalled()
    expect(selectOptionMock).toHaveBeenCalledWith(Default.args.attributeFQN, '8')
  })

  it('should not call selectOption method when option is disabled', () => {
    const { selectOptionMock } = setup()

    const disabledOption = screen.getByText('7.5')

    userEvent.click(disabledOption)

    expect(selectOptionMock).toHaveBeenCalledTimes(0)
  })

  it('should not call selectOption method when option is selected', () => {
    const { selectOptionMock } = setup()

    const disabledOption = screen.getByText('7')

    userEvent.click(disabledOption)

    expect(selectOptionMock).toHaveBeenCalledTimes(0)
  })
})
