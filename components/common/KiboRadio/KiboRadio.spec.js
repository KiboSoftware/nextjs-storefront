import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './KiboRadio.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

describe('[component] - KiboRadio', () => {
  it('should render the component', () => {
    const { asFragment } = render(<Common {...Common.args} />)

    expect(asFragment(<Common {...Common.args} />)).toMatchSnapshot()
  })

  it('should call onChange if other options are clicked', () => {
    const onChangeMock = jest.fn()
    render(<Common {...Common.args} onChange={onChangeMock} />)
    const radio = screen.getByRole('radio', {
      name: /radio option 3/i,
    })

    userEvent.click(radio)
    expect(onChangeMock).toBeCalled()
  })
})
