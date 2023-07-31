import React, { useState } from 'react'

import { Delete, Edit, FolderCopySharp, MoreVert } from '@mui/icons-material'
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
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useTranslation } from 'next-i18next'

import { styles } from '@/components/my-account/Lists/ListTable/ListTable.style'
import formatDate from '@/lib/helpers/formatDate'

import { CrWishlist, Maybe } from '@/lib/gql/types'

interface ListTableProps {
  rows: Array<CrWishlist>
  onDeleteList: (param: string) => void
  onCopyList: (param: string) => void
  onEditList: (param: string) => void
  onAddListToCart: (param: string) => void
  isLoading: boolean
}

const ListTable = (props: ListTableProps) => {
  const { rows, onDeleteList, onCopyList, onEditList, onAddListToCart, isLoading } = props
  // state for mobile menu
  const [anchorEl, setAnchorEL] = useState<HTMLElement | null>(null)

  const { t } = useTranslation('common')
  const theme = useTheme()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))

  const options = [
    { name: t('edit'), onClick: onEditList },
    // todo
    { name: t('add-list-items-to-cart'), onClick: onAddListToCart },
    // todo
    { name: t('initiate-quote'), onClick: () => alert('Work in progress') },
    { name: t('duplicate'), onClick: onCopyList },
    { name: t('delete'), onClick: onDeleteList },
  ]

  return (
    <TableContainer sx={{ opacity: isLoading ? '0.5' : '1' }}>
      <Table style={{ tableLayout: 'fixed' }}>
        <TableHead>
          <TableRow style={{ backgroundColor: '#f7f7f7', padding: '10px 0' }}>
            <TableCell style={{ padding: '10px 10px', width: mdScreen ? '25%' : '50%' }}>
              {t('list-name')}
            </TableCell>
            <TableCell style={{ padding: '10px 10px', width: mdScreen ? '15%' : '30%' }}>
              {t('date-created')}
            </TableCell>
            {mdScreen && (
              <TableCell style={{ padding: '10px 10px', width: '20%' }}>
                {t('created-by')}
              </TableCell>
            )}
            <TableCell
              style={{ padding: '10px 10px', width: mdScreen ? '25%' : '10%' }}
            ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((item: Maybe<CrWishlist>) => {
            return (
              <TableRow key={item?.id}>
                <TableCell style={{ ...styles.tableCellStyles, width: mdScreen ? '25%' : '50%' }}>
                  {mdScreen ? (
                    item?.name
                  ) : (
                    <Box>
                      {item?.name}
                      <br />
                      <p style={{ margin: '5px 0', color: '#cdcdcd' }}>
                        {item?.auditInfo?.createBy}
                      </p>
                    </Box>
                  )}
                </TableCell>
                <TableCell style={{ ...styles.tableCellStyles, width: mdScreen ? '15%' : '30%' }}>
                  {formatDate(item?.auditInfo?.createDate)}
                </TableCell>
                {mdScreen && (
                  <TableCell style={{ ...styles.tableCellStyles, width: '20%' }}>
                    {item?.auditInfo?.createBy}
                  </TableCell>
                )}
                <TableCell style={{ ...styles.tableCellStyles, width: mdScreen ? '25%' : '10%' }}>
                  {mdScreen ? (
                    <Box style={{ justifyContent: 'flex-end', display: 'flex' }}>
                      <Button variant="text" color="inherit" data-testid="initiateQuoteBtn">
                        {t('initiate-quote')}
                      </Button>
                      <Button
                        variant="text"
                        color="inherit"
                        data-testid="addToCartBtn"
                        onClick={() => onAddListToCart(item?.id || '')}
                      >
                        {t('add-to-cart')}
                      </Button>
                      <IconButton
                        color="inherit"
                        onClick={() => onEditList(item?.id || '')}
                        data-testid="editBtn"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="inherit"
                        onClick={() => onCopyList(item?.id || '')}
                        data-testid="copyBtn"
                      >
                        <FolderCopySharp />
                      </IconButton>
                      <IconButton
                        color="inherit"
                        onClick={() => onDeleteList(item?.id || '')}
                        data-testid="deleteBtn"
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  ) : (
                    <>
                      <IconButton
                        style={{ padding: '0px' }}
                        onClick={(e) => setAnchorEL(e.currentTarget)}
                        data-testid="menuBtn"
                      >
                        <MoreVert />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEL(null)}
                      >
                        {options.map((option, i) => (
                          <MenuItem
                            key={option.name}
                            onClick={() => {
                              option.onClick(item?.id || '')
                              setAnchorEL(null)
                            }}
                            style={
                              i !== options.length - 1
                                ? { borderBottom: '0.5px solid #EAEAEA' }
                                : {}
                            }
                          >
                            {option.name}
                          </MenuItem>
                        ))}
                      </Menu>
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
