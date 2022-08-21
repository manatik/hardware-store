import React from 'react'
import { NextPage } from 'next'
import AdminLayout from '@features/Admin/common/Admin-Layout'
import { wrapper } from '@store/store'
import { ProjectPage, useServerSideProps } from '@hooks'

const Orders: NextPage = () => {
  return (
    <AdminLayout>
      <div>
        Тут будут отображаться ваши заказы
      </div>
    </AdminLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  ({ dispatch }) => async (context) => useServerSideProps(ProjectPage.Orders, context, dispatch),
)

export default Orders
