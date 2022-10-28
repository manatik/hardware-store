import React from 'react'
import { NextPage } from 'next'
import AdminLayout from '@features/Admin/common/Admin-Layout'
import { wrapper } from '@store/store'
import { ProjectPage, useServerSideProps } from '@hooks'
import ContainerProduct from '@features/Admin/common/ContainerProduct'
import { OrderItem } from '@models/Order'
import styles from '@features/Admin/ui/Card/index.module.scss'
import dynamic from 'next/dynamic'

const Card: any = dynamic(
  () => import('@features/Admin/ui/Card'),
  { ssr: false },
)

const Orders: NextPage<{orders: OrderItem[]}> = ({ orders }) => {
  return (
    <AdminLayout>
      <ContainerProduct
        title="Заказы"
      />
      {orders?.length > 0 ? orders.map((item) => {
        return (
          <Card
            key={item.id}
            title={item.email}
            edit={true}
            buttonName="Подробнее"
            form={(
              <>
                {item.fio && <div className={styles.card__title}>{item.fio}</div>}
                {item.phone && <div className={styles.card__title}>{item.phone}</div>}
                {item.createdAt && (
                  <div className={styles.card__title}>
                    Дата заказа: {new Date(item.createdAt).toLocaleDateString()}
                  </div>
                )}
                {item.plywoods && item.plywoods?.length > 0 && (
                  <>
                    <div
                      className={styles.card__left}
                      style={{ justifyContent: 'space-between' }}
                    >
                      <div
                        className={styles.card__title}
                        style={{ marginTop: '15px' }}
                      >Фанера</div>
                    </div>
                    <div>
                      {item.plywoods.map((item) => (
                        <div
                          key={item.id}
                          style={{ marginBottom: '15px' }}
                        >
                          {item.name && <div><b>Название:</b> {item.name}</div>}
                          {item.price && <div><b>Цена:</b> {item.price}</div>}
                          {item.article && <div><b>Артикул:</b> {item.article}</div>}
                        </div>
                      ))}
                    </div>
                  </>
                )}
                {item.furnitures && item.furnitures?.length > 0 && (
                  <>
                    <div
                      className={styles.card__left}
                      style={{ justifyContent: 'space-between' }}
                    >
                      <div
                        className={styles.card__title}
                        style={{ marginTop: '15px' }}
                      >Мебель</div>
                    </div>
                    <div>
                      {item.furnitures.map((item) => (
                        <div key={item.id}>
                          {item.name && <div><b>Название:</b> {item.name}</div>}
                          {item.price && <div><b>Цена:</b> {item.price}</div>}
                          {item.article && <div><b>Артикул:</b> {item.article}</div>}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          />
        )
      }) : (
        <div>
          Тут будут отображаться ваши заказы
        </div>
      )}
    </AdminLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => useServerSideProps(ProjectPage.Orders, context, store),
)

export default Orders
