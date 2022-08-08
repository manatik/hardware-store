import React from 'react'
import { NextPage } from 'next'
import AdminLayout from '@features/Admin-Layout'

const Orders: NextPage = () => {
  return (
    <AdminLayout>
      <div>
        Тут будут отображаться ваши заказы
      </div>
    </AdminLayout>
  )
}

export default Orders
