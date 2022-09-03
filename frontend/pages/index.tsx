import React from 'react'
import type { NextPage } from 'next'
import { wrapper } from '@store/store'
import { ProjectPage, useServerSideProps } from '@hooks'

const Home: NextPage = () => {
  return <div>home</div>
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => useServerSideProps(ProjectPage.Index, context, store),
)

export default Home
