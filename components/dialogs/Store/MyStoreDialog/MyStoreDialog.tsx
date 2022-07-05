import React from 'react'

import { Box, Button } from '@mui/material'
import { useTranslation } from 'next-i18next'

import StoreLocatorDialog from '../StoreLocatorDialog/StoreLocatorDialog'
import ViewStore from '../ViewStore/ViewStore'
import { locationCollectionMock } from '@/__mocks__/stories/locationCollectionMock'
import KiboDialog from '@/components/common/KiboDialog/KiboDialog'
import { useModalContext } from '@/context/ModalContext'

interface MyStoreProps {
  isOpen: boolean
  isDialogCentered: boolean
  handleSetStore: () => void
}

// Component
const MyStoreDialog = (props: MyStoreProps) => {
  const { handleSetStore, isOpen = true, isDialogCentered } = props
  const { t } = useTranslation()
  const { showModal, closeModal } = useModalContext()

  const openChangeStoreModal = () => {
    showModal({ Component: StoreLocatorDialog })
  }

  console.log(isOpen)
  const locations = locationCollectionMock.spLocations.items || []

  const DialogArgs = {
    isOpen: isOpen,
    Title: t('my-store'),
    Content: (
      <ViewStore
        spLocations={locations}
        selectedStore={''}
        radio={false}
        handleSetStore={handleSetStore}
      />
    ),
    showContentTopDivider: true,
    showContentBottomDivider: false,
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
    customMaxWidth: '32.375rem',
    onClose: closeModal,
  }

  return <KiboDialog {...DialogArgs} />
}
export default MyStoreDialog
