import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from '../../../../../components/product-listing/Facet/Facet.stories'

const { Common } = composeStories(stories)

describe('[components] - Facet integration', () => {
  const setup = () => {
    const user = userEvent.setup()
    render(<Common {...Common.args} />)

    return {
      user,
    }
  }

  it('should filter facet items when user enters search term', async () => {
    // arrange
    const { user } = setup()
    const input = screen.getByLabelText('search-input')

    // arrange
    const searchTerm = 'item'
    const items = Common.args?.values || []
    const count = items.filter((item) => item?.label?.toLowerCase().includes(searchTerm)).length

    const viewMore = screen.getByText(/view-more/i, { selector: 'button' })
    await user.type(input, searchTerm)
    await user.click(viewMore)
    const filteredItemsCount = screen.queryAllByTestId('label').length

    // assert
    expect(filteredItemsCount).toBe(count)
  })
})
