import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import * as stories from './ProductVariantColorSelector.stories'

const { Common, NoColor } = composeStories(stories)

describe('[component] ProductVariantColorSelector component', () => {
  const setup = () => {
    const onChangeMock = jest.fn()
    render(<Common {...Common.args} onChange={onChangeMock} />)
    return {
      onChangeMock,
    }
  }

  const noColorSetup = () => {
    const onChangeMock = jest.fn()
    render(<NoColor onChange={onChangeMock} />)
    return {
      onChangeMock,
    }
  }

  it('should render component when colors present', () => {
    setup()
    const colorSelector = screen.getByTestId('product-variant-color-selector')

    expect(colorSelector).toBeVisible()
  })

  it('should not render component when colors not present', () => {
    noColorSetup()
    const colorSelector = screen.getByTestId('product-variant-color-selector')

    expect(colorSelector).toBeEmptyDOMElement()
  })

  it('should render a color ', () => {
    const { onChangeMock } = setup()
    const colorOptions = screen.getAllByTestId(/color-options/i)
    expect(colorOptions[0]).toHaveStyle('background-color: red')
  })

  it('should call onChange when clicked color option', () => {
    const { onChangeMock } = setup()
    const colorOptions = screen.getAllByTestId(/color-options/i)

    userEvent.click(colorOptions[0])
    expect(onChangeMock).toHaveBeenCalled()
  })

  it('should contain the number of colors passed from prop as values', () => {
    const { onChangeMock } = setup()
    const colorOptions = screen.getAllByTestId(/color-options/i)
    expect(colorOptions).toHaveLength(Common.args.colors.length)
  })
})
