import React from 'react'
import { NextPage } from 'next'
import Layout from '@features/Basic/common/Layout'
import { wrapper } from '@store/store'
import { ProjectPage, useServerSideProps } from '@hooks'
import ServiceFeature from '@features/Basic/ui/Service'

import styles from '@features/Basic/ui/Service/index.module.scss'

const Service: NextPage = () => {
  return (
    <Layout
      dark={true}
      absolute={false}
    >
      <div className={styles.service__wrap}>
        <div className={styles.service__title}>Сервис</div>
        <div className={styles.service__inner}>
          <ServiceFeature />
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => useServerSideProps(ProjectPage.Service, context, store),
)

export default Service
