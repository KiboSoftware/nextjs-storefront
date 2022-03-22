import React from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import QuantitySelector from './QuantitySelector'

describe('[components] - QuantitySelector', () => {
  const setup = (defaultQuantity = 1) => {
    const onIncreaseMock = jest.fn()
    const onDecreaseMock = jest.fn()

    render(
      <QuantitySelector
        quantity={defaultQuantity}
        onIncrease={onIncreaseMock}
        onDecrease={onDecreaseMock}
      />
    )

    return {
      onIncreaseMock,
      onDecreaseMock,
    }
  }

  it('should render component', () => {
    // arrange
    setup()

    // act
    const input = screen.getByRole('textbox')
    const decreaseButton = screen.getByRole('button', { name: 'decrease' })
    const increaseButton = screen.getByRole('button', { name: 'increase' })

    // assert
    expect(input).toBeVisible()
    expect(decreaseButton).toBeVisible()
    expect(increaseButton).toBeVisible()
  })

  it('should have initial default Quantity = 1', () => {
    // arrange
    setup()

    // act
    const input = screen.getByRole('textbox') as HTMLInputElement

    // assert
    expect(input).toHaveValue('1')
  })

  it('should disable decrease button(-) when Quantity = 1 ', () => {
    // arrange
    setup()

    // act
    const input = screen.getByRole('textbox') as HTMLInputElement
    const decreaseButton = screen.getByRole('button', { name: 'decrease' })

    // assert
    expect(input).toHaveValue('1')
    expect(decreaseButton).toHaveAttribute('aria-disabled', 'true')
  })

  it('should call onIncrease action when user clicks on Increase(+) button', async () => {
    // arrange
    const { onIncreaseMock } = setup()

    // act
    const increaseButton = screen.getByRole('button', { name: 'increase' })
    userEvent.click(increaseButton)

    // assert
    expect(onIncreaseMock).toHaveBeenCalledTimes(1)
  })

  it('should call onDecrease action when user clicks on Decrease(-) button and Quantity > 1', () => {
    // arrange
    const defaultQuantity = 2
    const { onDecreaseMock } = setup(defaultQuantity)

    // act
    const decreaseButton = screen.getByRole('button', { name: 'decrease' })
    userEvent.click(decreaseButton)

    // assert
    expect(onDecreaseMock).toHaveBeenCalledTimes(1)
  })
})
