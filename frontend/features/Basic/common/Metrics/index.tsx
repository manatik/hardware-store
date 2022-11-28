import React, {
  FC, ReactElement, useEffect,
} from 'react'

import { useAppSelector } from 'store/hooks'
import { getUserInfo } from 'store/app/selector'
import { yandexCounter } from 'utils/metrics/yandexCounter'
import { useRouter } from 'next/router'
import { UserData } from '@models/Users'

const Metrics: FC = (): ReactElement => {
  const router = useRouter()
  const userInfo = useAppSelector<UserData>(getUserInfo)

  useEffect(() => {
    const pathname: string = router.asPath

    yandexCounter.hit(pathname)
  }, [router])

  useEffect(() => {
    if (userInfo !== null) {
      const proAuth = (userInfo?.email) ? 'auth' : 'noauth'

      yandexCounter.initParams('auth_user', proAuth)
    }
  }, [])

  return (
    <>
    </>
  )
}

export default Metrics
