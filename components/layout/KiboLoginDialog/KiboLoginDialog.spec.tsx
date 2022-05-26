import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import KiboLoginContent from '../KiboLoginContent/KiboLoginContent'
import * as stories from './KiboLoginDialog.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

const onChangMock = jest.fn()
const onClickLoginMock = jest.fn()
const KiboLoginContentMock = () => <input data-testid="kibo-login-cotent" />
jest.mock('../KiboLoginContent/KiboLoginContent', () => KiboLoginContentMock)

describe('[components] Login (KiboLoginDialog)', () => {
  const setup = (args = Common.args) => render(<Common {...args} />)

  it('should render component', () => {
    setup()

    const loginContent = screen.getByTestId('kibo-login-cotent')

    expect(loginContent).toBeVisible()
  })
})
