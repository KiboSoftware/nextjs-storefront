import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './SmallBanner.stories'

const { Common } = composeStories(stories)

describe('[Component] - small banner', () => {
  const setup = () => render(<Common {...Common.args} />)
  it('should render component', () => {
    setup()

    const subtitle = Common?.args?.bannerProps?.subtitle as string
    const title = Common?.args?.bannerProps?.title as string
    const callToAction = Common?.args?.bannerProps?.callToAction.title as string

    const titleTest = screen.getAllByText(title)
    const subtitleTest = screen.getAllByText(subtitle)
    const callToActionTest = screen.getAllByText(callToAction)

    expect(titleTest[0]).toBeVisible()
    expect(subtitleTest[0]).toBeVisible()
    expect(callToActionTest[0]).toBeVisible()
  })
})
