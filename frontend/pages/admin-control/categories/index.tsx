import React from 'react'
import { NextPage } from 'next'
import AdminLayout from '@features/Admin/common/Admin-Layout'

import ContainerProduct from '@features/Admin/common/ContainerProduct'
import { wrapper } from '@store/store'
import { ProjectPage, useServerSideProps } from '@hooks'

const Categories: NextPage = () => {
  return (
    <AdminLayout>
      <ContainerProduct
        title="Категории"
      />
    </AdminLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  ({ dispatch }) => async (context) => useServerSideProps(ProjectPage.Categories, context, dispatch),
)

export default Categories
