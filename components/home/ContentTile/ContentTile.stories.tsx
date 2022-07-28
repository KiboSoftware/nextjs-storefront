import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ContentTile from './ContentTile'

export default {
  title: 'Home/ContentTile',
  component: ContentTile,
} as ComponentMeta<typeof ContentTile>

const Template: ComponentStory<typeof ContentTile> = (args) => <ContentTile {...args} />

export const Common = Template.bind({})

Common.args = {
  largeTileProps: [
    {
      imageSource:
        'https://cdn-sb.mozu.com/26507-m1/cms/files/ebdbfa1e-a3a1-4035-8aa3-e90f59a9478b',
      title: 'Up to 50% off running gear',
      subtitle: 'Save on selected footwear, equipment and more',
      link1: 'TOP DEALS',
      link2: 'CLUB DEALS',
      link3: 'FOOTWEAR DEALS',
    },
    {
      imageSource:
        'https://cdn-sb.mozu.com/26507-m1/cms/files/beaf1756-46ed-4ff5-bc20-49a2116b620e',
      title: 'Up to 50% off Nike gear',
      subtitle: 'Save big on clothing and footwear from Nike',
      link1: 'SHOP MENS',
      link2: 'SHOP WOMENS',
      link3: 'SHOP KIDS',
    },
  ],
  smallTileProps: [
    {
      imageSource:
        'https://cdn-sb.mozu.com/26507-m1/cms/files/9a4155da-c985-44ef-9ac9-fa9cb3bde811',
      title: 'Dress for Any Occasion',
      subtitle: 'Dress your best and shine brighter than the sun',
      link1: 'MENS',
      link2: 'WOMENS',
      link3: 'KIDS',
    },
    {
      imageSource:
        'https://cdn-sb.mozu.com/26507-m1/cms/files/4b2f2a04-765e-4d74-b83b-2df909cc48a6',
      title: 'Plenty to Play With',
      subtitle: 'Unwind this summer with deals on top gear',
      link1: 'BEACH',
      link2: 'BBQ',
      link3: 'HIKING',
    },
    {
      imageSource:
        'https://cdn-sb.mozu.com/26507-m1/cms/files/d7127fd3-3656-4fea-bff7-47063154459c',
      title: 'Power to a Healthier You',
      subtitle: 'Clothing and gear for strength and cardio',
      link1: 'STRENGTH TRAINING',
      link2: 'CARDIO WORKOUT',
      link3: 'FITNESS DEALS',
    },
    {
      imageSource:
        'https://cdn-sb.mozu.com/26507-m1/cms/files/8f3ec3c0-d72b-4369-bf0b-07f3849ad567',
      title: 'Get Your Golf On',
      subtitle: 'Tee up and bring your A-game',
      link1: 'GOLF SHIRTS',
      link2: 'GOLF PANTS',
      link3: 'GOLF FOOTWEAR',
    },
  ],
}
