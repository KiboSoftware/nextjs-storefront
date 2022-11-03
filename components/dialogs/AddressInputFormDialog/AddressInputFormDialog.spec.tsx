import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './AddressInputFormDialog.stories'

const { Common } = composeStories(stories)

const addressFormMock = () => <div data-testid="address-input-form-dialog" />
jest.mock('@/components/common/AddressForm/AddressForm', () => addressFormMock)

const renderComponent = () => {
  return render(<Common {...Common.args} />)
}

describe('[components]  AddressInputForm Dialog', () => {
  const setup = () => renderComponent()

  it('should render component', () => {
    setup()

    const closeIcon = screen.getByRole('button', { name: 'close' })
    const addressInputFormDialogComponent = screen.getByTestId('address-input-form-dialog')

    expect(closeIcon).toBeVisible()
    expect(addressInputFormDialogComponent).toBeVisible()
  })

  it('should have a title', () => {
    setup()

    const dialogHeading = screen.getByRole('heading', { name: 'Add new address' })

    expect(dialogHeading).toBeVisible()
  })

  it('should render save and cancel button', () => {
    setup()

    const saveButton = screen.getByRole('button', { name: 'save' })
    const cancelButton = screen.getByRole('button', { name: 'cancel' })

    expect(saveButton).toBeVisible()
    expect(cancelButton).toBeVisible()
  })
})
