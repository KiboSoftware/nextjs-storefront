import React from 'react'

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import QuantitySelecotor from './QuantitySelecotor'

describe('[components] - QuantitySelector', () => {
  it('should render component', () => {
    // arrange
    const onIncreaseMock = jest.fn()
    const onDecreaseMock = jest.fn()
    render(
      <QuantitySelecotor quantity={1} onIncrease={onIncreaseMock} onDecrease={onDecreaseMock} />
    )

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
    const onIncreaseMock = jest.fn()
    const onDecreaseMock = jest.fn()
    render(<QuantitySelecotor onIncrease={onIncreaseMock} onDecrease={onDecreaseMock} />)

    // act
    const input = screen.getByRole('textbox') as HTMLInputElement

    // assert
    expect(input).toHaveValue('1')
  })

  it('should disable decrease button(-), when Quantity = 1 ', () => {
    // arrange
    const onIncreaseMock = jest.fn()
    const onDecreaseMock = jest.fn()
    render(
      <QuantitySelecotor quantity={1} onIncrease={onIncreaseMock} onDecrease={onDecreaseMock} />
    )

    // act
    const input = screen.getByRole('textbox') as HTMLInputElement
    const decreaseButton = screen.getByRole('button', { name: 'decrease' })

    // assert
    expect(input).toHaveValue('1')
    expect(decreaseButton).toHaveAttribute('aria-disabled', 'true')
  })

  it('should call onIncrease action, on Increase(+) button click', async () => {
    // arrange
    const onIncreaseMock = jest.fn()
    const onDecreaseMock = jest.fn()
    render(
      <QuantitySelecotor quantity={1} onIncrease={onIncreaseMock} onDecrease={onDecreaseMock} />
    )

    // act
    const increaseButton = screen.getByRole('button', { name: 'increase' })
    userEvent.click(increaseButton)

    // assert
    expect(onIncreaseMock).toHaveBeenCalledTimes(1)
  })

  it('should onDecrease action on Decrease(-) button click (when Quantity > 1)', () => {
    // arrange
    const onIncreaseMock = jest.fn()
    const onDecreaseMock = jest.fn()
    render(
      <QuantitySelecotor quantity={2} onIncrease={onIncreaseMock} onDecrease={onDecreaseMock} />
    )

    // act
    const decreaseButton = screen.getByRole('button', { name: 'decrease' })
    userEvent.click(decreaseButton)

    // assert
    expect(onDecreaseMock).toHaveBeenCalledTimes(1)
  })
})
