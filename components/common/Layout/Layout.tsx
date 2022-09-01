import React, { ReactElement } from 'react'

import { Container } from '@mui/material'

const Layout = ({ children }: { children: ReactElement }) => {
  return <Container maxWidth={'xl'}>{children}</Container>
}

export default Layout
