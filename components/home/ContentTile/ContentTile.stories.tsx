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
      imgSource: 'https://cdn-sb.mozu.com/26507-m1/cms/files/ebdbfa1e-a3a1-4035-8aa3-e90f59a9478b',
      title: 'Up to 50% off running gear',
      subtitle: 'Save on selected footwear, equipment and more',
      link1: { title: 'TOP DEALS', url: '/category/deals' },
      link2: { title: 'CLUB DEALS', url: '/category/deals' },
      link3: { title: 'FOOTWEAR DEALS', url: '/category/deals' },
    },
    {
      imgSource: 'https://cdn-sb.mozu.com/26507-m1/cms/files/beaf1756-46ed-4ff5-bc20-49a2116b620e',
      title: 'Up to 50% off Nike gear',
      subtitle: 'Save big on clothing and footwear from Nike',
      link1: { title: 'SHOP MENS', url: '/category/deals' },
      link2: { title: 'SHOP WOMENS', url: '/category/deals' },
      link3: { title: 'SHOP KIDS', url: '/category/deals' },
    },
  ],
  smallTileProps: [
    {
      imgSource: 'https://cdn-sb.mozu.com/26507-m1/cms/files/9a4155da-c985-44ef-9ac9-fa9cb3bde811',
      title: 'Dress for Any Occasion',
      subtitle: 'Dress your best and shine brighter than the sun',
      link1: { title: 'MENS', url: '/category/deals' },
      link2: { title: 'WOMENS', url: '/category/deals' },
      link3: { title: 'KIDS', url: '/category/deals' },
    },
    {
      imgSource: 'https://cdn-sb.mozu.com/26507-m1/cms/files/4b2f2a04-765e-4d74-b83b-2df909cc48a6',
      title: 'Plenty to Play With',
      subtitle: 'Unwind this summer with deals on top gear',
      link1: { title: 'BEACH', url: '/category/deals' },
      link2: { title: 'BBQ', url: '/category/deals' },
      link3: { title: 'HIKING', url: '/category/deals' },
    },
    {
      imgSource: 'https://cdn-sb.mozu.com/26507-m1/cms/files/d7127fd3-3656-4fea-bff7-47063154459c',
      title: 'Power to a Healthier You',
      subtitle: 'Clothing and gear for strength and cardio',
      link1: { title: 'STRENGTH TRAINING', url: '/category/deals' },
      link2: { title: 'CARDIO WORKOUT', url: '/category/deals' },
      link3: { title: 'FITNESS DEALS', url: '/category/deals' },
    },
    {
      imgSource: 'https://cdn-sb.mozu.com/26507-m1/cms/files/8f3ec3c0-d72b-4369-bf0b-07f3849ad567',
      title: 'Get Your Golf On',
      subtitle: 'Tee up and bring your A-game',
      link1: { title: 'GOLF SHIRTS', url: '/category/deals' },
      link2: { title: 'GOLF PANTS', url: '/category/deals' },
      link3: { title: 'GOLF FOOTWEAR', url: '/category/deals' },
    },
  ],
}
