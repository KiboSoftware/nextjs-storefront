import { StoreLocatorDialog } from '@/components/dialogs'
import { useModalContext } from '@/context'
import { useUpdateQuoteItemFulfillment, useUpdateQuoteItemQuantity } from '@/hooks'
import { FulfillmentOptions } from '@/lib/constants'
import { LocationCustom } from '@/lib/types'

import { Maybe, Location, CrOrderItem } from '@/lib/gql/types'

interface UseQuoteActionsProps {
  quoteId: string
  updateMode: string
  quoteItems: CrOrderItem[]
  purchaseLocation: Location
  shouldFetchShippingMethods?: boolean
}

export const useQuoteActions = ({
  quoteId,
  updateMode,
  quoteItems,
  purchaseLocation,
  shouldFetchShippingMethods = false,
}: UseQuoteActionsProps) => {
  const { showModal, closeModal } = useModalContext()
  const { updateQuoteItemFulfillment } = useUpdateQuoteItemFulfillment({
    shouldFetchShippingMethods,
  })
  const { updateQuoteItemQuantity } = useUpdateQuoteItemQuantity({ shouldFetchShippingMethods })

  const handleProductPickupLocation = (quoteItemId: string) => {
    showModal({
      Component: StoreLocatorDialog,
      props: {
        handleSetStore: async (selectedStore: LocationCustom) => {
          mutateQuoteItem(quoteItemId, FulfillmentOptions.PICKUP, selectedStore?.code)
          closeModal()
        },
      },
    })
  }

  const mutateQuoteItem = async (
    quoteItemId: string,
    fulfillmentMethod: string,
    locationCode = ''
  ) => {
    try {
      const quoteItem = quoteItems.find((item: Maybe<CrOrderItem>) => item?.id === quoteItemId)
      const product = quoteItem?.product
      const quantity = quoteItem?.quantity as number

      await updateQuoteItemFulfillment.mutateAsync({
        quoteId,
        quoteItemId,
        updateMode,
        product,
        quantity,
        fulfillmentMethod,
        locationCode,
      })
    } catch (err) {
      console.log(err)
    }
  }

  const onFulfillmentOptionChange = async (fulfillmentMethod: string, quoteItemId: string) => {
    const locationCode =
      fulfillmentMethod === FulfillmentOptions.PICKUP ? (purchaseLocation.code as string) : ''
    if (fulfillmentMethod === FulfillmentOptions.PICKUP && !locationCode) {
      handleProductPickupLocation(quoteItemId)
    } else {
      mutateQuoteItem(quoteItemId, fulfillmentMethod, locationCode)
    }
  }

  const handleQuantityUpdate = async (quoteItemId: string, quantity: number) => {
    try {
      await updateQuoteItemQuantity.mutateAsync({
        quoteId,
        quoteItemId,
        updateMode,
        quantity,
      })
    } catch (err) {
      console.error(err)
    }
  }

  return {
    onFulfillmentOptionChange,
    handleQuantityUpdate,
    handleProductPickupLocation,
  }
}
