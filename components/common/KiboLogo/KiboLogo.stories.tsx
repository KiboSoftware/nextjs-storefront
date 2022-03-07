import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import KiboLogo from './KiboLogo'
import Logo from '@/public/kibo_logo.png'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Common/KiboLogo',
  component: KiboLogo,
} as ComponentMeta<typeof KiboLogo>

const Template: ComponentStory<typeof KiboLogo> = (args) => <KiboLogo {...args} />

export const Common = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Common.args = {
  logo: Logo,
  alt: 'kibo logo',
}
