import React, { ReactElement } from 'react'
import type { NextPage } from 'next'
import { wrapper } from '@store/store'
import { ProjectPage, useServerSideProps } from '@hooks'
import Layout from '@features/Basic/common/Layout'
import HomeSlider from '@features/Basic/ui/Home/components/Slider'
import HomeInfo from '@features/Basic/ui/Home/components/Info'

const Home: NextPage<{ dark: boolean }> = ({ dark }): ReactElement => {
  return (
    <>
      <Layout dark={dark}>
        <HomeSlider />
        <HomeInfo />
      </Layout>
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => useServerSideProps(ProjectPage.Index, context, store),
)

export default Home
