import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './HeaderAction.stories' // import all stories from the stories file

const { MyAccount, Location } = composeStories(stories)

describe('[component] - HeaderAction', () => {
  it('should render title', () => {
    render(<MyAccount />)
    expect(screen.getByText(MyAccount.args.title)).toBeVisible()
  })

  it('should render subtitle', () => {
    render(<MyAccount />)
    expect(screen.getByText(MyAccount.args.subtitle)).toBeVisible()
  })

  it('should call headerAction when clicked', () => {
    const handleClick = jest.fn()
    render(<Location onClick={handleClick} />)

    const element = screen.getByText(Location.args.title)
    element.click()

    expect(handleClick).toHaveBeenCalled()
  })
})
