import FmdGoodIcon from '@mui/icons-material/FmdGood'
import { useTranslation } from 'next-i18next'

import { HeaderAction } from '@/components/common'
import { MyStoreDialog, StoreLocatorDialog } from '@/components/dialogs'
import { useModalContext } from '@/context'
import { useHeaderContext } from '@/context/HeaderContext'
import { usePurchaseLocationQueries } from '@/hooks'
import { setPurchaseLocationCookie } from '@/lib/helpers'
import { LocationCustom } from '@/lib/types'

type IconProps = {
  size: 'small' | 'medium' | 'large'
}

const StoreFinderIcon = ({ size }: IconProps) => {
  const { toggleStoreLocator } = useHeaderContext()
  const { data: location } = usePurchaseLocationQueries()
  console.log('location', location)
  const { showModal, closeModal } = useModalContext()
  const { t } = useTranslation('common')

  const openStoreLocatorModal = () => {
    if (location.name) {
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
            setPurchaseLocationCookie(selectedStore?.code as string)
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
      title={location?.name ? location.name : t('find-a-store')}
      subtitle={
        location?.address?.cityOrTown && location?.address?.stateOrProvince
          ? `${location?.address?.cityOrTown}, ${location?.address?.stateOrProvince}`
          : t('view-all')
      }
      icon={FmdGoodIcon}
      iconFontSize={size}
      onClick={handleClick}
    />
  )
}

export default StoreFinderIcon
