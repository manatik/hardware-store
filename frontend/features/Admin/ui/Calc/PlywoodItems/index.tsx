import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import {
  getCoatingDensity, getFormats, getPhotos, getSorts, getTypes, getWidthPlywood,
} from '@store/calc/selector'
import { fetchCalcRemoveParamsAsync, fetchCalcUpdateParamsAsync } from '@store/calc/calcSlice'
import { toast } from 'react-toastify'
import { CalcData } from '@models/Calc'
import styles from '@pages/admin-control/calc/index.module.scss'
import CardGrid from '@features/Admin/ui/CardGrid'
import { FurniturePhotosModal } from '@models/Products'
import cn from 'classnames'

enum Tabs {
  COAT_DEN,
  FORMAT,
  SORT,
  WIDTH,
  TYPE,
  PHOTOS
}

const PlywoodItems = () => {
  const [currentTab, setCurrentTab] = useState<Tabs>(Tabs.COAT_DEN)
  const formats = useAppSelector(getFormats)
  const sorts = useAppSelector(getSorts)
  const types = useAppSelector(getTypes)
  const widthPlywoods = useAppSelector(getWidthPlywood)
  const coatingDensity = useAppSelector(getCoatingDensity)
  const images = useAppSelector(getPhotos)
  const dispatch = useAppDispatch()

  const handleTab = (tab: Tabs) => setCurrentTab(tab)

  const isActiveTab = (tab: Tabs) => tab === currentTab

  const handleRemoveItem = async (id: string, endpoint: number) => {
    try {
      dispatch(fetchCalcRemoveParamsAsync({ id, endpoint }))
      toast.success('Успешно удалено')
    } catch (e) {
      toast.error('Ошибка сервера')
    }
  }

  const handleUpdateItem = async (id: string, data: CalcData, endpoint: number) => {
    try {
      dispatch(fetchCalcUpdateParamsAsync({ id, endpoint, values: data }))
      toast.success('Успешно обновлено')
    } catch (e) {
      toast.error('Ошибка сервера')
    }
  }

  return (
    <div className={styles.feature}>
      <div className={styles.feature__tabs}>
        <span
          className={cn(styles.feature__tabs__tab, {
            [styles.feature__tabs__tab_active]: isActiveTab(Tabs.COAT_DEN),
          })}
          onClick={() => handleTab(Tabs.COAT_DEN)}
        >
          Плотность покрытия
        </span>

        <span
          className={cn(styles.feature__tabs__tab, {
            [styles.feature__tabs__tab_active]: isActiveTab(Tabs.FORMAT),
          })}
          onClick={() => handleTab(Tabs.FORMAT)}
        >
          Формат листа
        </span>

        <span
          className={cn(styles.feature__tabs__tab, {
            [styles.feature__tabs__tab_active]: isActiveTab(Tabs.SORT),
          })}
          onClick={() => handleTab(Tabs.SORT)}
        >
          Сорт
        </span>

        <span
          className={cn(styles.feature__tabs__tab, {
            [styles.feature__tabs__tab_active]: isActiveTab(Tabs.WIDTH),
          })}
          onClick={() => handleTab(Tabs.WIDTH)}
        >
          Толщина листа
        </span>

        <span
          className={cn(styles.feature__tabs__tab, {
            [styles.feature__tabs__tab_active]: isActiveTab(Tabs.TYPE),
          })}
          onClick={() => handleTab(Tabs.TYPE)}
        >
          Вид фанеры
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

      {isActiveTab(Tabs.COAT_DEN) && coatingDensity && (
        <div className={styles.feature__container}>
          <div className={styles.feature__card__container}>
            {coatingDensity.map((item: CalcData) => (
              <CardGrid
                key={item.id}
                id={item.id as string}
                title={item.name}
                price={item.price}
                endpoint={1}
                type="plywood"
                onUpdate={handleUpdateItem}
                onRemove={handleRemoveItem}
              />
            ))}
          </div>
        </div>
      )}
      {isActiveTab(Tabs.FORMAT) && formats && (
        <div className={styles.feature__container}>
          <div className={styles.feature__card__container}>
            {formats.map((item: CalcData) => (
              <CardGrid
                key={item.id}
                id={item.id as string}
                title={item.name}
                price={item.price}
                endpoint={2}
                type="plywood"
                onUpdate={handleUpdateItem}
                onRemove={handleRemoveItem}
              />
            ))}
          </div>
        </div>
      )}
      {isActiveTab(Tabs.SORT) && sorts && (
        <div className={styles.feature__container}>
          <div className={styles.feature__card__container}>
            {sorts.map((item: CalcData) => (
              <CardGrid
                key={item.id}
                id={item.id as string}
                title={item.name}
                price={item.price}
                endpoint={3}
                type="plywood"
                onUpdate={handleUpdateItem}
                onRemove={handleRemoveItem}
              />
            ))}
          </div>
        </div>
      )}
      {isActiveTab(Tabs.WIDTH) && widthPlywoods && (
        <div className={styles.feature__container}>
          <div className={styles.feature__card__container}>
            {widthPlywoods.map((item: CalcData) => (
              <CardGrid
                key={item.id}
                id={item.id as string}
                title={item.name}
                price={item.price}
                endpoint={4}
                type="plywood"
                onUpdate={handleUpdateItem}
                onRemove={handleRemoveItem}
              />
            ))}
          </div>
        </div>
      )}
      {isActiveTab(Tabs.TYPE) && types && (
        <div className={styles.feature__container}>
          <div className={styles.feature__card__container}>
            {types.map((item: CalcData) => (
              <CardGrid
                key={item.id}
                id={item.id as string}
                title={item.name}
                price={item.price}
                endpoint={5}
                type="plywood"
                onUpdate={handleUpdateItem}
                onRemove={handleRemoveItem}
              />
            ))}
          </div>
        </div>
      )}
      {isActiveTab(Tabs.PHOTOS) && images && (
        <div className={styles.feature__container}>
          <div className={styles.feature__card__container}>
            {images.map((item: FurniturePhotosModal) => (
              <CardGrid
                key={item.id}
                id={item.id as string}
                title={item.name}
                images={item.photos}
                endpoint={6}
                price={0}
                type="plywood"
                onRemove={handleRemoveItem}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default PlywoodItems
