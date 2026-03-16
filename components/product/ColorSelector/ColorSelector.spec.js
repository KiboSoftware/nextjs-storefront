import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import * as stories from './ColorSelector.stories'

const { Common } = composeStories(stories)

describe('[component] ColorSelector component', () => {
  const setup = (params) => {
    const props = params ? params : Common.args
    const onColorChangeMock = jest.fn()
    const user = userEvent.setup()
    render(<Common {...props} onColorChange={onColorChangeMock} />)
    return {
      onColorChangeMock,
      user,
    }
  }

  it('should render the component', () => {
    setup()

    const colorSelector = screen.getByTestId('color-selector')

    expect(colorSelector).toBeVisible()
  })

  it('should contain the number of colors passed from prop as values', () => {
    setup()

    const colorOptions = screen.getAllByTestId(/colorvalue-/i)

    expect(colorOptions).toHaveLength(Common.args.values.length)
  })

  it('should call selectOption method only when color-option is enabled and not selected', async () => {
    const arrObj = { values: [{ attributeValueId: 3, value: 'green', isEnabled: true }] }
    const { onColorChangeMock, user } = setup(arrObj)

    const option = screen.getByTestId(/colorvalue-green/i)

    user.click(option)

    await waitFor(() => {
      expect(onColorChangeMock).toHaveBeenCalled()
    })
    await waitFor(() => {
      expect(onColorChangeMock).toHaveBeenCalledWith(Common.args.attributeFQN, 'green', true, true)
    })
  })

  it('should not call selectOption method when option is disabled', async () => {
    const arrObj = { values: [{ attributeValueId: 3, value: 'red', isEnabled: false }] }
    const { onColorChangeMock, user } = setup(arrObj)

    const disabledOption = screen.getByTestId(/colorvalue-red/i)

    user.click(disabledOption)

    await waitFor(() => {
      expect(onColorChangeMock).toHaveBeenCalledTimes(0)
    })
  })

  it('should not call selectOption method when option is selected', async () => {
    const arrObj = { values: [{ attributeValueId: 3, value: 'yellow', isSelected: true }] }
    const { onColorChangeMock, user } = setup(arrObj)

    const selectedOption = screen.getByTestId(/colorvalue-yellow/i)

    user.click(selectedOption)

    await waitFor(() => {
      expect(onColorChangeMock).toHaveBeenCalledTimes(0)
    })
  })
})
