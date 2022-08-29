import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './KiboRadio.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

describe('[component] - KiboRadio', () => {
  it('should render the component', () => {
    render(<Common {...Common.args} />)

    const radioLabels = screen.getAllByRole('radio')

    expect(radioLabels.length).toBe(3)
    expect(screen.getByText(Common.args.title)).toBeVisible()
  })

  it('should call onChange when other options are clicked', async () => {
    const onChangeMock = jest.fn()
    const user = userEvent.setup()
    render(<Common {...Common.args} onChange={onChangeMock} />)
    const radio = screen.getByRole('radio', {
      name: /radio option 3/i,
    })

    await user.click(radio)
    expect(onChangeMock).toBeCalled()
  })

  it('should disabled the radio button', async () => {
    render(<Common {...Common.args} />)

    const radio = screen.getByRole('radio', {
      name: /radio option 1/i,
    })

    expect(radio).toBeDisabled()
  })
})
