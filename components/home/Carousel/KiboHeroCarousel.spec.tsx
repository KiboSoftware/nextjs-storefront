import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './KiboHeroCarousel.stories'

const { Common } = composeStories(stories)

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

      const Subtitle = screen.getAllByText(Common?.args?.carouselItem[0].subtitle)
      const description = screen.getAllByText(Common?.args?.carouselItem[0].description)
      const buttonText = screen.getAllByText(Common?.args?.carouselItem[0].buttonText)
      const link = screen.getAllByText(Common?.args?.topProps.link)

      expect(Subtitle[0]).toBeInTheDocument()
      expect(description[0]).toBeInTheDocument()
      expect(buttonText[0]).toBeInTheDocument()
      expect(link[0]).toBeInTheDocument()
    })

    it('should render button', () => {
      setup()
      expect(screen.getByRole('button', { name: 'Shop Holiday Items on Sale' })).toBeInTheDocument()
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

    it('should  redirect on button click', async () => {
      setup()
      const text = await screen.findAllByText('Save up to 50%')
      expect(text[0]).toBeInTheDocument()
    })
  })
})
