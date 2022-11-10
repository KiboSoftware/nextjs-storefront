import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './ReturnItemList.stories'

const { Common } = composeStories(stories)

const onItemSelectionMock = jest.fn()

describe('[Component] - ReturnItemList', () => {
  const setup = () => {
    render(<Common {...Common.args} onItemSelection={onItemSelectionMock} />)
  }

  it('should select checkbox for Item to be returned , when isCheckboxVisible is true', async () => {
    setup()

    const user = userEvent.setup()
    const checkbox = screen.getAllByRole('checkbox')
    expect(checkbox[0]).not.toBeChecked()
    await user.click(checkbox[0])
    await waitFor(() => {
      expect(checkbox[0]).toBeChecked()
    })
    expect(onItemSelectionMock).toBeCalled()
  })
})
