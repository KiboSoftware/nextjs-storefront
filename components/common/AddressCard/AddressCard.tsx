import { Typography, Box } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { CrAddress } from '@/lib/gql/types'

interface AddressProps extends CrAddress {
  title?: string
  radio?: boolean
}

const AddressCard = (props: AddressProps) => {
  const { title, address1, address2, cityOrTown, stateOrProvince, postalOrZipCode } = props
  const { t } = useTranslation('checkout')

  return (
    <>
      {title && (
        <Typography variant="subtitle2" fontWeight={600}>
          {title}
        </Typography>
      )}

      <Box pt={1}>
        <Typography variant="body1">{address1}</Typography>
        <Typography variant="body1">
          {t('apartment')}
          {address2}
        </Typography>
        <Box display="flex">
          <Typography variant="body1" sx={{ '&::after': { content: "','" } }}>
            {cityOrTown}
          </Typography>
          <Typography variant="body1" sx={{ '&::after': { content: "','" } }}>
            {stateOrProvince}
          </Typography>
          <Typography variant="body1">{postalOrZipCode}</Typography>
        </Box>
      </Box>
    </>
  )
}

export default AddressCard
