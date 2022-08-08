import React from 'react'
import { NextPage } from 'next'
import AdminLayout from '@features/Admin-Layout/index'

const AdminControl: NextPage = () => {
  return (
    <AdminLayout>
      <div>
        Тут будут отображаться сообщения из формы на главной
      </div>
    </AdminLayout>
  )
}

export default AdminControl
