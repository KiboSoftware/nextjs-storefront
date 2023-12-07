import ExpandMore from '@mui/icons-material/ExpandMore'
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  styled,
} from '@mui/material'
import { useTranslation } from 'next-i18next'

import { ProductOptionList } from '@/components/product'

import type { CrProductOption } from '@/lib/gql/types'

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  '&.MuiAccordion-root': {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: theme?.palette.grey[500],
    backgroundColor: theme?.palette.grey[100],
    borderRadius: '0',
    boxShadow: 'none',
    maxWidth: '23.15rem',
  },
  '& .MuiAccordionSummary-root': {
    minHeight: '2.5rem !important',
    height: '2.5rem',
  },
  '& .MuiAccordionDetails-root': {
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: theme?.palette.grey[500],
  },
}))

interface ProductInformationProps {
  productFullDescription: string | undefined
  options: CrProductOption[]
}

const ProductInformation = (props: ProductInformationProps) => {
  const { options = [], productFullDescription } = props

  const { t } = useTranslation('common')

  return (
    <>
      <Typography variant="h3" fontWeight={700} pb={1}>
        {t('product-information')}
      </Typography>
      <Box
        sx={{ fontSize: (theme) => theme.typography.body2 }}
        dangerouslySetInnerHTML={{
          __html: productFullDescription as string,
        }}
        py={2}
        data-testid="product-content"
      />
      {options.length > 0 && (
        <StyledAccordion>
          <AccordionSummary data-testid="accordian" expandIcon={<ExpandMore />}>
            <Typography variant="subtitle2" fontWeight={700}>
              {t('product-specs')}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ProductOptionList options={options} />
          </AccordionDetails>
        </StyledAccordion>
      )}
    </>
  )
}

export default ProductInformation
