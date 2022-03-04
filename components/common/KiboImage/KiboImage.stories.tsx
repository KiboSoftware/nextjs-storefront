import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import KiboImage from './KiboImage'
import Logo from '@/public/kibo_logo.png'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Common/KiboImage',
  component: KiboImage,
} as ComponentMeta<typeof KiboImage>

const Template: ComponentStory<typeof KiboImage> = (args) => <KiboImage {...args} />

export const Common = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Common.args = {
  src: Logo,
  alt: 'test-alt-text',
  width: '100%',
  height: '100%',
}
