/* eslint-disable @typescript-eslint/no-var-requires */
import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import * as stories from './MobileHeader.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn().mockReturnValue(false),
}))

describe('[component] MobileHeader component', () => {
  it('should render the component', () => {
    render(<Common {...Common.args} />)

    expect(screen.getByTestId(/top-bar/)).not.toBeVisible()
    expect(screen.queryByTestId(/header-action-area/)).not.toBeInTheDocument()
    expect(screen.getByTestId(/mega-menu-container/)).not.toBeVisible()
    expect(screen.getByTestId(/mobile-header/)).toBeVisible()
  })
})
