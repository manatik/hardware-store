import React, { useState } from 'react'
import styles from '@pages/admin-control/calc/index.module.scss'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { getFurnitureFeature, getFurnitureParams, getFurniturePhotos } from '@store/products/selector'
import CardGrid from '@features/Admin/ui/CardGrid'
import { FurnitureFeatureItem, FurnitureParamItem, FurniturePhotosModal } from '@models/Products'
import { toast } from 'react-toastify'
import {
  fetchFurnitureFeatureAsync,
  fetchFurnitureParamsAsync,
  fetchFurniturePhotosAsync,
} from '@store/products/productsSlice'
import { furnitureService } from '@services/products/furniture.service'
import cn from 'classnames'

enum Tabs {
  PRICE,
  PARAMS,
  PHOTOS
}

const FurnitureItems = () => {
  const [currentTab, setCurrentTab] = useState<Tabs>(Tabs.PRICE)
  const dispatch = useAppDispatch()
  const feature = useAppSelector(getFurnitureFeature)
  const params = useAppSelector(getFurnitureParams)
  const photos = useAppSelector(getFurniturePhotos)

  const handleTab = (tab: Tabs) => setCurrentTab(tab)

  const isActiveTab = (tab: Tabs) => tab === currentTab

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

  const handleRemoveParams = async (id: string) => {
    try {
      const data = await furnitureService.furnitureParamsRemove(id)
      if (data.success) {
        await dispatch(fetchFurnitureParamsAsync())
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

  const handleUpdateParams = async (id: string, values: any) => {
    try {
      const data = await furnitureService.furnitureParamsUpdate({
        value: values.paramValue,
        description: values.description,
        name: values.name,
        id,
      })
      if (data.success) {
        await dispatch(fetchFurnitureParamsAsync())
        toast.success('Успешно обновлено')
      }
    } catch (e) {
      toast.error('Ошибка сервера')
    }
  }
  return (
    <div className={styles.feature}>
      <div className={styles.feature__tabs}>
        <span
          className={cn(styles.feature__tabs__tab, {
            [styles.feature__tabs__tab_active]: isActiveTab(Tabs.PRICE),
          })}
          onClick={() => handleTab(Tabs.PRICE)}
        >
          Прайсы
        </span>

        <span
          className={cn(styles.feature__tabs__tab, {
            [styles.feature__tabs__tab_active]: isActiveTab(Tabs.PARAMS),
          })}
          onClick={() => handleTab(Tabs.PARAMS)}
        >
          Параметры
        </span>

        <span
          className={cn(styles.feature__tabs__tab, {
            [styles.feature__tabs__tab_active]: isActiveTab(Tabs.PHOTOS),
          })}
          onClick={() => handleTab(Tabs.PHOTOS)}
        >
          Фотографии
        </span>
      </div>

      {isActiveTab(Tabs.PRICE) && feature && (
        <div className={styles.feature__container}>
          <div className={styles.feature__card__container}>
            {feature.map((item: FurnitureFeatureItem) => (
              <CardGrid
                key={item.id}
                id={item.id as string}
                title={item.name}
                price={item.price}
                description={item.description}
                endpoint={0}
                type="furniture"
                onUpdate={handleUpdateFeature}
                onRemove={handleRemoveFeature}
              />
            ))}
          </div>
        </div>
      )}
      {isActiveTab(Tabs.PARAMS) && params && (
        <div className={styles.feature__container}>
          <div className={styles.feature__card__container}>
            {params.map((item: FurnitureParamItem) => (
              <CardGrid
                key={item.id}
                id={item.id as string}
                title={item.name}
                price={0}
                paramValue={item.value}
                description={item.description}
                endpoint={0}
                type="furniture"
                onUpdate={handleUpdateParams}
                onRemove={handleRemoveParams}
              />
            ))}
          </div>
        </div>
      )}
      {isActiveTab(Tabs.PHOTOS) && photos && (
        <div className={styles.feature__container}>
          <div className={styles.feature__card__container}>
            {photos.map((item: FurniturePhotosModal) => (
              <CardGrid
                key={item.id}
                id={item.id as string}
                images={item.photos}
                title={item.name}
                price={0}
                endpoint={0}
                type="furniture"
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
