import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './KiboPagination.stories'

const { Common } = composeStories(stories)
const user = userEvent.setup()
describe('[components] - SearchBar', () => {
  it('should render KiboPagination component', async () => {
    const pageSize = Common.args?.pageSize as number
    const onPaginationChangeMock = jest.fn()

    render(<Common onPaginationChange={onPaginationChangeMock} />)

    // Assert that the pagination component is rendered
    const paginationComponent = screen.getByRole('navigation')
    expect(paginationComponent).toBeInTheDocument()

    // Simulate a page change by clicking on a page button
    const nextPage = 2
    user.click(screen.getByRole('button', { name: `Go to page ${nextPage}` }))

    await waitFor(() => {
      // Assert that the onPaginationChange callback is called with the correct parameters
      expect(onPaginationChangeMock).toHaveBeenCalledWith({
        pageSize,
        startIndex: pageSize * (nextPage - 1),
      })
    })
  })
})
