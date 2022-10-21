import FmdGoodIcon from '@mui/icons-material/FmdGood'
import { useTranslation } from 'next-i18next'

import { HeaderAction } from '@/components/common'
import { MyStoreDialog, StoreLocatorDialog } from '@/components/dialogs'
import { useModalContext } from '@/context'
import { useHeaderContext } from '@/context/HeaderContext'
import { usePurchaseLocationQueries } from '@/hooks'
import { storeLocationGetters } from '@/lib/getters'
import { setPurchaseLocationCookie } from '@/lib/helpers'
import type { IconProps, LocationCustom } from '@/lib/types'

const StoreFinderIcon = ({ size }: IconProps) => {
  const { toggleStoreLocator } = useHeaderContext()

  const { data: location } = usePurchaseLocationQueries()

  const { showModal, closeModal } = useModalContext()

  const { t } = useTranslation('common')

  const locationName = storeLocationGetters.getName(location)
  const locationCity = storeLocationGetters.getCity(location)
  const locationState = storeLocationGetters.getState(location)

  const openStoreLocatorModal = () => {
    if (locationName) {
      showModal({
        Component: MyStoreDialog,
        props: {
          location,
        },
      })
    } else {
      showModal({
        Component: StoreLocatorDialog,
        props: {
          handleSetStore: async (selectedStore: LocationCustom) => {
            setPurchaseLocationCookie(storeLocationGetters.getCode(selectedStore))
            closeModal()
          },
        },
      })
    }
  }
  const handleClick = () => {
    toggleStoreLocator()
    openStoreLocatorModal()
  }

  return (
    <HeaderAction
      title={locationName ? locationName : t('find-a-store')}
      subtitle={locationCity && locationState ? `${locationCity}, ${locationState}` : t('view-all')}
      icon={FmdGoodIcon}
      iconFontSize={size}
      onClick={handleClick}
    />
  )
}

export default StoreFinderIcon
