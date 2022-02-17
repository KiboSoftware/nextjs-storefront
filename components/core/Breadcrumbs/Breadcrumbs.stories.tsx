import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import KiboBreadcrumbs from './Breadcrumbs'

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

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Core/Breadcrumbs',
  component: KiboBreadcrumbs,
} as ComponentMeta<typeof KiboBreadcrumbs>

const Template: ComponentStory<typeof KiboBreadcrumbs> = (args) => <KiboBreadcrumbs {...args} />

export const common = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
common.args = {
  breadcrumbs: breadcrumbList,
  separator: '|',
}
