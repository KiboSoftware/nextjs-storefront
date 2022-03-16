import { Box } from '@mui/system'

import KiboTextBox from '@/components/common/KiboTextBox/KiboTextBox'
import { ProductOption } from '@/lib/gql/types'

interface ProductOptionTextBoxProps {
  textBoxOptions: ProductOption[]
  row?: boolean
}

export default function ProductOptionTextBox({ textBoxOptions, row }: ProductOptionTextBoxProps) {
  return (
    <Box display={'flex'} flexDirection={row ? 'row' : 'column'} gap={1}>
      {textBoxOptions.map((option: ProductOption) => {
        return (
          <KiboTextBox
            key={option?.attributeDetail?.name}
            label={option?.attributeDetail?.name}
            value={option!.values![0]!.shopperEnteredValue || ''}
            name={option.attributeFQN}
          />
        )
      })}
    </Box>
  )
}
