import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './ProfileDetailsForm.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

const KiboTextBoxMock = () => (
  <input
    data-testid="text-box-mock"
  />
)
jest.mock('@/components/common/KiboTextBox/KiboTextBox.tsx', () => KiboTextBoxMock)

describe('[component] - ProfileDetailsForm', () => {
  const setup = () => {
    const user = userEvent.setup()
    render(<Common {...Common.args} />)
    return {
      user,
    }
  }
  it('should render component', () => {
    setup()

    const textBoxList = screen.getAllByTestId('text-box-mock')

    expect(textBoxList).toHaveLength(2)
  })

})
