/* eslint-disable @typescript-eslint/no-var-requires */
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import StoreFinderIcon from './StoreFinderIcon'
import { renderWithQueryClient } from '@/__test__/utils'
import { ModalContextProvider, DialogRoot } from '@/context'

const setup = () => {
  renderWithQueryClient(
    <ModalContextProvider>
      <DialogRoot />
      <StoreFinderIcon size="large" />
    </ModalContextProvider>
  )
}

const dataMock = {
  name: 'test-name',
  address: {
    cityOrTown: 'test-ciy',
    stateOrProvince: 'test-state',
  },
}

jest.mock('@/hooks', () => ({
  usePurchaseLocationQueries: jest.fn().mockImplementation(() => ({
    data: dataMock,
  })),
}))

const StoreLocatorDialogMock = () => <div data-testid="StoreLocatorDialogMock"></div>
jest.mock(
  '@/components/dialogs/Store/StoreLocatorDialog/StoreLocatorDialog',
  () => () => StoreLocatorDialogMock()
)

describe('[component] StoreFinderIcon component', () => {
  it('should render the component', () => {
    setup()
    expect(screen.getByText(/test-name/)).toBeVisible()
  })

  it('should render the myStoreModal on click', async () => {
    setup()
    const user = userEvent.setup()
    await user.click(screen.getByText(/test-name/))

    expect(screen.getByText(/my-store/)).toBeVisible()
  })

  it('should render the storeLocatorModal on click if no store is selected', async () => {
    dataMock.name = ''
    dataMock.address = {
      cityOrTown: '',
      stateOrProvince: '',
    }
    setup()
    const user = userEvent.setup()
    await user.click(screen.getByText(/find-a-store/))

    expect(screen.getByTestId(/StoreLocatorDialogMock/)).toBeVisible()
  })
})
