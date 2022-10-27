import React from 'react'
import styles from '@pages/admin-control/calc/index.module.scss'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { getFurnitureFeature, getFurniturePhotos } from '@store/products/selector'
import CardGrid from '@features/Admin/ui/CardGrid'
import { FurnitureFeatureItem, FurniturePhotosModal } from '@models/Products'
import { toast } from 'react-toastify'
import { fetchFurnitureFeatureAsync, fetchFurniturePhotosAsync } from '@store/products/productsSlice'
import { furnitureService } from '@services/products/furniture.service'

const FurnitureItems = () => {
  const dispatch = useAppDispatch()
  const feature = useAppSelector(getFurnitureFeature)
  const photos = useAppSelector(getFurniturePhotos)

  const handleRemovePhotos = async (id: string) => {
    try {
      const data = await furnitureService.furniturePhotosRemove(id)
      if (data.success) {
        await dispatch(fetchFurniturePhotosAsync())
        toast.success('Успешно удалено')
      }
    } catch (e) {
      toast.error('Ошибка сервера')
    }
  }

  const handleRemoveFeature = async (id: string) => {
    try {
      const data = await furnitureService.furnitureFeatureRemove(id)
      if (data.success) {
        await dispatch(fetchFurnitureFeatureAsync())
        toast.success('Успешно удалено')
      }
    } catch (e) {
      toast.error('Ошибка сервера')
    }
  }

  const handleUpdateFeature = async (id: string, values: any) => {
    try {
      const data = await furnitureService.furnitureFeatureUpdate({ ...values, id })
      if (data.success) {
        await dispatch(fetchFurnitureFeatureAsync())
        toast.success('Успешно обновлено')
      }
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
            {feature.map((item: FurnitureFeatureItem) => (
              <CardGrid
                key={item.id}
                id={item.id as string}
                title={item.name}
                price={item.price}
                endpoint={0}
                onUpdate={handleUpdateFeature}
                onRemove={handleRemoveFeature}
              />
            ))}
          </div>
        </div>
      )}
      {photos && (
        <div className={styles.feature__container}>
          <div className={styles.feature__title}>Фотографии</div>
          <div className={styles.feature__card__container}>
            {photos.map((item: FurniturePhotosModal) => (
              <CardGrid
                key={item.id}
                id={item.id as string}
                images={item.photos}
                title={item.name}
                price={0}
                endpoint={0}
                onRemove={handleRemovePhotos}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default FurnitureItems
