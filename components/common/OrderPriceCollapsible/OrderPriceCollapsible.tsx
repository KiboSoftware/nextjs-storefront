import React, { useState } from 'react'

import { ChevronRight, ExpandMore } from '@mui/icons-material'
import {
  Typography,
  Box,
  ListItemButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  List,
} from '@mui/material'
import { grey } from '@mui/material/colors'
import { useTranslation } from 'next-i18next'

import Price from '../Price/Price'

interface OrderPriceCollapsibleProps {
  title: string
  total: number
  subTotal: number
  taxTotal: number
  discountedSubtotal?: number
  discounts?: any[]
}

const styles = {
  priceLabel: { flex: '50%', color: 'text.primary', fontSize: '1rem' },
  detailedSummaryContainer: {
    px: { xs: 2, md: 4 },
    py: 0.25,
    width: { xs: '100%', md: '100%' },
  },
  priceContainer: {
    '& .MuiListItemSecondaryAction-root': {
      right: '0.5rem',
    },
  },
}

const OrderPriceCollapsible = (props: OrderPriceCollapsibleProps) => {
  const { title, total, subTotal, taxTotal, discountedSubtotal, discounts } = props

  const { t } = useTranslation('common')

  const [open, setOpen] = useState(false)
  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <Box sx={{ ...styles.priceContainer }}>
      <ListItemButton sx={{ paddingInline: 0 }} onClick={handleClick}>
        <ListItem
          sx={{ padding: 0 }}
          secondaryAction={
            <Price
              variant="body1"
              fontWeight="bold"
              price={t('currency', { val: total + taxTotal })}
            />
          }
        >
          <ListItemIcon sx={{ minWidth: 30 }}>
            {open ? <ExpandMore /> : <ChevronRight />}
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography sx={{ ...styles.priceLabel }} variant="body1">
                {title}
              </Typography>
            }
          />
        </ListItem>
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            slotProps={{
              root: {
                'aria-label': 'subTotal',
              },
            }}
            sx={{ ...styles.detailedSummaryContainer }}
            secondaryAction={
              <Price
                fontWeight="normal"
                variant="body2"
                price={t('currency', {
                  val: discountedSubtotal ? discountedSubtotal?.toString() : subTotal?.toString(),
                })}
              />
            }
          >
            <ListItemText
              primary={<Typography variant="body2">{t('subtotal', { title })}</Typography>}
            />
          </ListItem>
          {discounts?.map((discount) => {
            return (
              <ListItem
                key={discount?.name}
                slotProps={{
                  root: {
                    'aria-label': 'discounts',
                  },
                }}
                sx={{ ...styles.detailedSummaryContainer }}
                secondaryAction={
                  <Price
                    fontWeight="normal"
                    variant="body2"
                    color="error.main"
                    price={t('currency', { val: discount?.impact?.toString() })}
                  />
                }
              >
                <ListItemText
                  primary={
                    <Typography variant="body2" color={grey[600]}>
                      {discount?.name}
                    </Typography>
                  }
                />
              </ListItem>
            )
          })}

          <ListItem
            slotProps={{
              root: {
                'aria-label': 'tax',
              },
            }}
            sx={{ ...styles.detailedSummaryContainer }}
            secondaryAction={
              <Price
                fontWeight="normal"
                variant="body2"
                price={t('currency', { val: taxTotal?.toString() })}
              />
            }
          >
            <ListItemText
              primary={<Typography variant="body2">{t('tax', { title })}</Typography>}
            />
          </ListItem>
        </List>
      </Collapse>
    </Box>
  )
}

export default OrderPriceCollapsible
