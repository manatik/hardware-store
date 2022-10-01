import React from 'react'
import { houseLinks, plywood, ProductLinks } from '@features/Basic/ui/Products/mockData'
import Slider from '@features/Basic/ui/Products/components/Slider'
import Links from '@features/Basic/ui/Products/components/Links'
import HouseInfo from '@features/Basic/ui/Products/components/House/components/HouseInfo'

const House = () => {
  return (
    <>
      <Slider sliders={plywood} />
      <Links
        links={houseLinks}
        defaultLink={ProductLinks.House}
      />

      <HouseInfo />
    </>
  )
}

export default House
