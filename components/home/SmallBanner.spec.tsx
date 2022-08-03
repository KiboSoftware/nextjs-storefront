import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './SmallBanner.stories'

const { Common } = composeStories(stories)

describe('smallbanner Component', () => {
  const setup = () => render(<Common {...Common.args} />)
  it('should render component', () => {
    setup()

    const subtitle = Common?.args?.bannerProps?.subtitle as string
    const title = Common?.args?.bannerProps?.subtitle as string

    const titleTest = screen.getAllByText(title)
    const subtitleTest = screen.getAllByText(subtitle)

    expect(titleTest[0]).toBeInTheDocument()
    expect(subtitleTest[0]).toBeInTheDocument()
  })
})
