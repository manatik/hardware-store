import React, { ReactElement, useEffect } from 'react'
import type { NextPage } from 'next'
import { wrapper } from '@store/store'
import { ProjectPage, useServerSideProps } from '@hooks'
import Layout from '@features/Basic/common/Layout'
import HomeSlider from '@features/Basic/ui/Home/components/Slider'
import HomeInfo from '@features/Basic/ui/Home/components/Info'
import { useAppDispatch } from '@store/hooks'
import { initBasket } from '@store/basket/basketSlice'

const Home: NextPage = (): ReactElement => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initBasket())
  }, [])
  return (
    <>
      <Layout
        dark={false}
        pageName="HomePage"
      >
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
