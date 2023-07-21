import { renderHook, act } from '@testing-library/react-hooks'

import { useCardContactActions } from './useCardContactActions'
import { customerAccountCardsMock, userAddressMock } from '@/__mocks__/stories'
import {
  useCreateCustomerCard,
  useUpdateCustomerCard,
  useCreateCustomerAddress,
  useUpdateCustomerAddress,
} from '@/hooks'
import { BillingAddress, CardType } from '@/lib/types'

const createOrUpdateAddressMutateAsyncMock = jest.fn(() => ({ id: 'mock-id' }))
const createOrUpdateCardMutateAsyncMock = jest.fn()
// Mock the necessary dependencies
jest.mock('@/hooks', () => ({
  useGetCards: jest.fn(() => customerAccountCardsMock.customerAccountCards),
  useGetCustomerAddresses: jest.fn(() => userAddressMock.customerAccountContacts),
  useCreateCustomerCard: jest.fn(() => ({
    createCustomerCard: { mutateAsync: createOrUpdateCardMutateAsyncMock },
  })),
  useUpdateCustomerCard: jest.fn(() => ({
    updateCustomerCard: { mutateAsync: createOrUpdateCardMutateAsyncMock },
  })),
  useCreateCustomerAddress: jest.fn(() => ({
    createCustomerAddress: { mutateAsync: createOrUpdateAddressMutateAsyncMock },
  })),
  useUpdateCustomerAddress: jest.fn(() => ({
    updateCustomerAddress: { mutateAsync: createOrUpdateAddressMutateAsyncMock },
  })),
}))

describe('useCardContactActions', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const address: BillingAddress = {
    accountId: 1012,
    contactId: 1,
    customerContactInput: {
      accountId: 1012,
    },
  }
  const card: CardType = {
    accountId: 1,
    cardId: '',
    cardInput: {
      id: '123456789',
      contactId: 0,
      cardNumberPart: '1111',
      cardType: 'Visa',
      expireMonth: 12,
      expireYear: 2028,
      isDefaultPayMethod: false,
    },
  }

  it('should handle saving a new address and a new card', async () => {
    const { result } = renderHook(() => useCardContactActions(1012))
    const { createCustomerAddress } = useCreateCustomerAddress()
    const { createCustomerCard } = useCreateCustomerCard()

    const isUpdatingAddress = false

    await act(async () => {
      await result.current.handleSave(address, card, isUpdatingAddress)
    })

    expect(createCustomerAddress.mutateAsync).toHaveBeenCalledWith(address)
    expect(createCustomerCard.mutateAsync).toHaveBeenCalledWith({
      accountId: 1,
      cardId: '',
      cardInput: { ...card.cardInput, contactId: 'mock-id' },
    })
  })

  it('should handle saving an updated address and an existing card', async () => {
    const { result } = renderHook(() => useCardContactActions(1012))
    const { updateCustomerCard } = useUpdateCustomerCard()
    const { updateCustomerAddress } = useUpdateCustomerAddress()

    const isUpdatingAddress = true

    await act(async () => {
      await result.current.handleSave(address, { ...card, cardId: 'card2' }, isUpdatingAddress)
    })

    expect(updateCustomerAddress.mutateAsync).toHaveBeenCalledWith(address)
    expect(updateCustomerCard.mutateAsync).toHaveBeenCalledWith({
      accountId: 1,
      cardId: 'card2',
      cardInput: { ...card.cardInput, contactId: 'mock-id' },
    })
  })
})
