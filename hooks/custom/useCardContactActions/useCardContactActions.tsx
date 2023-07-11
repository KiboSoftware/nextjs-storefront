import {
  useGetCards,
  useGetCustomerAddresses,
  useCreateCustomerCard,
  useUpdateCustomerCard,
  useCreateCustomerAddress,
  useUpdateCustomerAddress,
} from '@/hooks'
import { BillingAddress, CardType } from '@/lib/types'

export const useCardContactActions = (userId: number) => {
  const { data: cards } = useGetCards(userId)
  const { data: contacts } = useGetCustomerAddresses(userId)

  const { createCustomerCard } = useCreateCustomerCard()
  const { updateCustomerCard } = useUpdateCustomerCard()
  const { createCustomerAddress } = useCreateCustomerAddress()
  const { updateCustomerAddress } = useUpdateCustomerAddress()

  const handleSave = async (
    address: BillingAddress,
    card: CardType,
    isUpdatingAddress: boolean
  ) => {
    let response

    // Add update address
    if (isUpdatingAddress) {
      response = await updateCustomerAddress.mutateAsync(address)
    } else {
      response = await createCustomerAddress.mutateAsync(address)
    }

    const params = {
      accountId: card.accountId,
      cardId: card.cardId,
      cardInput: card.cardInput,
    }
    params.cardInput.contactId = response.id

    // Add update card
    if (card.cardId) {
      await updateCustomerCard.mutateAsync(params)
    } else {
      await createCustomerCard.mutateAsync(params)
    }
  }

  return {
    cards,
    contacts,
    handleSave,
  }
}
