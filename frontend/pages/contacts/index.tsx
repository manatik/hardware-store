import React, { useEffect } from 'react'
import { NextPage } from 'next'
import Layout from '@features/Basic/common/Layout'
import Image from 'next/image'
import { wrapper } from '@store/store'
import { ProjectPage, useServerSideProps } from '@hooks'

import cn from 'classnames'

import map from 'assets/map.png'
import { useAppDispatch } from '@store/hooks'
import { initBasket } from '@store/basket/basketSlice'
import styles from './index.module.scss'

const Contacts: NextPage = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initBasket())
  }, [])

  return (
    <Layout
      dark={true}
      absolute={false}
      pageName="ContactsPage"
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
                  href="https://api.whatsapp.com/send?phone=79091349009&text="
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(styles.contacts__link, styles.contacts__linkWU)}
                >
                  +79091349009
                </a>
                <span className={cn(styles.contacts__link, styles.contacts__linkPin)}>
                  г. Киров, ул. Индустриальная 20А
                </span>
                <a
                  href="https://t.me/plywood_market"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(styles.contacts__link, styles.contacts__linkTG)}
                >
                  https://t.me/plywood_market
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
                  href="mailto:info@plywoodmarket.ru"
                  className={cn(styles.contacts__link, styles.contacts__linkEmail)}
                >
                  info@plywoodmarket.ru
                </a>
                <a
                  href="https://www.ozon.ru/seller/plywood-market-622604/products/?miniapp=seller_622604"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(styles.contacts__link, styles.contacts__linkOzon)}
                >
                  Plywood market
                </a>
              </div>
            </div>
            <div className={styles.contacts__map_desktop}>
              <Image
                src={map}
                quality={100}
                placeholder="blur"
                layout="responsive"
                alt=""
              />
            </div>
            <div style={{ display: 'none' }}>
              Доставка в город: Москва, Санкт-Петербург, Новосибирск,
              Екатеринбург, Казань, Нижний Новгород,Челябинск, Самара, Омск,
              Ростов-на-Дону, Уфа, Красноярск, Воронеж, Пермь, Волгоград,
              Сыктывкар, Вологда, Великий Устюг, Котлас, Киров, Кирово-Чепецк,
              Краснодар, Саратов, Тюмень, Тольятти, Ижевск, Барнаул, Ульяновск,
              Иркутск, Хабаровск, Махачкала, Ярославль, Владивосток, Оренбург,
              Томск, Кемерово, Новокузнецк, Рязань, Набережные Челны, Астрахань,
              Пенза, Севастополь, Балашиха, Липецк, Зеленоград, Чебоксары, Йошкар-Ола,
              Сочи, Иваново, Кирово-Чепецк, Брянск, Владимир, Чита, Архангельск, Мурманск,
              Кострома, Химки, Апрелевка, Волоколамск, Дзержинский, Долгопрудный,
              Домодедово, Дубна, Жуковский, Звенигород, Королев, Клин, Коломна, Мытищи.
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
