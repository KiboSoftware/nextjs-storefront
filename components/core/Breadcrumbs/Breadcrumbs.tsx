import React from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import { Link } from '@mui/material'

export type Breadcrumb = {
  text: string
  link: string
}
interface BreadcrumbsProps {
  breadcrumbs: Breadcrumb[]
  separator?: string
}

export default function KiboBreadcrumbs({
  breadcrumbs,
  separator = '|',
  ...rest
}: BreadcrumbsProps) {
  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb" separator={separator} {...rest}>
        {breadcrumbs?.map((item: Breadcrumb, index) => {
          return (
            <Link
              underline="hover"
              variant="caption"
              color="text.primary"
              href={item.link}
              key={index}
              sx={{
                typography: {
                  sm: 'body2',
                },
              }}
            >
              {item.text}
            </Link>
          )
        })}
      </Breadcrumbs>
    </div>
  )
}
