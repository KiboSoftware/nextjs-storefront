import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import { imageGalleryData } from '../../../__mocks__/imageGalleryDataMock'
import * as stories from './ImageGallery.stories'

const { Gallery, Zoomed } = composeStories(stories)

const setupGallery = () => {
  render(<Gallery {...Gallery.args} />)
}

const setupZoomedGallery = () => {
  render(<Zoomed {...Zoomed.args} />)
}

describe('[component] ImageGallery component', () => {
  describe('Gallery without Zoom', () => {
    it('should not render title', () => {
      setupGallery()

      expect(screen.getByText(Gallery.args.title)).not.toBeVisible()
    })

    it('should render all the images provided by props', () => {
      setupGallery()

      const thumbnails = screen.getAllByLabelText(/kibo-image-thumbnail/)

      expect(thumbnails).toHaveLength(imageGalleryData.images.length)
    })

    it('should render the selected image', () => {
      setupGallery()

      const selectedImage = screen.getByTestId(/selected-image/)

      expect(selectedImage).toBeVisible()
    })

    it('should render the downArrowButton for thumbnails when thumnail count > 4', () => {
      setupGallery()

      const downArrowButton = screen.getByRole('button', {
        name: /down/i,
      })

      expect(downArrowButton).toBeVisible()
    })

    it('should call handleVerticalSlider if clicked on downArrowButton', async () => {
      setupGallery()

      Element.prototype.scrollBy = jest.fn()

      const downArrowButton = screen.getByRole('button', {
        name: /down/i,
      })

      userEvent.click(downArrowButton)

      const upArrowButton = await screen.findByRole('button', {
        name: /up/i,
      })

      expect(upArrowButton).toBeVisible()
    })

    it('should change the selected thumbnail on click', () => {
      setupGallery()

      const thumbnails = screen.getAllByLabelText(/kibo-image-thumbnail/)

      thumbnails.forEach((thumbnail, i) => {
        if (i === 0) expect(thumbnail).toHaveAttribute('aria-selected', 'true')
        else expect(thumbnail).toHaveAttribute('aria-selected', 'false')
      })

      userEvent.click(thumbnails[1])

      thumbnails.forEach((thumbnail, i) => {
        if (i === 1) expect(thumbnail).toHaveAttribute('aria-selected', 'true')
        else expect(thumbnail).toHaveAttribute('aria-selected', 'false')
      })
    })
  })

  describe('Zoomed Gallery', () => {
    it('should render title', () => {
      setupZoomedGallery()

      expect(screen.getByText(Gallery.args.title)).toBeVisible()
    })

    it('should change the selected thumbnail on left/right arrow click', () => {
      setupZoomedGallery()

      const thumbnails = screen.getAllByLabelText(/kibo-image-thumbnail/)

      const previousButton = screen.getByRole('button', {
        name: /previous/i,
      })

      const nextButton = screen.getByRole('button', {
        name: /next/i,
      })

      userEvent.click(nextButton)

      expect(thumbnails[1]).toHaveAttribute('aria-selected', 'true')

      userEvent.click(previousButton)

      expect(thumbnails[0]).toHaveAttribute('aria-selected', 'true')
    })

    it('should render zoom controls and call the respective functions', () => {
      setupZoomedGallery()

      const reset = screen.getByRole('button', {
        name: /reset/i,
      })
      const zoomIn = screen.getByRole('button', {
        name: /zoom in/i,
      })
      const zoomOut = screen.getByRole('button', {
        name: /zoom out/i,
      })

      expect(reset).toBeVisible()
      expect(zoomIn).toBeVisible()
      expect(zoomOut).toBeVisible()
    })
  })
})
