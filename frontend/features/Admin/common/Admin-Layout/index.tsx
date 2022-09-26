import React, { FC, ReactElement, useState } from 'react'
import Link from 'next/link'
import { IChildren } from '@models/Props/props'
import { adminLinks } from '@features/Admin/common/Admin-Layout/links'
import styles from './index.module.scss'

const AdminLayout: FC<IChildren> = ({ children }): ReactElement => {
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const toggleMenu = () => {
    setOpenMenu(!openMenu)
  }
  return (
    <>
      <div className={styles.adminLayout__header}>
        <div className={styles.adminLayout__header_container}>
          <div className={styles.adminLayout__header_content}>
            {adminLinks && adminLinks.map((item) => (
              <Link
                key={item.link}
                href={item.link}
              >
                <a className={styles.adminLayout__link}>{item.title}</a>
              </Link>
            ))}
          </div>

          <div className={styles.adminLayout__mobile}>
            <div
              onClick={toggleMenu}
              className={styles.adminLayout__mobile__open}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
            {openMenu && <div className={styles.adminLayout__mobile__menu}>
              <div className={styles.adminLayout__mobile__menu__inner}>
                {adminLinks && adminLinks.map((item) => (
                  <Link
                    key={item.link}
                    href={item.link}
                  >
                    <a className={styles.adminLayout__mobile__menu__item}>{item.title}</a>
                  </Link>
                ))}
              </div>
            </div>}
          </div>
        </div>
      </div>
      <div className={styles.adminLayout__main}>
        <div className={styles.adminLayout__main_container}>
          {children}
        </div>
      </div>
    </>
  )
}

export default AdminLayout
