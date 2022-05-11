import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './AddressCard.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

describe('[component] - AddressCard', () => {
  it('should display the address', () => {
    render(<Common {...Common.args} />)

    expect(screen.getByText(Common.args.title)).toBeVisible()
    expect(screen.getByText(Common.args.address1)).toBeVisible()
    expect(screen.getByText(new RegExp(Common.args.address2))).toBeVisible()
    expect(screen.getByText(Common.args.cityOrTown)).toBeVisible()
    expect(screen.getByText(Common.args.stateOrProvince)).toBeVisible()
    expect(screen.getByText(Common.args.postalOrZipCode)).toBeVisible()
  })
})
