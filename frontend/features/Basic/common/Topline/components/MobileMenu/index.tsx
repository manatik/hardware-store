import React, { FC } from 'react'
import Image from 'next/image'
import Portal from '@features/Basic/common/Portal'
import Modal from '@features/Basic/common/Modal'

import close from 'assets/close.svg'
import Link from 'next/link'
import { ToplineLinks } from '@features/Basic/common/Topline'
import vkDark from 'assets/layout/mobile-menu/vk-dark-mobile.svg'
import tgDark from 'assets/layout/mobile-menu/tg-dark-mobile.svg'
import wuDark from 'assets/layout/mobile-menu/wu-dark-mobile.svg'
import wbDark from 'assets/layout/wb-dark.svg'
import ozonDark from 'assets/layout/ozon-dark.svg'
import styles from './index.module.scss'

interface MobileMenuProps {
  onClose: () => void;
  openCall: () => void;
}
const MobileMenu: FC<MobileMenuProps> = ({ onClose, openCall }) => {
  return (
    <Portal>
      <Modal>
        <div className={styles.mobileMenu}>
          <div
            className={styles.mobileMenu__close}
            onClick={onClose}
          >
            <Image src={close} />
          </div>
          <div className={styles.mobileMenu__content}>
            <div className={styles.mobileMenu__top}>
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
                  className={styles.mobileMenu__social__link}
                >
                  <Image src={vkDark} />
                </a>

                <a
                  href="https://t.me/plywood_market"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mobileMenu__social__link}
                >
                  <Image src={tgDark} />
                </a>

                <a
                  href="https://api.whatsapp.com/send?phone=79091349009&text=Plywood%20Market"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mobileMenu__social__link}
                >
                  <Image src={wuDark} />
                </a>
              </div>

              <div className={styles.mobileMenu__market}>
                <a
                  href="https://t.me/plywood_market"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mobileMenu__market__link}
                >
                  <Image src={wbDark} />
                </a>

                <a
                  href="https://api.whatsapp.com/send?phone=79091349009&text=Plywood%20Market"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mobileMenu__market__link}
                >
                  <Image src={ozonDark} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </Portal>
  )
}

export default MobileMenu
