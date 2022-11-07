import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './Facet.stories'

const { Common } = composeStories(stories)

const searchMock = () => <div data-testid="search-component" />
const facetItemListMock = () => <div data-testid="facet-item-list-component" />
jest.mock('../../common/SearchBar/SearchBar', () => () => searchMock())
jest.mock('../FacetItemList/FacetItemList', () => () => facetItemListMock())

describe('[components] - FacetItem', () => {
  const setup = (values = Common.args?.values || []) => {
    const label = Common.args?.label || ''
    const user = userEvent.setup()
    render(<Common label={label} values={values} />)
    return {
      user,
    }
  }

  it('should render component', () => {
    // arrange
    setup()

    // act
    const accordian = screen.getByTestId('accordian')
    const label = screen.getByText(Common.args?.label || '')
    const search = screen.getByTestId('search-component')
    const facetItem = screen.getByTestId('facet-item-list-component')
    const viewMore = screen.getByText(/view-more/i, { selector: 'button' })

    // assert
    expect(accordian).toBeInTheDocument()
    expect(label).toBeInTheDocument()
    expect(search).toBeInTheDocument()
    expect(facetItem).toBeInTheDocument()
    expect(viewMore).toBeInTheDocument()
  })

  it('should expand accordian when user clicks on summery and shrinks again when user clicks again', async () => {
    // arrange
    const { user } = setup()

    // act
    const accordian = screen.getByTestId('accordian')

    // assert
    expect(accordian).not.toHaveAttribute('aria-expanded', false)
    await user.click(accordian)
    expect(accordian).not.toHaveAttribute('aria-expanded', true)

    await user.click(accordian)
    expect(accordian).not.toHaveAttribute('aria-expanded', false)
  })

  it('should hide "View More" when number of items < 6', () => {
    // arrange
    setup(Common.args?.values?.slice(0, 1))

    // act
    const viewMore = screen.queryByText(/view-more/i, { selector: 'button' })

    // assert
    expect(viewMore).not.toBeInTheDocument()
  })

  it('should show "View More" when number of items > 6', () => {
    // arrange
    setup()

    // act
    const viewMore = screen.getByText(/view-more/i, { selector: 'button' })

    // assert
    expect(viewMore).toBeInTheDocument()
  })

  it('should show "View Less" when user clicks on "View More" and "View More" when clicks again', async () => {
    // arrange
    const { user } = setup()

    // act
    let viewMore = screen.queryByText(/view-more/i, { selector: 'button' })
    let viewLess = screen.queryByText(/view-less/i, { selector: 'button' })

    // assert
    expect(viewMore).toBeInTheDocument()
    expect(viewLess).not.toBeInTheDocument()

    if (viewMore) await user.click(viewMore)
    viewMore = screen.queryByText(/view-more/i, { selector: 'button' })
    viewLess = screen.queryByText(/view-less/i, { selector: 'button' })

    expect(viewMore).not.toBeInTheDocument()
    expect(viewLess).toBeInTheDocument()

    if (viewLess) await user.click(viewLess)
    viewMore = screen.getByText(/view-more/i, { selector: 'button' })
    viewLess = screen.queryByText(/view-less/i, { selector: 'button' })

    expect(viewMore).toBeInTheDocument()
    expect(viewLess).not.toBeInTheDocument()
  })
})
