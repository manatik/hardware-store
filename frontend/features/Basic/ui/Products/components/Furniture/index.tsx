import React from 'react'
import { furnitureLinks, plywood, ProductLinks } from '@features/Basic/ui/Products/mockData'
import Slider from '@features/Basic/ui/Products/components/Slider'
import Links from '@features/Basic/ui/Products/components/Links'
import FurnitureInfo from '@features/Basic/ui/Products/components/Furniture/components/FurnitureInfo'
import FurnitureCabinet from '@features/Basic/ui/Products/components/Furniture/components/FurnitureCabinet'
import FurnitureDesigner from '@features/Basic/ui/Products/components/Furniture/components/FurnitureDesigner'
import FurnitureDelivery from '@features/Basic/ui/Products/components/Furniture/components/FurnitureDelivery'

const Furniture = () => {
  return (
    <>
      <Slider sliders={plywood} />
      <Links
        links={furnitureLinks}
        defaultLink={ProductLinks.Furniture}
      />

      <FurnitureInfo />
      <FurnitureCabinet />
      <FurnitureDesigner />
      <FurnitureDelivery />
    </>
  )
}

export default Furniture
