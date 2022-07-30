import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import mediaQuery from 'css-mediaquery'

import * as stories from './ContentTile.stories'

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

describe('checkout Component', () => {
  const setup = () => render(<Common {...Common?.args} />)

  describe('checkout', () => {
    it('should render component', () => {
      setup()
      
      const tile = Common?.args?.largeTileProps || []
      const title = screen.getAllByText(tile[0].title)
      const subtitle = screen.getAllByText(tile[0].subtitle)
      const link1 = screen.getAllByText(tile[0].link1)

      expect(title[0]).toBeInTheDocument()
      expect(subtitle[0]).toBeInTheDocument()
      expect(link1[0]).toBeInTheDocument()
    })

    it('mobile', async () => {
      setup()

      window.matchMedia = createMatchMedia(500)

      const tile = Common?.args?.largeTileProps || []
      const description = screen.getAllByText(tile[0].subtitle)
      const link = screen.getAllByText(tile[0].link1)

      expect(description[0]).toHaveStyle('font-size: 0.75rem')
      expect(link[0]).toHaveStyle('font-size: 0.75rem')
    })

    it('desktop', async () => {
      setup()

      window.matchMedia = createMatchMedia(1000)

      const tile = Common?.args?.largeTileProps || []
      const description = screen.getAllByText(tile[0].subtitle)
      const link = screen.getAllByText(tile[0].link1)

      expect(description[0]).toHaveStyle('font-size: 1rem')
      expect(link[0]).toHaveStyle('font-size: 1rem')
    })
  })
})
