import React from 'react'
import { NextPage } from 'next'
import AdminLayout from '@features/Admin/common/Admin-Layout'
import { wrapper } from '@store/store'
import { ProjectPage, useServerSideProps } from '@hooks'
import ContainerProduct from '@features/Admin/common/ContainerProduct'
import { User } from '@models/Users'
import Card from '@features/Admin/ui/Card'

const Users: NextPage = ({ users }: any) => {
  return (
    <AdminLayout>
      <ContainerProduct
        title="Пользователи"
      />
      {users ? users.map((item: User) => (
        <Card
          key={item.id}
          title={item.email}
          edit={false}
        />
      ))
        : <div>Произошла ошибка на сервере или у вас не достаточно прав.</div>
      }
    </AdminLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => useServerSideProps(ProjectPage.Users, context, store),
)

export default Users
