import { Typography, Box } from '@mui/material'
import { Variant } from '@mui/material/styles/createTypography'

import type { CrAddress } from '@/lib/gql/types'

interface AddressProps extends CrAddress {
  firstName?: string
  middleNameOrInitial?: string
  lastNameOrSurname?: string
  title?: string
  radio?: boolean
  variant?: Variant
}

const AddressCard = (props: AddressProps) => {
  const {
    firstName,
    middleNameOrInitial,
    lastNameOrSurname,
    title,
    address1,
    address2,
    cityOrTown,
    stateOrProvince,
    postalOrZipCode,
    variant = 'body1',
  } = props

  const isNameAvailable = firstName || middleNameOrInitial || lastNameOrSurname

  return (
    <>
      {title && (
        <Typography variant="subtitle2" fontWeight={600}>
          {title}
        </Typography>
      )}

      <Box pt={1} data-testid="address-card">
        {isNameAvailable && (
          <Typography variant={variant}>{`${firstName} ${lastNameOrSurname}`}</Typography>
        )}

        <Typography variant={variant}>{address1}</Typography>
        <Typography variant={variant}>{address2}</Typography>
        <Box display="flex">
          <Typography variant={variant} sx={{ '&::after': { content: "','", pr: 0.5 } }}>
            {cityOrTown}
          </Typography>
          <Typography variant={variant} sx={{ '&::after': { content: "', '", pr: 0.5 } }}>
            {stateOrProvince}
          </Typography>
          <Typography variant={variant}>{postalOrZipCode}</Typography>
        </Box>
      </Box>
    </>
  )
}

export default AddressCard
