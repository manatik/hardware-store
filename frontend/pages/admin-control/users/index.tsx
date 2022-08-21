import React from 'react'
import { NextPage } from 'next'
import AdminLayout from '@features/Admin/common/Admin-Layout'
import { wrapper } from '@store/store'
import { ProjectPage, useServerSideProps } from '@hooks'

const Users: NextPage = () => {
  return (
    <AdminLayout>
      <div>
        Заркгистрированные пользователи
      </div>
    </AdminLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  ({ dispatch }) => async (context) => useServerSideProps(ProjectPage.Users, context, dispatch),
)

export default Users
