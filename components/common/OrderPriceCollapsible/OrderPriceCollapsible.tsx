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
  discountTotal?: number
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
}

const OrderPriceCollapsible = (props: OrderPriceCollapsibleProps) => {
  const { title, total, subTotal, taxTotal, discountTotal, discountedSubtotal, discounts } = props

  const { t } = useTranslation('common')

  const [open, setOpen] = useState(false)
  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <Box>
      <ListItemButton sx={{ paddingInline: 0 }} onClick={handleClick}>
        <ListItem
          sx={{ padding: 0 }}
          secondaryAction={
            <Price
              variant="body1"
              fontWeight="bold"
              price={t('currency', { val: subTotal })}
              salePrice={
                discountedSubtotal && discountedSubtotal !== subTotal
                  ? t('currency', { val: discountedSubtotal })
                  : ''
              }
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
                price={t('currency', { val: subTotal?.toString() })}
              />
            }
          >
            <ListItemText
              primary={<Typography variant="body2">{t('subtotal', { title })}</Typography>}
            />
          </ListItem>

          {(discountTotal || (discounts && discounts?.length > 0)) && (
            <ListItem sx={{ ...styles.detailedSummaryContainer }}>
              <ListItemText primary={<Typography variant="body2">{t('discounts')}:</Typography>} />
            </ListItem>
          )}
          {discountTotal && (
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
                  color={grey[600]}
                  price={t('currency', { val: -discountTotal?.toString() })}
                />
              }
            ></ListItem>
          )}
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
                    color={grey[600]}
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
