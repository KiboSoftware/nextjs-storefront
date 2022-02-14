import * as React from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import { Breadcrumb } from '@/components/types/breadcrumb'
import { Link } from '@mui/material'

export default function KiboBreadcrumbs({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) {
  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        {breadcrumbs?.map((item: Breadcrumb, index) => {
          return (
            <Link underline="hover" color="text.primary" href={item.link} key={index}>
              {item.text}
            </Link>
          )
        })}
      </Breadcrumbs>
    </div>
  )
}
