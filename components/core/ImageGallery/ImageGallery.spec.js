import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'

import { imageGalleryData } from '../../../__mocks__/stories/imageGalleryDataMock'
import * as stories from './ImageGallery.stories'

const { Gallery, Zoomed } = composeStories(stories)

const setupGallery = () => {
  const user = userEvent.setup()
  render(<Gallery {...Gallery.args} />)
  return {
    user,
  }
}

const setupZoomedGallery = () => {
  const user = userEvent.setup()
  render(<Zoomed {...Zoomed.args} />)
  return {
    user,
  }
}

const setUpTouchElement = () => {
  Element.prototype.getBoundingClientRect = jest.fn(() => {
    return {
      width: 300,
      height: 300,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    }
  })
}

const createTouchStartEvent = (value) => {
  return new TouchEvent('touchstart', {
    changedTouches: [value],
  })
}

const createTouchEndEvent = (value) => {
  return new TouchEvent('touchend', {
    changedTouches: [value],
  })
}

const setUpLeftSwipe = () => {
  return {
    touchStartEvent: createTouchStartEvent({
      screenX: 210,
      screenY: 248,
    }),
    touchEndEvent: createTouchEndEvent({
      screenX: 118,
      screenY: 254,
    }),
  }
}

const setUpRightSwipe = () => {
  return {
    touchStartEvent: createTouchStartEvent({
      screenX: 80,
      screenY: 280,
    }),
    touchEndEvent: createTouchEndEvent({
      screenX: 200,
      screenY: 287,
    }),
  }
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

      const selectedImage = screen.getByTestId(/selected-image/i)

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
      const { user } = setupGallery()

      Element.prototype.scrollBy = jest.fn()

      const downArrowButton = screen.getByRole('button', {
        name: /down/i,
      })

      await user.click(downArrowButton)

      const upArrowButton = await screen.findByRole('button', {
        name: /up/i,
      })

      expect(upArrowButton).toBeVisible()
    })

    it('should change the selected thumbnail on click', async () => {
      const { user } = setupGallery()

      const thumbnails = screen.getAllByLabelText(/kibo-image-thumbnail/)

      thumbnails.forEach((thumbnail, i) => {
        if (i === 0) expect(thumbnail).toHaveAttribute('aria-selected', 'true')
        else expect(thumbnail).toHaveAttribute('aria-selected', 'false')
      })

      await user.click(thumbnails[1])

      thumbnails.forEach((thumbnail, i) => {
        if (i === 1) expect(thumbnail).toHaveAttribute('aria-selected', 'true')
        else expect(thumbnail).toHaveAttribute('aria-selected', 'false')
      })
    })

    it('should call handleSwipe method on touch swipe', () => {
      setupGallery()
      setUpTouchElement()

      let initialImage = screen.getByTestId(/selected-image/)

      expect(initialImage).toHaveAttribute('alt', Gallery.args.images[0].altText)

      const element = screen.getByTestId('gestureZone')

      // testing left swipe
      const { touchStartEvent: leftStart, touchEndEvent: leftEnd } = setUpLeftSwipe()

      act(() => {
        element.dispatchEvent(leftStart)
        element.dispatchEvent(leftEnd)
      })

      initialImage = screen.getByTestId(/selected-image/)
      expect(initialImage).toHaveAttribute('alt', Gallery.args.images[1].altText)

      // testing right swipe
      const { touchStartEvent: rightStart, touchEndEvent: rightEnd } = setUpRightSwipe()

      act(() => {
        element.dispatchEvent(rightStart)
        element.dispatchEvent(rightEnd)
      })

      initialImage = screen.getByTestId(/selected-image/)
      expect(initialImage).toHaveAttribute('alt', Gallery.args.images[0].altText)
    })
  })

  describe('Zoomed Gallery', () => {
    it('should render title', () => {
      setupZoomedGallery()

      expect(screen.getByText(Gallery.args.title)).toBeVisible()
    })

    it('should change the selected thumbnail on left/right arrow click', async () => {
      const { user } = setupZoomedGallery()

      const thumbnails = screen.getAllByLabelText(/kibo-image-thumbnail/)

      const previousButton = screen.getByRole('button', {
        name: /previous/i,
      })

      const nextButton = screen.getByRole('button', {
        name: /next/i,
      })

      await user.click(nextButton)

      expect(thumbnails[1]).toHaveAttribute('aria-selected', 'true')

      await user.click(previousButton)

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
