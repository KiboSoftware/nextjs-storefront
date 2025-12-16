import { useAuthContext } from '@/context'
import {
  useGetCards,
  useGetCustomerAddresses,
  useCreateCustomerCard,
  useUpdateCustomerCard,
  useCreateCustomerAddress,
  useUpdateCustomerAddress,
} from '@/hooks'
import { actions, b2bUserActions, hasAnyPermission } from '@/lib/helpers'
import { BillingAddress, CardType } from '@/lib/types'

export const useCardContactActions = (userId: number) => {
  const { isAuthenticated } = useAuthContext()

  // Ensure user is authenticated and userId matches the current user
  const canViewCards =
    isAuthenticated && hasAnyPermission(actions.VIEW_PAYMENTS, b2bUserActions.VIEW_PAYMENT)
  const canViewContacts =
    isAuthenticated && hasAnyPermission(actions.VIEW_CONTACTS, b2bUserActions.VIEW_CONTACT)
  const { data: cards } = useGetCards(userId, { enabled: canViewCards })
  const { data: contacts } = useGetCustomerAddresses(userId, { enabled: canViewContacts })

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
