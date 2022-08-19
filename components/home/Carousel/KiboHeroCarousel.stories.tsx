import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import KiboHeroCarousel from './KiboHeroCarousel'

export default {
  title: 'home/KiboHeroCarousel',
  component: KiboHeroCarousel,
  parameters: { layout: 'fullscreen' },
} as ComponentMeta<typeof KiboHeroCarousel>

const Template: ComponentStory<typeof KiboHeroCarousel> = (args) => <KiboHeroCarousel {...args} />

export const Common = Template.bind({})

const heroItems = [
  {
    imageUrl: 'https://cdn-sb.mozu.com/26507-m1/cms/files/655bb09f-e5f2-4027-8cf6-76d0363172d1',
    mobileImageUrl:
      'https://cdn-sb.mozu.com/26507-m1/cms/files/655bb09f-e5f2-4027-8cf6-76d0363172d1',
    imageAlt: 'image Alt text',
    title: 'Check Off Your List Event',
    subtitle: 'Save up to 50%',
    description: 'Shop early to get your holiday gifts on time.',
    buttonText: 'Shop Holiday Items on Sale',
    buttonLink: 'https://',
    contentPosition: 'right',
  },
  {
    imageUrl: 'https://cdn-sb.mozu.com/26507-m1/cms/files/7b763015-5d76-4c3c-a5fd-6a14a476b56c',
    mobileImageUrl:
      'https://cdn-sb.mozu.com/26507-m1/cms/files/7b763015-5d76-4c3c-a5fd-6a14a476b56c',
    imageAlt: 'image Alt text',
    title: 'Save upto 70%',
    subtitle: 'Check Off Your List Event',
    description: 'Shop early to get your holiday gifts on time.',
    buttonText: 'Shop Holiday Items on Sale',
    contentPosition: 'right',
    buttonLink: 'https://',
  },
]

Common.args = {
  carouselItem: heroItems,
}
