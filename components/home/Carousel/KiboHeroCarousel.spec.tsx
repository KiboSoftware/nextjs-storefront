import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import mediaQuery from 'css-mediaquery'

import * as stories from './KiboHeroCarousel.stories'

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
  const setup = () => render(<Common {...Common.args} />)

  describe('checkout', () => {
    it('should render next', () => {
      setup()
      const nexticon = screen.getAllByTestId('FiberManualRecordIcon')
      expect(nexticon[0]).toBeVisible()
    })

    it('should render component', () => {
      setup()
      const title = screen.getAllByText(/Save up to 50%/i)
      expect(title[0]).toBeInTheDocument()
    })

    it('should render component', () => {
      setup()

      const carouselValues = Common?.args?.carouselItem || []
      const subtitle = screen.getAllByText(carouselValues[0].subtitle!)
      const description = screen.getAllByText(carouselValues[0].description!)
      const buttonText = screen.getAllByText(carouselValues[0].buttonText!)

      expect(subtitle[0]).toBeInTheDocument()
      expect(description[0]).toBeInTheDocument()
      expect(buttonText[0]).toBeInTheDocument()
    })

    it('should render button', () => {
      setup()
      const carouselValues = Common?.args?.carouselItem || []
      expect(screen.getByRole('button', { name: carouselValues[0].buttonText })).toBeInTheDocument()
    })

    it('should render product image', () => {
      setup()

      const image = screen.getAllByTestId('product-image')
      expect(image[0]).toHaveAttribute('alt', 'image Alt text')
    })

    it('should move to next slide', () => {
      setup()
      expect(screen.getByRole('button', { name: 'Next' })).toBeVisible()
    })

    it('should move to previous slide', () => {
      setup()
      expect(screen.getByRole('button', { name: 'Previous' })).toBeVisible()
    })

    it('mobile', async () => {
      window.matchMedia = createMatchMedia(500)
      setup()
      const carouselValues = Common?.args?.carouselItem || []

      const description = screen.getAllByText(carouselValues[0].description!)
      const buttontext = screen.getAllByText(carouselValues[0].buttonText!)

      expect(description[0]).toHaveStyle('font-size: 0.75rem')
      expect(buttontext[0]).toHaveStyle('font-size: 0.5rem')
    })

    it('Desktop', async () => {
      window.matchMedia = createMatchMedia(1000)
      setup()
      const carouselValues = Common?.args?.carouselItem || []

      const description = screen.getAllByText(carouselValues[0].description!)
      const buttontext = screen.getAllByText(carouselValues[0].buttonText!)

      expect(description[0]).toHaveStyle('font-size: 1rem')
      expect(buttontext[0]).toHaveStyle('font-size: 1rem')
    })
  })
})
