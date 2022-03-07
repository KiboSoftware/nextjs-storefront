import React from 'react'

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import QuantitySelecotor from './QuantitySelecotor'

describe('[components] - QuantitySelector', () => {
  test('should render component', () => {
    // arrange
    const onIncrease = jest.fn()
    const onDecrease = jest.fn()
    render(<QuantitySelecotor quantity={1} onIncrease={onIncrease} onDecrease={onDecrease} />)

    // act
    const input = screen.getByRole('textbox')
    const decreaseButton = screen.getByRole('button', { name: 'decrease' })
    const increaseButton = screen.getByRole('button', { name: 'increase' })

    // assert
    expect(input).toBeInTheDocument()
    expect(decreaseButton).toBeInTheDocument()
    expect(increaseButton).toBeInTheDocument()
  })

  test('should have initial default Quantity = 1', () => {
    // arrange
    const onIncrease = jest.fn()
    const onDecrease = jest.fn()
    render(<QuantitySelecotor onIncrease={onIncrease} onDecrease={onDecrease} />)

    // act
    const input = screen.getByRole('textbox') as HTMLInputElement

    // assert
    expect(input.value).toBe('1')
  })

  test('should disable decrease button(-), when Quantity = 1 ', () => {
    // arrange
    const onIncrease = jest.fn()
    const onDecrease = jest.fn()
    render(<QuantitySelecotor quantity={1} onIncrease={onIncrease} onDecrease={onDecrease} />)

    // act
    const input = screen.getByRole('textbox') as HTMLInputElement
    const decreaseButton = screen.getByRole('button', { name: 'decrease' })

    // assert
    expect(input.value).toBe('1')
    expect(decreaseButton).toHaveAttribute('aria-disabled', 'true')
  })

  test('should increase Quantity on Increase(+) button click', async () => {
    // arrange
    const onIncrease = jest.fn()
    const onDecrease = jest.fn()
    render(<QuantitySelecotor quantity={1} onIncrease={onIncrease} onDecrease={onDecrease} />)

    // act
    const increaseButton = screen.getByRole('button', { name: 'increase' })
    userEvent.click(increaseButton)

    // assert
    expect(onIncrease).toHaveBeenCalledTimes(1)
  })

  test('should decrease Quantity on Decrease(-) button click (when Quantity > 1)', () => {
    // arrange
    const onIncrease = jest.fn()
    const onDecrease = jest.fn()
    render(<QuantitySelecotor quantity={2} onIncrease={onIncrease} onDecrease={onDecrease} />)

    // act
    const decreaseButton = screen.getByRole('button', { name: 'decrease' })
    userEvent.click(decreaseButton)

    // assert
    expect(onDecrease).toHaveBeenCalledTimes(1)
  })
})
