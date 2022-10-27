import React from 'react'
import styles from '@pages/admin-control/calc/index.module.scss'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { getFurnitureFeature } from '@store/products/selector'
import CardGrid from '@features/Admin/ui/CardGrid'
import { FurnitureItem } from '@models/Products'
import { toast } from 'react-toastify'
import { fetchFurnitureFeatureUpdateAsync } from '@store/products/productsSlice'
import { furnitureService } from '@services/products/furniture.service'

const FurnitureItems = () => {
  const dispatch = useAppDispatch()
  const feature = useAppSelector(getFurnitureFeature)

  const handleRemoveItem = async (id: string) => {
    try {
      await furnitureService.furnitureFeatureRemove(id)
      toast.success('Успешно удалено')
    } catch (e) {
      toast.error('Ошибка сервера')
    }
  }

  const handleUpdateItem = async (id: string, data: any) => {
    try {
      await dispatch(fetchFurnitureFeatureUpdateAsync({ ...data, id }))
      toast.success('Успешно обновлено')
    } catch (e) {
      toast.error('Ошибка сервера')
    }
  }
  return (
    <div className={styles.feature}>
      {feature && (
        <div className={styles.feature__container}>
          <div className={styles.feature__title}>Прайсы</div>
          <div className={styles.feature__card__container}>
            {feature.map((item: FurnitureItem) => (
              <CardGrid
                key={item.id}
                id={item.id as string}
                title={item.name}
                price={item.price}
                endpoint={0}
                onUpdate={handleUpdateItem}
                onRemove={handleRemoveItem}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default FurnitureItems
