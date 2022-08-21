import React from 'react'
import type { NextPage } from 'next'
import { wrapper } from '@store/store'
import { ProjectPage, useServerSideProps } from '@hooks'

const Home: NextPage = () => {
  return (
    <div>
      home
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  ({ dispatch }) => async (context) => useServerSideProps(ProjectPage.Index, context, dispatch),
)

export default Home
