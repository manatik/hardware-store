import React from 'react'
import { NextPage } from 'next'
import AdminLayout from '@features/Admin/common/Admin-Layout'
import { wrapper } from '@store/store'
import { ProjectPage, useServerSideProps } from '@hooks'
import ContainerProduct from '@features/Admin/common/ContainerProduct'
import Card from '@features/Admin/ui/Card'
import { OrderItem } from '@models/Order'

const Orders: NextPage<{ orders: OrderItem[] }> = ({ orders }) => {
  console.log(orders)
  return (
    <AdminLayout>
      <ContainerProduct
        title="Заказы"
      />
      {orders?.length > 0 ? orders.map((item) => (
        <Card
          key={item.id}
          title={item.email}
          edit={false}
        />
      )) : (
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
