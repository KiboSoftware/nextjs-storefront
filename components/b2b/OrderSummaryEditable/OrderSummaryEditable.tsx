import React from 'react'

import { Box, Button, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { OrderSummarySection } from '@/components/b2b'
import { Price, PromoCodeBadge } from '@/components/common'
import { QuoteStatus } from '@/lib/constants'

import { CrAppliedDiscount, CrShippingDiscount } from '@/lib/gql/types'

interface OrderSummaryEditableProps {
  itemTotal: number
  itemTaxTotal: number
  subTotal: number
  adjustment: number

  shippingTotal: number
  shippingTaxTotal: number
  shippingSubTotal: number
  shippingAdjustment: number

  handlingTotal: number
  handlingTaxTotal: number
  handlingSubTotal: number
  handlingAdjustment: number
  itemLevelProductDiscountTotal: number

  dutyTotal: number

  mode?: string
  status?: string
  total: number
  shippingDiscounts: CrShippingDiscount[]
  handlingDiscounts: CrAppliedDiscount[]
  orderDiscounts: CrAppliedDiscount[]
  promoList?: string[]
  promoError?: string
  // use Type QuoteAdjustmentInput once in production
  onSave: (param: {
    adjustment: number
    shippingAdjustment: number
    handlingAdjustment: number
  }) => void
  onApplyCouponCode: (code: string) => void
  onRemoveCouponCode: (code: string) => void
}

const OrderSummaryEditable = (props: OrderSummaryEditableProps) => {
  const {
    itemTotal,
    subTotal,
    itemTaxTotal,
    adjustment,

    shippingTotal,
    shippingSubTotal,
    shippingAdjustment,
    shippingTaxTotal,
    shippingDiscounts,
    handlingDiscounts,
    orderDiscounts,

    handlingTotal,
    handlingSubTotal,
    handlingAdjustment,
    handlingTaxTotal,

    dutyTotal,
    itemLevelProductDiscountTotal,
    mode,
    status,
    total,
    promoList,
    promoError,
    onSave,
    onApplyCouponCode,
    onRemoveCouponCode,
  } = props
  const { t } = useTranslation('common')

  const [adjustmentValue, setAdjustmentValue] = React.useState({
    adjustment: adjustment,
    shippingAdjustment: shippingAdjustment,
    handlingAdjustment: handlingAdjustment,
  })

  const [isEdit, setIsEdit] = React.useState(false)

  const handleEditButtonClick = () => {
    setIsEdit(!isEdit)
  }

  const handleSave = () => {
    onSave(adjustmentValue)
    handleEditButtonClick()
  }

  const handleAdjustmentValue = (value: number, type: string) => {
    setAdjustmentValue((prev) => ({ ...prev, [type]: value }))
  }

  return (
    <List
      sx={{ width: '100%', maxWidth: 860, float: 'right' }}
      component="nav"
      aria-labelledby="order-summary-editable"
    >
      <ListItem
        disableGutters
        secondaryAction={
          mode &&
          QuoteStatus[status as string] !== QuoteStatus.InReview &&
          QuoteStatus[status as string] !== QuoteStatus.Completed &&
          QuoteStatus[status as string] !== QuoteStatus.Expired && (
            <Box display="flex" gap={2}>
              {isEdit ? (
                <>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={handleEditButtonClick}
                  >
                    {t('cancel')}
                  </Button>
                  <Button variant="contained" color="primary" size="small" onClick={handleSave}>
                    {t('save')}
                  </Button>
                </>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={handleEditButtonClick}
                >
                  {t('edit')}
                </Button>
              )}
            </Box>
          )
        }
      >
        <ListItemText
          primary={
            <Typography variant="subtitle1" fontWeight={'bold'}>
              {t('summary')}
            </Typography>
          }
        />
      </ListItem>
      <OrderSummarySection
        title="Item"
        total={itemTotal}
        subTotal={subTotal - itemLevelProductDiscountTotal}
        adjustment={adjustment}
        taxTotal={itemTaxTotal}
        isEdit={isEdit}
        adjustmentValue={adjustmentValue.adjustment}
        discounts={orderDiscounts}
        setAdjustmentValue={(val) => handleAdjustmentValue(val, 'adjustment')}
      />
      <OrderSummarySection
        title="Shipping"
        total={shippingTotal}
        subTotal={shippingSubTotal}
        adjustment={shippingAdjustment}
        taxTotal={shippingTaxTotal}
        isEdit={isEdit}
        adjustmentValue={adjustmentValue.shippingAdjustment}
        discounts={shippingDiscounts?.map((shippingDiscount) => {
          return {
            discount: shippingDiscount?.discount?.discount,
            impact: shippingDiscount?.discount?.impact ?? 0,
          }
        })}
        setAdjustmentValue={(val) => handleAdjustmentValue(val, 'shippingAdjustment')}
      />
      <OrderSummarySection
        title="Handling"
        total={handlingTotal}
        subTotal={handlingSubTotal}
        adjustment={handlingAdjustment}
        taxTotal={handlingTaxTotal}
        isEdit={isEdit}
        adjustmentValue={adjustmentValue.handlingAdjustment}
        discounts={handlingDiscounts}
        setAdjustmentValue={(val) => handleAdjustmentValue(val, 'handlingAdjustment')}
      />
      <ListItem
        slotProps={{
          root: {
            'aria-label': 'duty-total',
          },
        }}
        sx={{ paddingLeft: 0 }}
        secondaryAction={
          <Price
            fontWeight="bold"
            variant="body2"
            price={t('currency', { val: dutyTotal?.toString() })}
          />
        }
      >
        <ListItemIcon sx={{ minWidth: 30 }} />
        <ListItemText primary={<Typography variant="body2">{t('duty-total')}</Typography>} />
      </ListItem>

      {QuoteStatus[status as string] !== QuoteStatus.InReview &&
        QuoteStatus[status as string] !== QuoteStatus.Completed &&
        QuoteStatus[status as string] !== QuoteStatus.Expired && (
          <PromoCodeBadge
            onApplyCouponCode={onApplyCouponCode}
            onRemoveCouponCode={onRemoveCouponCode}
            promoError={!!promoError}
            helpText={promoError}
            promoList={promoList as string[]}
            isEdit={!!mode}
          />
        )}

      <ListItem
        slotProps={{
          root: {
            'aria-label': 'quote-total',
          },
        }}
        sx={{ paddingLeft: 0 }}
        secondaryAction={
          <Price
            fontWeight="bold"
            variant="body2"
            color="primary"
            price={t('currency', { val: total?.toString() })}
          />
        }
      >
        <ListItemIcon sx={{ minWidth: 30 }} />
        <ListItemText
          primary={
            <Typography variant="body2" color="primary">
              {t('quote-total')}
            </Typography>
          }
        />
      </ListItem>
    </List>
  )
}

export default OrderSummaryEditable
