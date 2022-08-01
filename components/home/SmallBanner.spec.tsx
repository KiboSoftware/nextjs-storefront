import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import mediaQuery from 'css-mediaquery'

import * as stories from './SmallBanner.stories'

const { Common } = composeStories(stories)

const createMatchMedia = (width: number) => (query: string) => ({
  matches: mediaQuery.match(query, { width }),
  addListener: () => jest.fn(),
  removeListener: () => jest.fn(),
  media: query,
  onchange: null,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
})

describe('smallbanner Component', () => {
  const setup = () => render(<Common {...Common.args} />)

  describe('small banner', () => {
    it('should render component', () => {
      setup()

      const subtitle = Common?.args?.bannerProps?.subtitle as string
      const title = Common?.args?.bannerProps?.subtitle as string

      const titleTest = screen.getAllByText(title)
      const subtitleTest = screen.getAllByText(subtitle)

      expect(titleTest[0]).toBeInTheDocument()
      expect(subtitleTest[0]).toBeInTheDocument()
    })

    it('mobile', async () => {
      window.matchMedia = createMatchMedia(500)
      setup()
      const subtitle = Common?.args?.bannerProps?.subtitle as string
      const title = Common?.args?.bannerProps?.subtitle as string

      const titleTest = screen.getAllByText(title)
      const subtitleTest = screen.getAllByText(subtitle)

      expect(titleTest[0]).toHaveStyle('font-size: 0.75rem')
      expect(subtitleTest[0]).toHaveStyle('font-size: 0.75rem')
    })

    it('Desktop', async () => {
      window.matchMedia = createMatchMedia(1000)
      setup()
      const subtitle = Common?.args?.bannerProps?.subtitle as string
      const title = Common?.args?.bannerProps?.subtitle as string

      const titleTest = screen.getAllByText(title)
      const subtitleTest = screen.getAllByText(subtitle)

      expect(titleTest[0]).toHaveStyle('font-size: 1rem')
      expect(subtitleTest[0]).toHaveStyle('font-size: 1rem')
    })
  })
})
