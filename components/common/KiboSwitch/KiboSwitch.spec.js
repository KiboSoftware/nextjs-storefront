import { composeStories } from '@storybook/testing-react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import * as stories from './KiboSwitch.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

describe('[component] KiboSwitch component', () => {
  it('should render the component', async () => {
    render(<Common {...Common.args} />)

    const kiboSwitch = await screen.findByRole('checkbox')

    expect(kiboSwitch).toBeInTheDocument()
  })

  it('should have lable Status', () => {
    render(<Common {...Common.args} />)
    const kiboSwitch = screen.getByText('Status')

    expect(kiboSwitch).toBeVisible()
  })

  it('should render text Active when checked is passed true', () => {
    render(<Common {...Common.args} />)
    const onLabel = Common.args.onLabel
    const activeLabel = screen.getByText(onLabel)

    expect(activeLabel).toBeVisible()
  })

  it('should render text Active when checked is passed true', () => {
    render(<Common {...Common.args} checked={false} />)
    const offLabel = Common.args.offLabel
    const inActiveLabel = screen.getByText(offLabel)

    expect(inActiveLabel).toBeVisible()
  })

  it('should call onChange method if option selected ', () => {
    const onChangeMock = jest.fn()
    render(<Common {...Common.args} onChange={onChangeMock} />)
    const kiboSwitch = screen.getByRole('checkbox')

    fireEvent.click(kiboSwitch)

    expect(onChangeMock).toBeCalledWith(false)
  })
})
