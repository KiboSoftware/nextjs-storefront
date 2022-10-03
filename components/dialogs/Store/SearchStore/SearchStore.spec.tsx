import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './SearchStore.stories' // import all stories from the stories file
import { storeLocationGetters } from '@/lib/getters/storeLocationGetters'

import type { Location, Maybe } from '@/lib/gql/types'

const { Common } = composeStories(stories)

const searchBarMock = () => <input data-testid="search-bar-component" name="searchInput" />
jest.mock('@/components/common/SearchBar/SearchBar', () => () => searchBarMock())
const KiboRadioMock = () => <div data-testid="kibo-radio-mock" />
jest.mock('@/components/common/KiboRadio/KiboRadio', () => () => KiboRadioMock())

const onStoreByCurrentLocationMock = jest.fn()

describe('[components] Search Store', () => {
  const setup = () => {
    const user = userEvent.setup()
    render(<Common {...Common.args} onStoreByCurrentLocation={onStoreByCurrentLocationMock} />)
    return {
      user,
      onStoreByCurrentLocationMock,
    }
  }

  it('should render component', () => {
    setup()

    expect(screen.getByText(/zip-code/i)).toBeVisible()
    expect(screen.getByTestId('search-bar-component')).toBeVisible()
    expect(screen.getByRole('button', { name: /search/i })).toBeVisible()
    expect(screen.getByText(/use-current-location/i)).toBeVisible()
    expect(screen.getByText(/find-stores-within-miles/i)).toBeVisible()
    expect(screen.getByTestId('kibo-radio-mock')).toBeVisible()
  })

  it('should search by zipcode when user enter text in search bar and click on search button', async () => {
    const { user } = setup()

    const currentLocationButton = screen.getByRole('button', {
      name: /use-current-location/i,
    })
    expect(currentLocationButton).toBeVisible()
    await user.click(currentLocationButton)

    await waitFor(() => {
      expect(onStoreByCurrentLocationMock).toHaveBeenCalled()
    })
  })

  it('should display stores-within-miles message if location data present', async () => {
    setup()

    const location = storeLocationGetters.getLocations(
      Common.args?.spLocations as Maybe<Location>[]
    )
    expect(location).toHaveLength(1)
    expect(screen.getByText(/stores-within-miles/i)).toBeVisible()
  })
})
