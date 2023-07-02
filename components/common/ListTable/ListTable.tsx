import React from 'react'

import { Delete, Edit, FolderCopySharp, MoreVert } from '@mui/icons-material'
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme,
} from '@mui/material'

const tableCellStyles = {
  padding: '5px 10px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}

const IconButtonStyles = {
  fontWeight: '400',
  lineHeight: '19px',
  fontSize: '16px',
  color: '#000000',
  textDecoration: 'underline',
  '&:hover': {
    textDecoration: 'underline',
    background: '#fff',
  },
}

const ListItemOptions = (props: any) => {
  const theme = useTheme()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))

  if (mdScreen)
    return (
      <Box style={{ justifyContent: 'flex-end', display: 'flex' }}>
        <Button sx={IconButtonStyles}>Initiate Quote</Button>
        <Button sx={IconButtonStyles}>Add to Cart</Button>
        <IconButton sx={IconButtonStyles}>
          <Edit />
        </IconButton>
        <IconButton sx={IconButtonStyles}>
          <FolderCopySharp />
        </IconButton>
        <IconButton sx={IconButtonStyles}>
          <Delete />
        </IconButton>
      </Box>
    )
  return (
    <IconButton style={{ padding: '0px' }}>
      <MoreVert />
    </IconButton>
  )
}

const ListTable = (props: any) => {
  const { rows } = props
  const theme = useTheme()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))
  return (
    <TableContainer>
      <Table style={{ tableLayout: 'fixed' }}>
        <TableHead>
          <TableRow style={{ backgroundColor: '#f7f7f7', padding: '10px 0' }}>
            <TableCell style={{ padding: '10px 10px', width: mdScreen ? '25%' : '50%' }}>
              List Name
            </TableCell>
            <TableCell style={{ padding: '10px 10px', width: mdScreen ? '15%' : '30%' }}>
              Date Created
            </TableCell>
            {mdScreen && (
              <TableCell style={{ padding: '10px 10px', width: '20%' }}>Created By</TableCell>
            )}
            <TableCell
              style={{ padding: '10px 10px', width: mdScreen ? '25%' : '10%' }}
            ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((item: any) => {
            return (
              <TableRow key={item.id}>
                <TableCell style={{ ...tableCellStyles, width: mdScreen ? '25%' : '50%' }}>
                  {mdScreen ? (
                    item.name
                  ) : (
                    <Box>
                      {item.name}
                      <br />
                      <p style={{ margin: '5px 0', color: '#cdcdcd' }}>{item.createBy}</p>
                    </Box>
                  )}
                </TableCell>
                <TableCell style={{ ...tableCellStyles, width: mdScreen ? '15%' : '30%' }}>
                  {item.createDate}
                </TableCell>
                {mdScreen ? (
                  <TableCell style={{ ...tableCellStyles, width: '20%' }}>
                    {item.createBy}
                  </TableCell>
                ) : (
                  <></>
                )}
                <TableCell style={{ ...tableCellStyles, width: mdScreen ? '25%' : '10%' }}>
                  <ListItemOptions />
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
