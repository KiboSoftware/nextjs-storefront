import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './FacetList.stories'

const { Common } = composeStories(stories)

const facetMock = () => <div data-testid="facet" />
jest.mock('../Facet/Facet', () => () => facetMock())

describe('[components] - FacetList', () => {
  const onFilterByCloseMock = jest.fn()
  const setup = () => {
    const user = userEvent.setup()
    render(<Common {...Common.args} onFilterByClose={onFilterByCloseMock} />)
    return { onFilterByCloseMock, user }
  }

  it('should render component', () => {
    // arrange
    setup()

    // act
    const facet = screen.getAllByTestId('facet')
    const title = screen.getByText(/filter-by/i)

    // assert
    const count =
      Common.args?.facetList?.filter(
        (item) => item?.facetType === 'Value' || item?.facetType === 'RangeQuery'
      ).length || 0

    expect(facet).toHaveLength(count)
    expect(title).toBeVisible()
  })

  it('should call handleClose callback function when user clicks on close icon button', async () => {
    const { user } = setup()

    const crossIcon = screen.getByTestId(/closeicon/i)
    await user.click(crossIcon)

    expect(onFilterByCloseMock).toHaveBeenCalled()
  })
})
