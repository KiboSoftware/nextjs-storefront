import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import * as stories from './ProductVariantSizeSelector.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

describe('[component] ProductVariantSizeSelector component', () => {
  const setup = () => {
    const onChangeMock = jest.fn()
    render(<Common {...Common.args} onChange={onChangeMock} />)
    return {
      onChangeMock,
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

    expect(sizeOptions).toHaveLength(Common.args.values.length)
  })

  it('should call selectOption method only when size-option is enabled and not selected', () => {
    const { onChangeMock } = setup()

    const option = screen.getByText('8')

    userEvent.click(option)

    expect(onChangeMock).toHaveBeenCalled()
    expect(onChangeMock).toHaveBeenCalledWith(Common.args.attributeFQN, '8')
  })

  it('should not call selectOption method when option is disabled', () => {
    const { onChangeMock } = setup()

    const disabledOption = screen.getByText('7.5')

    userEvent.click(disabledOption)

    expect(onChangeMock).toHaveBeenCalledTimes(0)
  })

  it('should not call selectOption method when option is selected', () => {
    const { onChangeMock } = setup()

    const disabledOption = screen.getByText('7')

    userEvent.click(disabledOption)

    expect(onChangeMock).toHaveBeenCalledTimes(0)
  })
})
