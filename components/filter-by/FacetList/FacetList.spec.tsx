import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './FacetList.stories'

const { Common } = composeStories(stories)

const facetMock = () => <div data-testid="facet" />
jest.mock('../Facet/Facet', () => facetMock)

describe('[components] - FacetList', () => {
  const setup = () => {
    render(<Common {...Common.args} />)
  }

  it('should render component', () => {
    // arrange
    setup()

    // act
    const facet = screen.getAllByTestId('facet')

    // assert
    const count =
      Common.args?.facetList?.filter(
        (item) => item?.facetType === 'Value' || item?.facetType === 'RangeQuery'
      ).length || 0

    expect(facet).toHaveLength(count)
  })
})
