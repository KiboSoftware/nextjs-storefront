import { useTranslation } from 'next-i18next'

import KiboDialog from '@/components/common/KiboDialog/KiboDialog'
import { PaymentMethod } from '@/components/my-account'
import { DisplayMode } from '@/lib/constants'

import type { CustomerAccount, CustomerContactCollection, CardCollection } from '@/lib/gql/types'

interface EditBillingAddressProps {
  user: { id: number }
  cards: CardCollection
  contacts: CustomerContactCollection
  onSave: () => void
  onClose: () => void
}

const EditBillingAddress = (props: EditBillingAddressProps) => {
  const { user, cards, contacts, onSave, onClose } = props
  const { t } = useTranslation('common')

  return (
    <KiboDialog
      showCloseButton
      Title={t('edit-billing-information')}
      showContentTopDivider={true}
      showContentBottomDivider={false}
      Actions={''}
      Content={
        <PaymentMethod
          user={user as CustomerAccount}
          cards={cards}
          contacts={contacts}
          displayMode={DisplayMode.ADDNEW}
          isAddressFormInDialog={true}
          onSave={onSave}
          onClose={onClose}
        />
      }
      customMaxWidth="30rem"
      onClose={onClose}
    />
  )
}

export default EditBillingAddress
