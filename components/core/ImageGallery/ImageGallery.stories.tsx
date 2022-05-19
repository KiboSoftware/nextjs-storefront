import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { imageGalleryData } from '../../../__mocks__/stories/imageGalleryDataMock'
import ImageGallery from './ImageGallery'

export default {
  title: 'Core/ImageGallery',
  component: ImageGallery,
  args: imageGalleryData,
} as ComponentMeta<typeof ImageGallery>

const Template: ComponentStory<typeof ImageGallery> = (args: any) => <ImageGallery {...args} />

export const Gallery = Template.bind({})

export const CustomMaximumThumbnailCount = Template.bind({})

CustomMaximumThumbnailCount.args = {
  thumbnailDisplayCount: 3,
}

export const OneImage = Template.bind({})
OneImage.args = {
  images: [
    {
      altText: 'kibo-image-thumbnail-1',
      imageUrl:
        'https://imgs.search.brave.com/xcGjA2DBp8pxtYWKKHXQUlMMJTpniR8GmVFnhCMme4Y/rs:fit:850:995:1/g:ce/aHR0cHM6Ly9uMy5z/ZGxjZG4uY29tL2lt/Z3MvYS85L2QvVHJl/bmRmdWxsLUJsYWNr/LVNwb3J0cy1TaG9l/cy1TREw5NzUyNTAy/NzgtMS1mMDU4YS5q/cGc',
    },
  ],
}

export const Zoomed = Template.bind({})
Zoomed.args = {
  isZoomed: true,
}

export const NoImage = Template.bind({})
NoImage.args = {
  images: [],
}
