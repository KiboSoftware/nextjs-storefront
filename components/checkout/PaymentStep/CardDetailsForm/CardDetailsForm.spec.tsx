import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './CardDetailsForm.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

const onChangMock = jest.fn()
const onBlurMock = jest.fn()

const KiboTextBoxMock = () => (
  <input data-testid="text-box-mock" onChange={onChangMock} onBlur={onBlurMock} />
)
jest.mock('../../../common/KiboTextBox/KiboTextBox', () => KiboTextBoxMock)

describe('[components] CardDetailsForm', () => {
  const setup = () => render(<Common {...Common.args} />)

  it('should render component', () => {
    setup()

    const cardDetailsComponent = screen.getByTestId('card-details')
    const textBoxList = screen.getAllByTestId('text-box-mock')

    expect(cardDetailsComponent).toBeInTheDocument()
    expect(textBoxList).toHaveLength(3)
  })
})
