import React from 'react'
import { NextPage } from 'next'
import Layout from '@features/Basic/common/Layout'
import { wrapper } from '@store/store'
import { ProjectPage, useServerSideProps } from '@hooks'
import ServiceFeature from '@features/Basic/ui/Service'

import styles from '@features/Basic/ui/Service/index.module.scss'

const Service: NextPage<{ link: string, dark: boolean }> = ({
  link, dark,
}) => {
  return (
    <Layout
      dark={dark}
      absolute={false}
      link={link}
    >
      <div className={styles.service__wrap}>
        <div className={styles.service__title}>Сервис</div>
        <ServiceFeature />
      </div>
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => useServerSideProps(ProjectPage.Service, context, store),
)

export default Service
