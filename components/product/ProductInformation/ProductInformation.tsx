import { SyntheticEvent } from 'react'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  styled,
} from '@mui/material'
import { useTranslation } from 'next-i18next'

import ProductOption from '../ProductOption/ProductOption'

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
    minHeight: '3rem !important',
    height: '3rem',
  },
  '& .MuiAccordionDetails-root': {
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: theme?.palette.grey[500],
  },
}))

interface ProductInformationProps {
  productFullDescription: string | undefined
  properties: CrProductOption[]
}

const ProductInformation = (props: ProductInformationProps) => {
  const { properties = [], productFullDescription } = props

  const { t } = useTranslation('product')

  const handleAccordionChange = (_event: SyntheticEvent<Element, Event>, expanded: boolean) => {
    if (!expanded) return
  }

  return (
    <>
      <Typography variant="h3" fontWeight={700} pb={1}>
        {t('product-information')}
      </Typography>
      <Typography
        variant="body2"
        dangerouslySetInnerHTML={{
          __html: productFullDescription as string,
        }}
        data-testid="product-content"
      />
      <StyledAccordion onChange={handleAccordionChange}>
        <AccordionSummary data-testid="accordian" expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle2" fontWeight={700}>
            {t('product-specs')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {properties?.map((option: CrProductOption) => {
            return (
              <Box key={option?.value} pt={1}>
                <ProductOption option={option} />
              </Box>
            )
          })}
        </AccordionDetails>
      </StyledAccordion>
    </>
  )
}

export default ProductInformation
