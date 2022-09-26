import React, { FC } from 'react'
import Topline from '@features/Basic/common/Topline'
import Footer from '@features/Basic/common/Footer'
import { Children } from '@models/Props/props'

interface LayoutProps {
  children: Children;
  dark?: boolean;
  link?: string;
}

const Layout: FC<LayoutProps> = ({
  children,
  dark = false,
  link,
}) => {
  return (
    <>
      <Topline
        dark={dark}
        link={link}
      />
      {children}
      <Footer />
    </>
  )
}

export default Layout
