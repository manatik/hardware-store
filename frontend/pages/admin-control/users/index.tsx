import React from 'react'
import { NextPage } from 'next'
import AdminLayout from '@features/Admin-Layout'

const Users: NextPage = () => {
  return (
    <AdminLayout>
      <div>
        Заркгистрированные пользователи
      </div>
    </AdminLayout>
  )
}

export default Users
