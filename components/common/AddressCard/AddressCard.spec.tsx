import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './AddressCard.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

describe('[component] - AddressCard', () => {
  it('should display the Address Card if Props is passed', () => {
    render(<Common {...Common.args} />)
    const AddressCardData = Common?.args

    // expect(screen.getByText(AddressCardData?.title as string)).toBeVisible()
    expect(
      screen.getByText(`${AddressCardData?.firstName} ${AddressCardData?.lastNameOrSurname}`)
    ).toBeVisible()
    expect(screen.getByText(AddressCardData?.address1 as string)).toBeVisible()
    expect(screen.getByText(AddressCardData?.address2 as string)).toBeVisible()
    expect(screen.getByText(AddressCardData?.cityOrTown as string)).toBeVisible()
    expect(screen.getByText(AddressCardData?.stateOrProvince as string)).toBeVisible()
    expect(screen.getByText(AddressCardData?.postalOrZipCode as string)).toBeVisible()
  })
})
