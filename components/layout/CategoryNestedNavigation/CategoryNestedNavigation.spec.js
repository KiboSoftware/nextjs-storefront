import { composeStories } from '@storybook/testing-react'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import '@testing-library/jest-dom'

import * as stories from './CategoryNestedNavigation.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

const setup = () => {
  const onCategoryClickMock = jest.fn()
  render(<Common {...Common.args} onCategoryClick={onCategoryClickMock} />)
  const categoryList = screen.getByRole('list')
  const listItems = within(categoryList)

  return {
    categoryList,
    listItems,
    onCategoryClickMock,
  }
}

describe('[component] CategroyNestedNavigation component', () => {
  it('should render the category-list', () => {
    render(<Common {...Common.args} />)
    const categoryList = screen.getByRole('list')
    const headerText = screen.getByText(/All Departments/i)
    const backLinkText = screen.getByText(/Back/i)

    expect(categoryList).toBeVisible()
    expect(headerText).toBeVisible()
    expect(backLinkText).toBeVisible()
  })

  it('should render only the category-list items where list property isDisplayed is true', () => {
    const { listItems } = setup()

    const categoryListItems = listItems.getAllByRole('button')

    const visibleCategoriesCount = Common.args.categoryTree.filter((cat) => cat.isDisplayed).length

    // excluding back and close button by extracting 2 from categoryListItems length
    expect(categoryListItems.length - 2).toEqual(visibleCategoriesCount)
  })

  it('should render childrenCategories on click if present and render the previous categories on back click', () => {
    const { listItems } = setup()

    // Getting all the visible categories
    const allVisibleCategories = Common.args.categoryTree.filter((cat) => cat.isDisplayed)

    userEvent.click(listItems.getByText(/Camping/i))

    expect(listItems.getByText(/Tents/i)).toBeVisible()

    // Getting all the visible children categories after clicking Camping
    let visibleCategoriesCount = allVisibleCategories[0].childrenCategories.length

    expect(listItems.getAllByRole('button').length - 2).toBe(visibleCategoriesCount)

    userEvent.click(
      listItems.getByRole('button', {
        name: /back\-arrow\-button/i,
      })
    )

    visibleCategoriesCount = allVisibleCategories.length

    expect(listItems.getAllByRole('button').length - 2).toBe(visibleCategoriesCount)
  })

  it('should call onCategoryClickMock if childrenCategories are empty', () => {
    const { listItems, onCategoryClickMock } = setup()

    userEvent.click(listItems.getByText(/Pets/i))

    expect(onCategoryClickMock).toBeCalled()
  })
})
