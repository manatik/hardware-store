import { FC, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { IChildren } from '@models/Props/props'

const Portal: FC<IChildren> = ({ children }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    return () => setMounted(false)
  }, [])

  return mounted
    ? createPortal(
      children,
      document.querySelector('#modal') as Element,
    )
    : null
}

export default Portal
