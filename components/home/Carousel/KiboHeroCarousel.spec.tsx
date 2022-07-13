/** @format */

import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './KiboHeroCarousel.stories'

const { Common } = composeStories(stories)

describe('checkout Component', () => {
  const setup = () => render(<Common />)

  describe('checkout', () => {
    it('should render next', () => {
      setup()
      const nexticon = screen.getAllByTestId('FiberManualRecordIcon')
      expect(nexticon[0]).toBeVisible()
    })

    it('should render component', () => {
      setup()

      const subtitle = screen.getAllByText(/Save up to 50%/i)
      const text = screen.getAllByText(/Check Off Your List Event/i)
      const description = screen.getAllByText(/Shop early to get your holiday gifts on time./i)
      const buttonText = screen.getAllByText(/Shop Holiday Items on Sale/i)
      const body = screen.getAllByText(/Ends Midnight/i)
      const link = screen.getAllByText(/Shop Sale/i)

      expect(subtitle[0]).toBeInTheDocument()
      expect(text[0]).toBeInTheDocument()
      expect(description[0]).toBeInTheDocument()
      expect(buttonText[0]).toBeInTheDocument()
      expect(body[0]).toBeInTheDocument()
      expect(link[0]).toBeInTheDocument()
    })

    it('should render button', () => {
      setup()
      expect(screen.getByRole('button', { name: 'Shop Holiday Items on Sale' })).toBeTruthy()
    })
    it('should render nav icons', () => {
      setup()

      expect(screen.getByRole('button', { name: 'Next' })).toBeTruthy()
      expect(screen.getByRole('button', { name: 'Previous' })).toBeTruthy()
    })
    it('should render text', async () => {
      setup()
      const text = await screen.findAllByText('Save up to 50%')
      console.log('text', text)
      expect(text[0]).toBeTruthy()
    })
  })
})
