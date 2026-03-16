import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import * as stories from './ProductVariantSizeSelector.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

describe('[component] ProductVariantSizeSelector component', () => {
  const setup = () => {
    const onSizeChangeMock = jest.fn()
    const user = userEvent.setup()
    render(<Common {...Common.args} onSizeChange={onSizeChangeMock} />)
    return {
      onSizeChangeMock,
      user,
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

  it('should call selectOption method only when size-option is enabled and not selected', async () => {
    const { onSizeChangeMock, user } = setup()

    const option = screen.getByText(
      Common.args.values.filter((value) => value.isEnabled && !value.isSelected)[0].value
    )

    await user.click(option)

    expect(onSizeChangeMock).toHaveBeenCalled()
    expect(onSizeChangeMock).toHaveBeenCalledWith(Common.args.attributeFQN, '8', true, true)
  })

  it('should not call selectOption method when option is disabled', async () => {
    const { onSizeChangeMock, user } = setup()

    const disabledOption = screen.getByText(
      Common.args.values.filter((value) => value.isEnabled)[0].value
    )

    await user.click(disabledOption)

    expect(onSizeChangeMock).toHaveBeenCalledTimes(0)
  })

  it('should not call selectOption method when option is selected', async () => {
    const { onSizeChangeMock, user } = setup()

    const disabledOption = screen.getByText(
      Common.args.values.filter((value) => value.isSelected)[0].value
    )

    await user.click(disabledOption)

    expect(onSizeChangeMock).toHaveBeenCalledTimes(0)
  })
})
