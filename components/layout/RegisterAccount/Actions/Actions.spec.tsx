import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './Actions.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

describe('[components] Register Account(Actions)', () => {
  const setup = () => {
    const onLoginToYourAccountMock = jest.fn()
    render(<Common onLoginToYourAccount={onLoginToYourAccountMock} />)
    return { onLoginToYourAccountMock }
  }

  it('should render component', () => {
    const { onLoginToYourAccountMock } = setup()

    const component = screen.getByTestId('actions-component')
    const loginToYourAccountLink = screen.getByText(/loginToYourAccount/i)

    userEvent.click(loginToYourAccountLink)

    expect(component).toBeInTheDocument()
    expect(loginToYourAccountLink).toBeVisible()
    expect(onLoginToYourAccountMock).toHaveBeenCalled()
  })
})
