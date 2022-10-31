import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import CmsComponent from './CmsComponent'

// Home
export default {
  title: 'Home/CmsComponent',
  component: CmsComponent,
} as ComponentMeta<typeof CmsComponent>

const Template: ComponentStory<typeof CmsComponent> = (args) => <CmsComponent {...args} />

export const Common = Template.bind({})
Common.args = {
  content: {
    small_banner: {
      title: 'Save up to 50%',
      _metadata: {
        uid: 'cs83e4eb0d334b088f',
      },
      subtitle: 'Valid until tomorrow!',
      call_to_action_link: {
        title: 'Shop Now',
        href: '/category/deals',
      },
    },
  },
}
