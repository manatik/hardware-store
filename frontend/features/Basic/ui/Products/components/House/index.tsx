import React from 'react'
import { houseLinks, plywood, ProductLinks } from '@features/Basic/ui/Products/mockData'
import Slider from '@features/Basic/ui/Products/components/Slider'
import Links from '@features/Basic/ui/Products/components/Links'
import HouseInfo from '@features/Basic/ui/Products/components/House/components/HouseInfo'
import HouseOfferCard from '@features/Basic/ui/Products/components/House/components/HouseOfferCard'
import HouseCabinet from '@features/Basic/ui/Products/components/House/components/HouseCabinet'
import HouseEquipment from '@features/Basic/ui/Products/components/House/components/HouseEquipment'

const House = () => {
  return (
    <>
      <Slider sliders={plywood} />
      <Links
        links={houseLinks}
        defaultLink={ProductLinks.House}
      />

      <HouseInfo />
      <HouseOfferCard />
      <HouseCabinet />
      <HouseEquipment />
    </>
  )
}

export default House
