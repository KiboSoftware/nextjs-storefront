import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import KiboLogo from './KiboLogo'
import Logo from '@/public/kibo_logo.png'

export default {
  title: 'Common/KiboLogo',
  component: KiboLogo,
} as ComponentMeta<typeof KiboLogo>

const Template: ComponentStory<typeof KiboLogo> = (args) => <KiboLogo {...args} />

export const Common = Template.bind({})

Common.args = {
  logo: Logo,
  alt: 'kibo logo',
}
