import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './ReturnItemList.stories'

const { Common } = composeStories(stories)

const onItemSelectionMock = jest.fn()

const productItemMock = () => <div data-testid="return-product-item-component" />
jest.mock('@/components/common/ProductItem/ProductItem', () => () => productItemMock())

describe('[Component] - ReturnItemList', () => {
  const setup = () => {
    render(<Common {...Common.args} onItemSelection={onItemSelectionMock} />)
  }

  it('checkbox should be unchecked by default', async () => {
    setup()
    const checkbox = screen.getAllByRole('checkbox')

    expect(checkbox[0]).not.toBeChecked()
  })

  it('should select checkbox for Item to be returned and call onItemselection function', async () => {
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

  it('should render product item in component', () => {
    setup()
    const productItems = screen.getAllByTestId('return-product-item-component')
    const itemsCount = (Common.args?.items && Common.args?.items.length) || 0

    expect(productItems[0]).toBeInTheDocument()
    expect(productItems[0]).toBeVisible()
    expect(productItems).toHaveLength(itemsCount)
  })
})
