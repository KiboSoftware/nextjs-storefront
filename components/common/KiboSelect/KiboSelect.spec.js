import { composeStories } from '@storybook/testing-react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom'

import * as stories from './KiboSelect.stories' // import all stories from the stories file

const { WithCustomPlaceholder, Common, WithErrorDescription } = composeStories(stories)

describe('[component] KiboSelect component', () => {
  it('should render the component', () => {
    render(<WithCustomPlaceholder {...WithCustomPlaceholder.args} />)
    const select = screen.getByRole('button')

    expect(select).toBeVisible()
    expect(select).toHaveTextContent(WithCustomPlaceholder.args.placeholder)
  })

  it('should display the error description if passed when error is true', () => {
    render(<WithErrorDescription {...WithErrorDescription.args} />)
    const errorhelperText = screen.getByTestId('helper-text')

    expect(errorhelperText).toBeVisible()
  })

  it('should display the error description if passed when error is true', () => {
    const onChangeMock = jest.fn()
    render(<Common {...Common.args} onChange={onChangeMock} />)
    const selectButton = screen.getByRole('button')

    fireEvent.mouseDown(selectButton)

    const listbox = within(screen.getByRole('listbox'))

    fireEvent.click(listbox.getByText(/option 2/i))

    expect(selectButton).toHaveTextContent(/option 2/i)
    expect(onChangeMock).toBeCalled()
    expect(onChangeMock).toBeCalledWith('kibo-select', '2')
  })
})
