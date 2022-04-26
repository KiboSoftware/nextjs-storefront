import React, { useState } from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from '../../../../../components/layout/SearchSuggestions/SearchSuggestions.stories'

const { Common } = composeStories(stories)

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

describe('[components] - SearchSuggestions Integration', () => {
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

  it('should render component', async () => {
    setup()

    const input = screen.getByRole('textbox', { name: 'search-input' })
    expect(input).toHaveValue('')
    await userEvent.type(input, 'Test')

    // assert
    expect(input).toHaveValue('Test')
    expect(setIsSuggestionOpenMock).toBeCalled()
  })
})
