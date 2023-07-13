import { composeStories } from '@storybook/testing-react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import * as stories from './KiboSwitch.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

describe('[component] KiboSwitch component', () => {
  it('should render the component', () => {
    render(<Common {...Common.args} />)
    const kiboSwitch = screen.getByRole('checkbox')

    expect(kiboSwitch).toBeInTheDocument()
  })

  it('should have lable Status', () => {
    render(<Common {...Common.args} />)
    const kiboSwitch = screen.getByText('Status')

    expect(kiboSwitch).toBeVisible()
  })

  it('should call onChange method if option selected ', () => {
    const onChangeMock = jest.fn()
    render(<Common {...Common.args} onChange={onChangeMock} />)
    const kiboSwitch = screen.getByRole('checkbox')

    fireEvent.click(kiboSwitch)

    expect(onChangeMock).toBeCalledWith(false)
  })
})
