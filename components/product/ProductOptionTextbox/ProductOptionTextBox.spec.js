import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import { productOptionTextBoxMock } from '../../../__mocks__/stories/productOptionTextBoxMock'
import * as stories from './ProductOptionTextBox.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

const onChangMock = jest.fn()

const kiboTextboxMock = () => <input data-testid="kibo-textbox-component" onChange={onChangMock} />
jest.mock('@/components/common/KiboTextBox/KiboTextBox', () => kiboTextboxMock)

const setup = () => {
  render(<Common {...Common.args} />)
}

describe('[component] ProductOptionTextBox component', () => {
  it('should render all the options', () => {
    setup()
    const textbox = screen.getAllByTestId('kibo-textbox-component')
    expect(textbox).toHaveLength(productOptionTextBoxMock.length)
  })

  it('should show user entered value', () => {
    setup()

    const textBoxList = screen.getAllByRole('textbox')
    userEvent.type(textBoxList[0], 'Test')

    expect(textBoxList[0]).toHaveValue('Test')
    expect(onChangMock).toHaveBeenCalled()
  })
})
