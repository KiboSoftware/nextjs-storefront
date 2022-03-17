import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from '../../../components/filter-by/Facet/Facet.stories'

const { Default } = composeStories(stories)

describe('[components] - Facet integration', () => {
  const setup = () => {
    render(<Default {...Default.args} />)
  }

  it('should filter facet items when user enters search term', () => {
    // arrange
    setup()
    const input = screen.getByLabelText('search-input')

    // arrange
    const searchTerm = 'item'
    const items = Default.args?.values || []
    const count = items.filter((item) => item?.label?.toLowerCase().includes(searchTerm)).length

    const viewMore = screen.getByText(/view-more/i, { selector: 'button' })
    userEvent.type(input, searchTerm)
    userEvent.click(viewMore)
    const filteredItemsCount = screen.queryAllByTestId('label').length

    // assert
    expect(filteredItemsCount).toBe(count)
  })
})
