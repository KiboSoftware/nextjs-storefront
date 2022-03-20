import { composeStories } from '@storybook/testing-react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

import * as stories from './ProductOptionCheckbox.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

describe('[component] ProductOptionCheckbox component', () => {
  it('should render checkbox option', () => {
<<<<<<< HEAD
    render(<Common {...Common.args} />)
=======
    render(<Default {...Default.args} />)
>>>>>>> 92a6e11 (feat(checkbox): resolving PR comments and UT fixes)
    const checkbox = screen.getByTestId('kibo-checkbox')

    expect(checkbox).toBeVisible()
  })

  it('should render checkbox label', () => {
<<<<<<< HEAD
    render(<Common {...Common.args} />)
=======
    render(<Default {...Default.args} />)
>>>>>>> 92a6e11 (feat(checkbox): resolving PR comments and UT fixes)
    const checkbox = screen.getByText(/include warranty/i)

    expect(checkbox).toBeVisible()
  })

  it('should check/uncheck the checkbox', () => {
    const onChangeMock = jest.fn()
    render(<Default {...Default.args} onChange={onChangeMock} />)
    const checkbox = within(screen.getByTestId('kibo-checkbox')).getByRole('checkbox')

    expect(checkbox).not.toBeChecked()

    fireEvent.click(checkbox)

    expect(checkbox).toBeChecked()
    expect(onChangeMock).toBeCalled()
  })
})
