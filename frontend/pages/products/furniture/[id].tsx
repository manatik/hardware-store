import React, { useEffect } from 'react'
import { NextPage } from 'next'
import { useAppDispatch } from '@store/hooks'
import { initBasket } from '@store/basket/basketSlice'

const CardItem: NextPage = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initBasket())
  }, [])

  return (
    <div>
        card
    </div>
  )
}

export default CardItem
