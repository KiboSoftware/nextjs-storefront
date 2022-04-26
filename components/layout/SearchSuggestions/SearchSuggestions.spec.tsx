import React from 'react'

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { Common } from './SearchSuggestions.stories'

const searchBarMock = () => <div data-testid="search-bar-component" />
jest.mock('@/components/common/SearchBar/SearchBar', () => searchBarMock)

const suggestionSearch = {
  suggestionGroups: [
    {
      name: 'Pages',
      suggestions: [
        {
          suggestion: {
            productCode: 'MS-JKT-014',
            productName: 'Uproar Insulated Jacket',
            productTypeId: 5,
            content: {
              productName: 'Uproar Insulated Jacket',
            },
          },
        },
      ],
    },
    {
      name: 'Categories',
      suggestions: [
        {
          suggestion: {
            categoryId: 0,
            categoryCode: '53',
            content: {
              name: 'Jackets',
            },
            isDisplayed: true,
          },
        },
      ],
    },
  ],
}
const setIsSuggestionOpenMock = jest.fn()

describe('[components] - SearchSuggestions', () => {
  const setup = () => {
    render(
      <Common
        suggestionSearch={suggestionSearch}
        isSuggestionOpen={true}
        setIsSuggestionOpen={setIsSuggestionOpenMock}
      />
    )
    return {
      setIsSuggestionOpenMock,
    }
  }

  it('should render component', () => {
    setup()
    const searchBar = screen.getByTestId('search-bar-component')
    const count = Common.args?.suggestionSearch?.suggestionGroups?.length || 0
    expect(screen.getAllByRole('group')).toHaveLength(count)
    expect(searchBar).toBeVisible()
    expect(screen.getByText('suggestions')).toBeVisible()
    expect(screen.getByText('categories')).toBeVisible()
    expect(screen.getByRole('separator')).toBeInTheDocument()
  })
})
