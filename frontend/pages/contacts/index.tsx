import React from 'react'
import { NextPage } from 'next'
import Layout from '@features/Basic/common/Layout'
import Image from 'next/image'
import { wrapper } from '@store/store'
import { ProjectPage, useServerSideProps } from '@hooks'

import cn from 'classnames'

import map from 'assets/map.png'
import styles from './index.module.scss'

const Contacts: NextPage = () => {
  return (
    <Layout
      dark={true}
      absolute={false}
    >
      <div className={styles.contacts}>
        <div className={styles.contacts__inner}>
          <div className={styles.contacts__title}>Контакты</div>
          <div className={styles.contacts__map}>
            <div className={styles.contacts__map__contacts}>
              <div className={styles.contacts__map__contacts__title}>Plywood Market</div>
              <div className={styles.contacts__map__contacts__links}>
                <a
                  href="tel:+79091349009"
                  className={cn(styles.contacts__link, styles.contacts__linkPhone)}
                >
                  +79091349009
                </a>
                <a
                  href="mailto:info@plywoodmarket.ru"
                  className={cn(styles.contacts__link, styles.contacts__linkEmail)}
                >
                  info@plywoodmarket.ru
                </a>
                <a
                  href="https://vk.com/plywood_market"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(styles.contacts__link, styles.contacts__linkVK)}
                >
                  https://vk.com/plywood_market
                </a>
                <a
                  href="https://t.me/plywood_market"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(styles.contacts__link, styles.contacts__linkTG)}
                >
                  https://t.me/plywood_market
                </a>
                <a
                  href="https://api.whatsapp.com/send?phone=79091349009&text=Plywood%20Market"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(styles.contacts__link, styles.contacts__linkWU)}
                >
                  +79091349009
                </a>
                <span className={cn(styles.contacts__link, styles.contacts__linkPin)}>
                  г. Киров, ул. Индустриальная 20А
                </span>
              </div>
            </div>
            <div className={styles.contacts__map_desktop}>
              <Image
                src={map}
                quality={100}
                placeholder="blur"
                layout="responsive"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => useServerSideProps(ProjectPage.Contacts, context, store),
)

export default Contacts
