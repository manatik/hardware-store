import React from 'react'
import { houseLinks, ProductLinks } from '@features/Basic/ui/Products/mockData'
import Links from '@features/Basic/ui/Products/components/Links'
import HouseInfo from '@features/Basic/ui/Products/components/House/components/HouseInfo'
import HouseOfferCard from '@features/Basic/ui/Products/components/House/components/HouseOfferCard'
import HouseCabinet from '@features/Basic/ui/Products/components/House/components/HouseCabinet'
import HouseEquipment from '@features/Basic/ui/Products/components/House/components/HouseEquipment'
import HouseVariants from '@features/Basic/ui/Products/components/House/components/HouseVariants'

const House = () => {
  return (
    <>
      <Links
        links={houseLinks}
        defaultLink={ProductLinks.Plan}
      />

      <HouseVariants />
      <HouseInfo />
      <HouseOfferCard />
      <HouseCabinet />
      <HouseEquipment />
    </>
  )
}

export default House
