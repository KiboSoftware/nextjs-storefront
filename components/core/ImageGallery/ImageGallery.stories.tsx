import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { imageGalleryData } from '../../../__mocks__/imageGalleryDataMock'
import ImageGallery from './ImageGallery'

export default {
  title: 'Core/ImageGallery',
  component: ImageGallery,
  args: imageGalleryData,
} as ComponentMeta<typeof ImageGallery>

const Template: ComponentStory<typeof ImageGallery> = (args) => <ImageGallery {...args} />

export const Gallery = Template.bind({})

export const Zoomed = Template.bind({})
Zoomed.args = {
  isZoomed: true,
}
