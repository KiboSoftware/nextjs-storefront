import * as React from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import { Breadcrumb } from '@/components/types/breadcrumb'
import { Link } from '@mui/material'

export default function KiboBreadcrumbs({
  breadcrumbs,
  separator = '|',
  ...rest
}: {
  breadcrumbs: Breadcrumb[]
  separator?: string
}) {
  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb" separator={separator} {...rest}>
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
