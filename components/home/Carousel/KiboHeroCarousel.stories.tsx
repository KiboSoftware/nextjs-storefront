import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import KiboHeroCarousel from './KiboHeroCarousel'

export default {
  title: 'home/KiboHeroCarousel',
  component: KiboHeroCarousel,
} as ComponentMeta<typeof KiboHeroCarousel>

const Template: ComponentStory<typeof KiboHeroCarousel> = () => <KiboHeroCarousel />

export const Common = Template.bind({})
