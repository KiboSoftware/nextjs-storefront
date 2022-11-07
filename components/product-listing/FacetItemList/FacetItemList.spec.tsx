import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './FacetItemList.stories'

const { Common } = composeStories(stories)

const facetItemMock = () => <div data-testid="facet-item-component" />
jest.mock('../FacetItem/FacetItem', () => () => facetItemMock())

describe('[components] - FacetItemList', () => {
  const setup = () => {
    render(<Common {...Common.args} />)
  }

  it('should render component', () => {
    // arrange
    setup()

    // act
    const facetItem = screen.getAllByTestId(/facet-item-component/i)

    // assert
    const count = Common.args?.itemList?.length || 0
    expect(facetItem).toHaveLength(count)
  })
})
