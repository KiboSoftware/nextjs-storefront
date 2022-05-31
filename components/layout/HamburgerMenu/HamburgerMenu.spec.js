import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import '@testing-library/jest-dom'

import * as stories from './HamburgerMenu.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

describe('[component] HamburgerMenu component', () => {
  it('should render all the list-items if isDrawerOpen props is true', () => {
    render(<Common {...Common.args} />)
    const menu = screen.getAllByRole('button')

    expect(menu.length).toBe(12)
  })

  it('should not render all the list-items if isDrawerOpen props is false', () => {
    render(<Common isDrawerOpen={false} />)

    expect(screen.queryByTestId('hamburger-menu')).not.toBeInTheDocument()
  })

  it('should render Login button/ My Profile section', () => {
    const setIsDrawerOpenMock = jest.fn()
    render(<Common {...Common.args} setIsDrawerOpen={setIsDrawerOpenMock} />)

    expect(screen.getByTestId('AccountCircleIcon')).toBeVisible()
    expect(screen.getByText(/my-account/i)).toBeVisible()

    userEvent.keyboard('{esc}')
    expect(setIsDrawerOpenMock).toBeCalled()
  })
})
