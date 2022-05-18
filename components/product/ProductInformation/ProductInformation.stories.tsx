import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ProductInformation from './ProductInformation'

import type { CrProductOption } from '@/lib/gql/types'

const productFullDescription =
  'a Sleek and subtle, these Smith Parallel polarized interchangeable sunglasses allow unobstructed peripheral vision—ideal for trail running, cycling or a day on the boat.&nbsp;\n<div><ul><li><span style="font-size: 12px;">Polarized lenses reduce 99% of visible glare from water, snow, sand and pavement for increased visual acuity and decreased eye strain&nbsp;</span><br></li><li><span style="font-size: 12px;">Each frame includes 1 set of polarized lenses (tint depends on frame color) and 2 additional sets of lenses for a total of 3 sets of lenses&nbsp;</span><br></li><li><span style="font-size: 12px;">Brown frames feature polarized brown lenses that block reflected glare while providing increased depth perception and reducing eye strain&nbsp;</span><br></li><li><span style="font-size: 12px;">Black frames feature polarized gray lenses that block reflected glare while preserving natural colors in order to provide true color definition&nbsp;</span><br></li></ul></div>'

const options: CrProductOption[] = [
  {
    attributeFQN: 'Tenant~Availability',
    name: 'Availability',
    value: 'Usually Ships in 24 Hours',
  },
  {
    attributeFQN: 'Tenant~Rating',
    name: 'Rating',
    value: '4',
  },
  {
    attributeFQN: 'Tenant~Brand',
    name: 'Brand',
    value: 'Mystic',
  },
  {
    attributeFQN: 'Tenant~color',
    name: 'Color',
    value: 'Red, Tortoise',
  },
  {
    attributeFQN: 'Tenant~Size',
    name: 'Size',
    value: 'Small',
  },
]

export default {
  title: 'Product/ProductInformation',
  component: ProductInformation,
} as ComponentMeta<typeof ProductInformation>

const Template: ComponentStory<typeof ProductInformation> = (args) => (
  <ProductInformation {...args} />
)

export const Common = Template.bind({})
Common.args = {
  productFullDescription: productFullDescription,
  options,
}
