import { composeStories } from '@storybook/testing-react'
import { fireEvent, render, screen } from '@testing-library/react'

import * as stories from './ViewAccountDetailsDialog.stories'
import { b2BAccountHierarchyResult } from '@/__mocks__/stories'
import { ModalContextProvider } from '@/context'

const { Common } = composeStories(stories)

const onCloseMock = jest.fn()

describe('[components]  ViewAccountDetailsDialog Dialog', () => {
  const setup = () => {
    render(
      <Common
        {...Common.args}
        b2BAccount={b2BAccountHierarchyResult?.accounts?.[1]}
        onClose={onCloseMock}
      />,
      {
        wrapper: ModalContextProvider,
      }
    )

    return {
      onCloseMock,
    }
  }

  it('should render component', async () => {
    render(<Common {...Common.args} formTitle="View account" />)

    const viewAccountHierarchyHeading = screen.getByText('View account')
    expect(viewAccountHierarchyHeading).toBeVisible()

    const cancelButton = screen.getByText('cancel')
    expect(cancelButton).toBeVisible()
  })

  it('should close modal when user clicks on Cancel button', async () => {
    const { onCloseMock } = setup()

    const cancelButton = screen.getByText('cancel')
    expect(cancelButton).toBeVisible()

    fireEvent.click(cancelButton)
    expect(onCloseMock).toHaveBeenCalledTimes(1)
  })
})
