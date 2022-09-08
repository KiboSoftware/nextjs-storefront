import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import Footer from './Footer'
import { footerConfig } from '@/lib/constants'

export default {
  title: 'Layout/Footer',
  component: Footer,
} as ComponentMeta<typeof Footer>

const Template: ComponentStory<typeof Footer> = (args) => <Footer {...args} />

export const Common = Template.bind({})
Common.args = {
  ...footerConfig,
}
