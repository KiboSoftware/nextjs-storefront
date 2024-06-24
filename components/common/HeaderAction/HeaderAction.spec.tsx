import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'

import * as stories from './HeaderAction.stories' // import all stories from the stories file

const { MyAccount, Location } = composeStories(stories)

const setCookie = (name: any, value: any) => {
  document.cookie = `${name}=${value}; path=/`
}

describe('[component] - HeaderAction', () => {
  it('should render title', () => {
    render(<MyAccount />)
    expect(screen.getByText(MyAccount.args?.title as string)).toBeVisible()
  })

  it('should render subtitle', () => {
    render(<MyAccount />)
    expect(screen.getByText(MyAccount.args?.subtitle as string)).toBeVisible()
  })

  it('should call onClick when clicked', async () => {
    const handleClick = jest.fn()
    render(<Location onClick={handleClick} isCSR={false} />)

    const element = screen.getByText(Location.args?.title as string)
    element.click()

    await waitFor(() => {
      expect(handleClick).toHaveBeenCalled()
    })
  })

  it('should not call onClick when clicked if in CSR mode', () => {
    const handleClick = jest.fn()
    render(<Location onClick={handleClick} isCSR={true} />)

    const element = screen.getByText(Location.args?.title as string)
    element.click()

    expect(handleClick).not.toHaveBeenCalled()
  })
})
