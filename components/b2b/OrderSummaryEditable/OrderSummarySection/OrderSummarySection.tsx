import { useEffect, useState } from 'react'

import ChevronRight from '@mui/icons-material/ChevronRight'
import ExpandMore from '@mui/icons-material/ExpandMore'
import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Typography,
} from '@mui/material'
import { useTranslation } from 'next-i18next'

import { OrderSummarySectionStyles } from './OrderSummarySection.styles'
import { KiboRadio, KiboSelect, KiboTextBox, Price } from '@/components/common'

import { CrAppliedDiscount } from '@/lib/gql/types'

interface OrderSummarySectionProps {
  title: string
  total: number
  subTotal: number
  adjustment: number
  taxTotal: number
  isEdit?: boolean
  adjustmentValue: number
  discounts?: CrAppliedDiscount[]

  setAdjustmentValue: (val: number) => void
}

const AdjustmentType = {
  ADDED: 'Added to',
  SUBTRACTED: 'Subtracted from',
}
const OrderSummarySection = (props: OrderSummarySectionProps) => {
  const {
    title,
    total,
    subTotal,
    adjustment,
    taxTotal,
    isEdit,
    adjustmentValue,
    discounts,
    setAdjustmentValue,
  } = props
  const { t } = useTranslation('common')

  const adjustmentType = adjustment > 0 ? AdjustmentType.ADDED : AdjustmentType.SUBTRACTED

  const [adjustmentInputValue, setAdjustmentInputValue] = useState('')
  const [selectValue, setSelectValue] = useState(adjustmentType)
  const [selectedRadio, setSelectedRadio] = useState('amount')
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  const selectOptions = [
    { label: `Add to ${title} Subtotal`, value: AdjustmentType.ADDED },
    { label: `Subtract from ${title} Subtotal`, value: AdjustmentType.SUBTRACTED },
  ]

  const radioOptions = [
    {
      label: '$',
      value: 'amount',
      name: 'amount',
    },
    {
      label: '%',
      value: 'percentage',
      name: 'percentage',
    },
  ]

  const handleAdjustmentInput = (val: string) => {
    if (!val || !new RegExp(/^(?:\d+(\.\d*)?|\.\d+)$/).test(val)) {
      !val && setAdjustmentInputValue(val)
      return
    }

    const value = parseFloat(val)

    if (selectedRadio === 'amount') {
      setAdjustmentValue(selectValue === AdjustmentType.ADDED ? value : -value)
    } else {
      const amount = (subTotal * value) / 100
      setAdjustmentValue(selectValue === AdjustmentType.ADDED ? amount : -amount)
    }

    setAdjustmentInputValue(value.toString())
  }

  const handleAdjustmentTypeChange = (value: string) => {
    setSelectValue(value)
    setAdjustmentValue(adjustment)
    handleAdjustmentInput('')
  }

  useEffect(() => {
    isEdit && setOpen(isEdit)
  }, [isEdit])

  useEffect(() => {
    handleAdjustmentInput(adjustmentInputValue)
  }, [selectedRadio])

  return (
    <>
      <ListItemButton sx={{ paddingInline: 0 }} onClick={handleClick}>
        <ListItem
          sx={{ padding: 0 }}
          secondaryAction={
            <Price
              fontWeight="bold"
              variant="body2"
              price={t('currency', { val: total?.toString() })}
            />
          }
        >
          <ListItemIcon sx={{ minWidth: 30 }}>
            {open ? <ExpandMore /> : <ChevronRight />}
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="body2">{t('titleTotal', { title })}</Typography>}
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
            sx={OrderSummarySectionStyles.detailedSummaryContainer}
            secondaryAction={
              <Price
                fontWeight="normal"
                variant="body2"
                price={t('currency', { val: subTotal?.toString() })}
              />
            }
          >
            <ListItemText
              primary={<Typography variant="body2">{t('titleSubtotal', { title })}</Typography>}
            />
          </ListItem>

          {isEdit ? (
            <ListItem
              sx={{
                ...OrderSummarySectionStyles.adjustMentEditContainer,
                flexDirection: {
                  xs: isEdit ? 'column' : 'row',
                  md: 'row',
                },
              }}
            >
              <ListItemText
                sx={{ width: '100%' }}
                primary={
                  <Box>
                    <KiboSelect
                      name={'adjustment'}
                      value={selectValue}
                      onChange={(_, value) => {
                        handleAdjustmentTypeChange(value)
                      }}
                    >
                      {selectOptions?.map((option: any) => (
                        <MenuItem
                          sx={{ typography: 'body2' }}
                          key={option?.value}
                          value={option?.value}
                        >
                          {option?.label}
                        </MenuItem>
                      ))}
                    </KiboSelect>
                  </Box>
                }
              />

              <Box
                display="flex"
                alignItems={'center'}
                justifyContent="flex-end"
                gap={2}
                sx={{ ml: { md: 'auto' } }}
                width="100%"
              >
                <Box>
                  <KiboRadio
                    name="adjustment-type"
                    radioOptions={radioOptions}
                    row
                    selected={selectedRadio}
                    onChange={setSelectedRadio}
                  />
                </Box>
                <Box maxWidth={50}>
                  <KiboTextBox
                    name="adjustment-input"
                    value={adjustmentInputValue}
                    onChange={(_, value) => handleAdjustmentInput(value)}
                  />
                </Box>
              </Box>
            </ListItem>
          ) : null}

          <ListItem
            slotProps={{
              root: {
                'aria-label': 'adjustment',
              },
            }}
            sx={OrderSummarySectionStyles.detailedSummaryContainer}
            secondaryAction={
              <Price
                fontWeight="normal"
                variant="body2"
                price={t('currency', { val: adjustmentValue?.toString() })}
              />
            }
          >
            <ListItemText
              primary={
                <Typography variant="body2">
                  {t('adjustment-text', { selectValue, title })}
                </Typography>
              }
            />
          </ListItem>

          {discounts?.map((discount) => {
            return (
              <ListItem
                key={discount?.discount?.name}
                slotProps={{
                  root: {
                    'aria-label': 'discounts',
                  },
                }}
                sx={OrderSummarySectionStyles.detailedSummaryContainer}
                secondaryAction={
                  <Price
                    fontWeight="normal"
                    variant="body2"
                    color="error.main"
                    price={t('currency', { val: `-${discount?.impact?.toString()}` })}
                  />
                }
              >
                <ListItemText
                  primary={<Typography variant="body2">{discount?.discount?.name}</Typography>}
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
            sx={OrderSummarySectionStyles.detailedSummaryContainer}
            secondaryAction={
              <Price
                fontWeight="normal"
                variant="body2"
                price={t('currency', { val: taxTotal?.toString() })}
              />
            }
          >
            <ListItemText
              primary={<Typography variant="body2">{t('titleTax', { title })}</Typography>}
            />
          </ListItem>
        </List>
      </Collapse>
    </>
  )
}

export default OrderSummarySection
