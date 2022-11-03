import React, { FC, useEffect } from 'react'
import Image from 'next/image'
import Portal from '@features/Basic/common/Portal'
import Modal from '@features/Basic/common/Modal'

import close from 'assets/close.svg'
import Link from 'next/link'
import { ToplineLinks } from '@features/Basic/common/Topline'
import cn from 'classnames'
import { useAppSelector } from '@store/hooks'
import { getUserInfo } from '@store/app/selector'
import styles from './index.module.scss'

interface MobileMenuProps {
  onClose: () => void;
  openCall: () => void;
}
const MobileMenu: FC<MobileMenuProps> = ({ onClose, openCall }) => {
  const user = useAppSelector(getUserInfo)

  useEffect(() => {
    return () => document.documentElement.classList.remove('g_lockscroll')
  }, [])

  return (
    <Portal>
      <Modal onClose={onClose}>
        <div className={styles.mobileMenu}>
          <div
            className={styles.mobileMenu__close}
            onClick={onClose}
          >
             <Image
               src={close}
               alt="close"
             />
          </div>
          <div className={styles.mobileMenu__content}>
            <div className={styles.mobileMenu__top}>
              {user?.isAdmin && <Link href={ToplineLinks.Admin}>
                <a
                  className={styles.mobileMenu__link}
                >
                  Админка
                </a>
              </Link>}
              <Link href={ToplineLinks.Home}>
                <a
                  className={styles.mobileMenu__link}
                >
                  Главная
                </a>
              </Link>
              <Link href={ToplineLinks.Products}>
                <a
                  className={styles.mobileMenu__link}
                >
                  Продукты
                </a>
              </Link>
              <Link href={ToplineLinks.Service}>
                <a
                  className={styles.mobileMenu__link}
                >
                  Сервис
                </a>
              </Link>
              <Link href={ToplineLinks.Contacts}>
                <a
                  className={styles.mobileMenu__link}
                >
                  Контакты
                </a>
              </Link>
            </div>

            <div
              className={styles.mobileMenu__call}
              onClick={openCall}
            >
              Заказать Звонок
            </div>

            <div className={styles.mobileMenu__bottom}>
              <div className={styles.mobileMenu__social}>
                <a
                  href="https://vk.com/plywood_market"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(styles.mobileMenu__social__link, styles.mobileMenu__social__linkVk)}
                />

                <a
                  href="https://t.me/plywood_market"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(styles.mobileMenu__social__link, styles.mobileMenu__social__linkTg)}
                />

                <a
                  href="https://api.whatsapp.com/send?phone=79091349009&text="
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(styles.mobileMenu__social__link, styles.mobileMenu__social__linkWu)}
                />
              </div>

              <div className={styles.mobileMenu__market}>
                <a
                  href="https://www.ozon.ru/seller/plywood-market-622604/products/?miniapp=seller_622604"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    styles.mobileMenu__social__link,
                    styles.mobileMenu__social__linkOzon,
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </Portal>
  )
}

export default MobileMenu
