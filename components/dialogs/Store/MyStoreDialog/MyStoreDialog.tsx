import React from 'react'

import { Box, Button } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { KiboDialog } from '@/components/common'
import { StoreLocatorDialog, StoreDetails } from '@/components/dialogs'
import { useModalContext } from '@/context/ModalContext'
import { storeLocationGetters } from '@/lib/getters/storeLocationGetters'
import { setPurchaseLocationCookie } from '@/lib/helpers'
import type { LocationCustom } from '@/lib/types'

import type { Maybe, Location } from '@/lib/gql/types'

interface MyStoreProps {
  isOpen: boolean
  isDialogCentered: boolean
  location: Maybe<Location>
}

// Component
const MyStoreDialog = (props: MyStoreProps) => {
  const { isOpen = true, isDialogCentered, location } = props
  const spLocation = location && storeLocationGetters.getLocation(location)
  const { t } = useTranslation('common')
  const { showModal, closeModal } = useModalContext()

  const openChangeStoreModal = () => {
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

  const DialogArgs = {
    isOpen: isOpen,
    Title: t('my-store'),
    Content: <StoreDetails location={spLocation as LocationCustom} />,
    showContentTopDivider: true,
    showContentBottomDivider: true,
    Actions: (
      <Box
        sx={{
          width: '100%',
          flexDirection: 'column',
          alignItems: 'stretch',
          padding: '0 2%',
        }}
      >
        <Button sx={{ width: '100%' }} variant="contained" onClick={openChangeStoreModal}>
          {t('change-store')}
        </Button>
      </Box>
    ),
    isDialogCentered: isDialogCentered,
    customMaxWidth: '34.19rem',
    onClose: closeModal,
  }

  return <KiboDialog {...DialogArgs} />
}
export default MyStoreDialog
