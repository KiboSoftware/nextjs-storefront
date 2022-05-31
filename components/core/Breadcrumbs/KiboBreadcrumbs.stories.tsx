import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import KiboBreadcrumbs from './KiboBreadcrumbs'

const breadcrumbList = [
  {
    text: 'Home',
    link: '/',
  },
  {
    text: 'Sports',
    link: '/sports',
  },
  {
    text: 'Shoes',
    link: '/sports/shoes',
  },
]

export default {
  title: 'Core/Breadcrumbs',
  component: KiboBreadcrumbs,
} as ComponentMeta<typeof KiboBreadcrumbs>

const Template: ComponentStory<typeof KiboBreadcrumbs> = (args) => <KiboBreadcrumbs {...args} />

export const common = Template.bind({})
common.args = {
  breadcrumbs: breadcrumbList,
  separator: '|',
}
