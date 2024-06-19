import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'

import '@testing-library/jest-dom'
import * as stories from './MobileHeader.stories' // import all stories from the stories file
import { renderWithQueryClient } from '@/__test__/utils'

const { Common } = composeStories(stories)

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn().mockReturnValue(false),
}))

const setCookie = (name: any, value: any) => {
  document.cookie = `${name}=${value}; path=/`
}
describe('[component] MobileHeader component', () => {
  it('should render the component', async () => {
    renderWithQueryClient(<Common />)

    await waitFor(() => {
      expect(screen.getByTestId('MenuIcon')).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(screen.getByTestId('SearchIcon')).toBeInTheDocument()
    })
    await waitFor(() => {
      expect(screen.getByTestId('FmdGoodIcon')).toBeInTheDocument()
    })
    await waitFor(() => {
      expect(screen.getByTestId('ShoppingCartIcon')).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(screen.getByAltText('kibo-logo')).toBeInTheDocument()
    })
  })

  it('should hide StoreFinderIcon when cookie isCSR has value true', async () => {
    setCookie('isCSR', 'true')
    render(<Common {...Common.args} />)
    await waitFor(() => {
      expect(screen.queryByTestId('mobile-header-store-icon')).not.toBeInTheDocument()
    })
  })
})
