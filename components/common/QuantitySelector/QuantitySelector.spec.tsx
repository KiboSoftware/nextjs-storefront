import React from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import QuantitySelector from './QuantitySelector'

describe('[components] - QuantitySelector', () => {
  const onQuantityUpdateMock = jest.fn()
  const setup = (defaultQuantity = 1) => {
    const label = ''
    const onIncreaseMock = jest.fn()
    const onDecreaseMock = jest.fn()
    const user = userEvent.setup()
    render(
      <QuantitySelector
        quantity={defaultQuantity}
        label={label}
        onIncrease={onIncreaseMock}
        onDecrease={onDecreaseMock}
        onQuantityUpdate={onQuantityUpdateMock}
      />
    )

    return {
      onIncreaseMock,
      onDecreaseMock,
      user,
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
    const { onIncreaseMock, user } = setup()

    // act
    const increaseButton = screen.getByRole('button', { name: 'increase' })
    await user.click(increaseButton)

    // assert
    expect(onIncreaseMock).toHaveBeenCalledTimes(1)
  })

  it('should call onDecrease action when user clicks on Decrease(-) button and Quantity > 1', async () => {
    // arrange
    const defaultQuantity = 2
    const { onDecreaseMock, user } = setup(defaultQuantity)

    // act
    const decreaseButton = screen.getByRole('button', { name: 'decrease' })
    await user.click(decreaseButton)

    // assert
    expect(onDecreaseMock).toHaveBeenCalledTimes(1)
  })

  it('should display qty label', () => {
    const labelText = 'Qty'
    const onIncreaseMock = jest.fn()
    const onDecreaseMock = jest.fn()

    render(
      <QuantitySelector
        quantity={1}
        label={labelText}
        onIncrease={onIncreaseMock}
        onDecrease={onDecreaseMock}
      />
    )
    const label = screen.getByTestId('label')

    expect(label).toBeVisible()
  })

  it('should call updateCustomQuantity when valid(number) custom quantity inputs', async () => {
    const { user } = setup()

    const input = screen.getByRole('textbox')
    await user.type(input, '4')
    await user.tab()

    expect(onQuantityUpdateMock).toHaveBeenCalled()
  })
})
