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

import type { Maybe } from '@/lib/gql/types'

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  '&.MuiAccordion-root': {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: theme?.palette.grey[500],
    backgroundColor: theme?.palette.grey[100],
    borderRadius: '0',
    boxShadow: 'none',
    width: '23.15rem',
  },
  '& .MuiAccordionSummary-root': {
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
  properties: ProductProperties[]
}

interface ProductProperties {
  name: Maybe<string> | undefined
  value: string | undefined
}

const ProductInformation = (props: ProductInformationProps) => {
  const { properties, productFullDescription } = props

  const { t } = useTranslation('product-page')

  const handleAccordionChange = (
    _event: React.SyntheticEvent<Element, Event>,
    expanded: boolean
  ) => {
    if (!expanded) return
  }

  return (
    <Box>
      <Typography fontWeight={700} variant="h3" pb={1}>
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
          {properties.map((option: ProductProperties, index: number) => {
            return (
              <Box data-testid="productOption" key={index} pt={1}>
                <Typography variant="body2" component="span">
                  {option.name}:&nbsp;
                </Typography>
                <Typography variant="body2" component="span">
                  {option.value}
                </Typography>
              </Box>
            )
          })}
        </AccordionDetails>
      </StyledAccordion>
    </Box>
  )
}

export default ProductInformation
