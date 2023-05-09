import React from 'react'

import EditIcon from '@mui/icons-material/Edit'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import { Typography } from '@mui/material'
import { GridRenderCellParams } from '@mui/x-data-grid'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import KiboDataTable from './KiboDataTable'
import { customerB2bUserMock } from '@/__mocks__/stories/customerB2bUserMock'
import { userGetters } from '@/lib/getters'

import { B2BUser } from '@/lib/gql/types'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Common/KiboDataTable',
  component: KiboDataTable,
  argTypes: { onClick: { action: 'clicked' } },
} as ComponentMeta<typeof KiboDataTable>

const style = {
  userStatus: {
    height: '12px',
    width: '12px',
    left: 0,
    top: '3.5px',
    borderRadius: '100px',
    marginRight: '8px',
  },
}

const customerb2bUsers = userGetters.getCustomerB2bUsers(customerB2bUserMock?.items as B2BUser[])

const Template: ComponentStory<typeof KiboDataTable> = (args) => <KiboDataTable {...args} />

export const DataTable = Template.bind({})

DataTable.args = {
  rows: customerb2bUsers as B2BUser[],
  columns: [
    {
      field: 'emailAddress',
      headerName: 'Email Address',
      type: 'string',
      sortable: false,
      filterable: false,
      flex: 2,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'firstName',
      headerName: 'First Name',
      type: 'string',
      sortable: false,
      filterable: false,
      flex: 1.5,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      type: 'string',
      sortable: false,
      filterable: false,
      flex: 1.2,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'role',
      headerName: 'Role',
      type: 'string',
      sortable: false,
      filterable: false,
      flex: 1.2,
      headerClassName: 'super-app-theme--header',
      renderCell: (params: GridRenderCellParams<any>) => (
        <Typography>
          {params.row.roles.length
            ? params.row.roles.reduce((roleList: string, role: any) => {
                roleList += `${role.roleName} `
                return roleList
              }, '')
            : 'N/A'}
        </Typography>
      ),
    },
    {
      field: 'isActive',
      headerName: 'Status',
      type: 'string',
      sortable: false,
      filterable: false,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      renderCell: (params: GridRenderCellParams<any>) => (
        <>
          <div
            style={{ ...style.userStatus, background: params.row.isActive ? '#2EA195' : '#7C7C7C' }}
          ></div>
          {params.row.isActive ? 'Active' : 'Inactive'}
        </>
      ),
    },
    {
      field: ' ',
      headerName: '',
      type: 'string',
      sortable: false,
      filterable: false,
      flex: 0.5,
      headerClassName: 'super-app-theme--header',
      renderCell: (params: GridRenderCellParams<any>) => (
        <>
          <EditIcon style={{ marginRight: '16px', cursor: 'pointer' }} />
          <RemoveCircleIcon style={{ cursor: 'pointer' }} />
        </>
      ),
    },
  ],
  loading: false,
}
