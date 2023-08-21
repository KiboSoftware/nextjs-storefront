import React, { useState } from 'react'

import { ContentCopy, Delete, Edit, MoreVert } from '@mui/icons-material'
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { grey } from '@mui/material/colors'
import { useTranslation } from 'next-i18next'

import { styles } from '@/components/b2b/Lists/ListTable/ListTable.style'
import formatDate from '@/lib/helpers/formatDate'

import { CrWishlist, Maybe } from '@/lib/gql/types'

interface ListTableProps {
  rows: Array<CrWishlist>
  onDeleteList: (param: string) => void
  onCopyList: (param: string) => void
  onEditList: (param: string) => void
  onAddListToCart: (param: string) => void
  onInitiateQuote: (param: string) => void
  isLoading: boolean
}

interface ListTableMobileOptions {
  onDeleteList: (param: string) => void
  onCopyList: (param: string) => void
  onEditList: (param: string) => void
  onAddListToCart: (param: string) => void
  onInitiateQuote: (param: string) => void
  itemId: string
}

const ListTableMobileOptions = (props: ListTableMobileOptions) => {
  const { onDeleteList, onCopyList, onEditList, onAddListToCart, onInitiateQuote, itemId } = props
  const [anchorEl, setAnchorEL] = useState<HTMLElement | null>(null)
  const { t } = useTranslation('common')
  const options = [
    { name: t('edit'), onClick: onEditList },
    { name: t('add-list-items-to-cart'), onClick: onAddListToCart },
    { name: t('initiate-quote'), onClick: onInitiateQuote },
    { name: t('duplicate'), onClick: onCopyList },
    { name: t('delete'), onClick: onDeleteList },
  ]

  return (
    <>
      <IconButton
        sx={{ padding: '0px' }}
        onClick={(e) => {
          console.log(e.currentTarget)
          setAnchorEL(e.currentTarget)
        }}
        data-testid="menuBtn"
        id={itemId}
      >
        <MoreVert />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEL(null)}
        data-testid="menu"
      >
        {options.map((option, i) => (
          <MenuItem
            key={option.name}
            onClick={() => {
              console.log(itemId)
              option.onClick(itemId)
              setAnchorEL(null)
            }}
            sx={i !== options.length - 1 ? { borderBottom: `0.5px solid ${grey[300]}` } : {}}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

const ListTable = (props: ListTableProps) => {
  const {
    rows,
    onDeleteList,
    onCopyList,
    onEditList,
    onAddListToCart,
    onInitiateQuote,
    isLoading,
  } = props

  const { t } = useTranslation('common')
  const theme = useTheme()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <TableContainer
      sx={{ opacity: isLoading ? '0.5' : '1', pointerEvents: isLoading ? 'none' : 'auto' }}
    >
      <Table sx={{ tableLayout: 'fixed' }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: grey[100], padding: '10px 0' }}>
            <TableCell sx={{ padding: '10px 10px', width: mdScreen ? '25%' : '50%' }}>
              {t('list-name')}
            </TableCell>
            <TableCell sx={{ padding: '10px 10px', width: mdScreen ? '15%' : '30%' }}>
              {t('date-created')}
            </TableCell>
            {mdScreen && (
              <TableCell sx={{ padding: '10px 10px', width: '20%' }}>{t('created-by')}</TableCell>
            )}
            <TableCell sx={{ padding: '10px 10px', width: mdScreen ? '25%' : '10%' }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((item: Maybe<CrWishlist>) => {
            return (
              <TableRow key={item?.id}>
                <TableCell sx={{ ...styles.tableCellStyles, width: mdScreen ? '25%' : '50%' }}>
                  {mdScreen ? (
                    item?.name
                  ) : (
                    <Box>
                      {item?.name}
                      <br />
                      <Typography style={{ margin: '5px 0', color: grey[400] }}>
                        {item?.auditInfo?.createBy}
                      </Typography>
                    </Box>
                  )}
                </TableCell>
                <TableCell sx={{ ...styles.tableCellStyles, width: mdScreen ? '15%' : '30%' }}>
                  {formatDate(item?.auditInfo?.createDate)}
                </TableCell>
                {mdScreen && (
                  <TableCell sx={{ ...styles.tableCellStyles, width: '20%' }}>
                    {item?.auditInfo?.createBy}
                  </TableCell>
                )}
                <TableCell sx={{ ...styles.tableCellStyles, width: mdScreen ? '25%' : '10%' }}>
                  {mdScreen ? (
                    <Box sx={{ justifyContent: 'flex-end', display: 'flex' }}>
                      <Button
                        variant="text"
                        color="inherit"
                        data-testid="initiateQuoteBtn"
                        onClick={() => onInitiateQuote(item?.id as string)}
                      >
                        {t('initiate-quote')}
                      </Button>
                      <Button
                        variant="text"
                        color="inherit"
                        data-testid="addToCartBtn"
                        onClick={() => onAddListToCart(item?.id as string)}
                      >
                        {t('add-to-cart')}
                      </Button>
                      <IconButton
                        color="inherit"
                        onClick={() => onEditList(item?.id as string)}
                        data-testid="editBtn"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="inherit"
                        onClick={() => onCopyList(item?.id as string)}
                        data-testid="copyBtn"
                      >
                        <ContentCopy />
                      </IconButton>
                      <IconButton
                        color="inherit"
                        onClick={() => onDeleteList(item?.id as string)}
                        data-testid="deleteBtn"
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  ) : (
                    <>
                      <ListTableMobileOptions
                        onDeleteList={onDeleteList}
                        onCopyList={onCopyList}
                        onEditList={onEditList}
                        onAddListToCart={onAddListToCart}
                        onInitiateQuote={onInitiateQuote}
                        itemId={item?.id as string}
                      />
                    </>
                  )}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ListTable
