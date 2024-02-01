import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'

import * as stories from './KiboHeroCarousel.stories'

const { Common } = composeStories(stories)

const mockMatchMedia = (width: number) => ({
  matches: width !== undefined,
  media: `(min-width: ${width}px)`,
  addListener: jest.fn(),
  removeListener: jest.fn(),
})

describe('Component - [KiboHeroCarousel]', () => {
  const setup = (width = 1024) => {
    window.matchMedia = jest.fn().mockImplementation((query) => mockMatchMedia(width as number))
    return render(<Common {...Common.args} />)
  }

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
    expect(image[0]).toHaveAttribute('alt', 'image Alt text')
  })

  it('should move to next slide', () => {
    setup()
    expect(screen.getByRole('button', { name: 'Next slide' })).toBeVisible()
  })

  it('should move to previous slide', () => {
    setup()
    expect(screen.getByRole('button', { name: 'Go to last slide' })).toBeVisible()
  })

  it('should render mobileurl on mobile screen ', async () => {
    setup(500)
    const carouselValues = Common?.args?.carouselItem || []

    const mobileImage = screen.getAllByRole('img')
    await waitFor(() => {
      expect(mobileImage[0]).toHaveAttribute('src', carouselValues[0].mobileImageUrl)
    })
  })

  it('should render imageUrl on desktop screen', async () => {
    setup(1000)

    const carouselValues = Common?.args?.carouselItem || []

    const desktopImage = screen.getAllByRole('img')
    await waitFor(() => {
      expect(desktopImage[0]).toHaveAttribute('src', carouselValues[0].imageUrl)
    })
  })
})
