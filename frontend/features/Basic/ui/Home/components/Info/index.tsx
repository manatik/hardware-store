import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { setCookie } from 'cookies-next'
import cn from 'classnames'
import plywood from 'assets/slider/slide-3.webp'
import furniture from 'assets/slider/slide-7.webp'
import styles from './index.module.scss'

const Info = () => {
  const router = useRouter()
  const handleLink = async (link: string, hash?: string) => {
    if (link === 'service') {
      await router.push('/service')
    } else {
      await setCookie('ProductBlock', link)
      await router.push(`/products${hash ? `#${hash}` : ''}`)
    }
  }
  return (
    <div className={styles.info}>
      <div className={styles.info__inner}>
        <div className={styles.info__products}>
          <div className={styles.info__title}>Продукты и сервис</div>
          <div className={styles.info__cards}>
            <div className={cn(styles.info__card, styles.info__cardHome)}>
              <div className={styles.info__card__title}>Домостроение</div>
              <div
                className={cn(
                  styles.info__card__subTitle,
                  styles.info__card__subTitleLink,
                )}
                onClick={() => handleLink('house', 'house')}
              >О продукте</div>
              <div
                className={cn(
                  styles.info__card__subTitle,
                  styles.info__card__subTitleLink,
                )}
                onClick={() => handleLink('house', 'plan')}
              >Варианты планировок</div>
              <div
                className={cn(
                  styles.info__card__subTitle,
                  styles.info__card__subTitleLink,
                )}
                onClick={() => handleLink('house', 'options')}
              >Варианты комплектации</div>
            </div>
            <div className={cn(styles.info__card, styles.info__cardFurniture)}>
              <div className={styles.info__card__title}>Мебель</div>
              <div
                className={cn(
                  styles.info__card__subTitle,
                  styles.info__card__subTitleLink,
                )}
                onClick={() => handleLink('furniture', 'cabinet')}
              >Корпусная мебель</div>
              <div
                className={cn(
                  styles.info__card__subTitle,
                  styles.info__card__subTitleLink,
                )}
                onClick={() => handleLink('furniture', 'designer')}
              >Дизайнерская мебель</div>
              <div
                className={cn(
                  styles.info__card__subTitle,
                  styles.info__card__subTitleLink,
                )}
                onClick={() => handleLink('furniture', 'delivery')}
              >Логистика</div>
            </div>
            <div
              className={cn(styles.info__card, styles.info__cardLink, styles.info__cardPlyWood)}
              onClick={() => handleLink('plywood', 'range')}
            >
              <div className={styles.info__card__title}>Фанера</div>
              <div className={styles.info__card__subTitle}>ФСФ</div>
              <div className={styles.info__card__subTitle}>ФК</div>
              <div className={styles.info__card__subTitle}>Трудногорючая</div>
              <div className={styles.info__card__subTitle}>Ламинированная</div>
              <div className={styles.info__card__subTitle}>С покрытием</div>
              <div className={styles.info__card__subTitle}>Под покраску</div>
            </div>
            <div
              className={cn(styles.info__card, styles.info__cardLink, styles.info__cardService)}
              onClick={() => handleLink('service')}
            >
              <div className={styles.info__card__title}>Сервис</div>
              <div className={styles.info__card__subTitle}>Фрезерование</div>
              <div className={styles.info__card__subTitle}>Сверление</div>
              <div className={styles.info__card__subTitle}>Шип-паз</div>
              <div className={styles.info__card__subTitle}>Распил</div>
              <div className={styles.info__card__subTitle}>Нанесение пластика</div>
              <div className={styles.info__card__subTitle}>Покраска</div>
            </div>
          </div>
        </div>
        <div className={styles.info__about}>
          <div className={styles.info__title}>О нас</div>
          <div className={styles.info__about__inner}>
            <div className={styles.info__about__description}>
              Наша компания является экспертом в области фанеры и фанерных технологиях.<br />
              <br />
              Понимание развивающихся мировых тенденций, специализация на фанере,
              знание особенностей материала делают нас уникальными поставщиками и гарантируют
              нашим клиентам лучшие материалы для каждого индивидуального заказа.
            </div>
            <div className={styles.info__about__image}>
              <Image
                src={plywood}
                placeholder="blur"
                width={612}
                height={312}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className={styles.info__edge}>
          <div className={styles.info__title}>Преимущества</div>
          <div className={styles.info__edge__inner}>
            <div className={styles.info__edge__fake} />
            <div className={styles.info__edge__image}>
              <Image
                src={furniture}
                placeholder="blur"
                // width={638}
                // height={525}
                alt=""
              />
            </div>
            <div className={styles.info__edge__description}>
              <div className={styles.info__edge__description__title}>
                Собственное производство с высокоточным парком оборудования
              </div>
              <div className={styles.info__edge__description__subTitle}>
                Парк оборудования позволяет осуществлять различные виды обработки фанеры
                объёмом до 1500 м3 в месяц
                (фрезерование, распил, сверление отверстий, снятие фасок и т.д)
              </div>
              <div className={styles.info__edge__description__title}>
                Поставка готовых домокомплектов под ключ
              </div>
              <div className={styles.info__edge__description__subTitle}>
                Разработка готовых решений, установка домокомплектов под ключ,
                комплектация мебелью собственного производства
                (спальня, кухонный гарнитур, детская и т.д.).
                Возможность заготовки до 30 домокомплектов месяц
              </div>
              <div className={styles.info__edge__description__title}>
                Квалифицированные специалисты
              </div>
              <div className={styles.info__edge__description__subTitle}>
                Обширная область знаний специалистов позволяет подбирать необходимый
                материал и разрабатывать технические решения под конкретные цели заказчика.
                Понимание мирового рынка в области фанеры и домостроения позволяет
                компании быть уникальным исполнителем заказов.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Info
