import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ListsTemplate from './ListsTemplate'
export default {
  title: 'Page Templates/B2b/ListsTemplate',
  component: ListsTemplate,
} as ComponentMeta<typeof ListsTemplate>

const Template: ComponentStory<typeof ListsTemplate> = () => <ListsTemplate />

export const Common = Template.bind({})

export const ListsTemplateMobile = Template.bind({})
ListsTemplateMobile.parameters = {
  viewport: {
    defaultViewport: 'iphone12promax',
  },
}
