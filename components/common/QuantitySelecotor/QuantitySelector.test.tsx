import React from 'react'

import { composeStories } from '@storybook/testing-react'

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import QuantitySelecotor from './QuantitySelecotor'
import * as stories from './QuantitySelecotor.stories'

// import StoryBook stories
const { Default } = composeStories(stories)

describe('[components] - QuantitySelector', () => {
  test('should render component', () => {
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
    expect(input).toBeInTheDocument()
    expect(decreaseButton).toBeInTheDocument()
    expect(increaseButton).toBeInTheDocument()
  })

  test('should have initial default Quantity = 1', () => {
    // arrange
    const onIncreaseMock = jest.fn()
    const onDecreaseMock = jest.fn()
    render(<QuantitySelecotor onIncrease={onIncreaseMock} onDecrease={onDecreaseMock} />)

    // act
    const input = screen.getByRole('textbox') as HTMLInputElement

    // assert
    expect(input).toHaveValue('1')
  })

  test('should disable decrease button(-), when Quantity = 1 ', () => {
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

  test('should call onIncrease action, on Increase(+) button click', async () => {
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

  test('should onDecrease action on Decrease(-) button click (when Quantity > 1)', () => {
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
