import React, { FC, ReactElement } from 'react'
import Topline from '@features/Basic/common/Topline'
import Footer from '@features/Basic/common/Footer'
import { Children } from '@models/Props/props'

const Layout: FC<Children> = ({ children }): ReactElement => {
  return (
    <>
      <Topline />
      {children}
      <Footer />
    </>
  )
}

export default Layout
