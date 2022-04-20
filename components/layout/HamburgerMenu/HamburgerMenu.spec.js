import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'

import * as stories from './HamburgerMenu.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

describe('[component] HamburgerMenu component', () => {
  it('should render all the list-items if isDrawerOpen props is true', () => {
    render(<Common {...Common.args} />)
    const menu = screen.getAllByRole('button')

    expect(menu.length).toBe(15)
  })

  it('should not render all the list-items if isDrawerOpen props is false', () => {
    render(<Common isDrawerOpen={false} />)

    expect(screen.queryByTestId('hamburger-menu')).not.toBeInTheDocument()
  })
})
