import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import '@testing-library/jest-dom'

import * as stories from './Preview.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

const setup = () => {
  const user = userEvent.setup()
  render(<Common {...Common.args} />)

  return {
    user,
  }
}

describe('[component] Preview component', () => {
  it('should render component', () => {
    setup()
  })
})
