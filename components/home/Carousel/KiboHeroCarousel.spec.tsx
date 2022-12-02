import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
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

describe('Component - [KiboHeroCarousel]', () => {
  const setup = () => render(<Common {...Common.args} />)
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
    const image = screen.getAllByTestId('product-image')

    expect(subtitle[0]).toBeInTheDocument()
    expect(description[0]).toBeInTheDocument()
    expect(buttonText[0]).toBeInTheDocument()
    expect(screen.getByRole('button', { name: carouselValues[0].buttonText })).toBeInTheDocument()
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

  it('should render mobileurl on mobile screen ', async () => {
    window.matchMedia = createMatchMedia(500)
    setup()
    const carouselValues = Common?.args?.carouselItem || []

    const mobileImage = screen.getAllByRole('img')
    await waitFor(() => {
      expect(mobileImage[0]).toHaveAttribute('src', carouselValues[0].mobileImageUrl)
    })
  })

  it('should render imageUrl on desktop screen', async () => {
    window.matchMedia = createMatchMedia(1000)
    setup()

    const carouselValues = Common?.args?.carouselItem || []

    const desktopImage = screen.getAllByRole('img')
    await waitFor(() => {
      expect(desktopImage[0]).toHaveAttribute('src', carouselValues[0].imageUrl)
    })
  })
})
