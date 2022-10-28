import React from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import {
  getCoatingDensity, getFormats, getPhotos, getSorts, getTypes, getWidthPlywood,
} from '@store/calc/selector'
import { fetchCalcRemoveParamsAsync, fetchCalcUpdateParamsAsync } from '@store/calc/calcSlice'
import { toast } from 'react-toastify'
import { CalcData } from '@models/Calc'
import styles from '@pages/admin-control/calc/index.module.scss'
import CardGrid from '@features/Admin/ui/CardGrid'
import { FurniturePhotosModal, PhotosModal } from '@models/Products'

const PlywoodItems = () => {
  const formats = useAppSelector(getFormats)
  const sorts = useAppSelector(getSorts)
  const types = useAppSelector(getTypes)
  const widthPlywoods = useAppSelector(getWidthPlywood)
  const coatingDensity = useAppSelector(getCoatingDensity)
  const images = useAppSelector(getPhotos)
  const dispatch = useAppDispatch()

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
      {coatingDensity && (
        <div className={styles.feature__container}>
          <div className={styles.feature__title}>Плотность покрытия</div>
          <div className={styles.feature__card__container}>
            {coatingDensity.map((item: CalcData) => (
              <CardGrid
                key={item.id}
                id={item.id as string}
                title={item.name}
                price={item.price}
                endpoint={1}
                onUpdate={handleUpdateItem}
                onRemove={handleRemoveItem}
              />
            ))}
          </div>
        </div>
      )}
      {formats && (
        <div className={styles.feature__container}>
          <div className={styles.feature__title}>Формат листа</div>
          <div className={styles.feature__card__container}>
            {formats.map((item: CalcData) => (
              <CardGrid
                key={item.id}
                id={item.id as string}
                title={item.name}
                price={item.price}
                endpoint={2}
                onUpdate={handleUpdateItem}
                onRemove={handleRemoveItem}
              />
            ))}
          </div>
        </div>
      )}
      {sorts && (
        <div className={styles.feature__container}>
          <div className={styles.feature__title}>Сорт</div>
          <div className={styles.feature__card__container}>
            {sorts.map((item: CalcData) => (
              <CardGrid
                key={item.id}
                id={item.id as string}
                title={item.name}
                price={item.price}
                endpoint={3}
                onUpdate={handleUpdateItem}
                onRemove={handleRemoveItem}
              />
            ))}
          </div>
        </div>
      )}
      {widthPlywoods && (
        <div className={styles.feature__container}>
          <div className={styles.feature__title}>Толщина листа</div>
          <div className={styles.feature__card__container}>
            {widthPlywoods.map((item: CalcData) => (
              <CardGrid
                key={item.id}
                id={item.id as string}
                title={item.name}
                price={item.price}
                endpoint={4}
                onUpdate={handleUpdateItem}
                onRemove={handleRemoveItem}
              />
            ))}
          </div>
        </div>
      )}
      {types && (
        <div className={styles.feature__container}>
          <div className={styles.feature__title}>Вид фанеры</div>
          <div className={styles.feature__card__container}>
            {types.map((item: CalcData) => (
              <CardGrid
                key={item.id}
                id={item.id as string}
                title={item.name}
                price={item.price}
                endpoint={5}
                onUpdate={handleUpdateItem}
                onRemove={handleRemoveItem}
              />
            ))}
          </div>
        </div>
      )}
      {images && (
        <div className={styles.feature__container}>
          <div className={styles.feature__title}>Фото</div>
          <div className={styles.feature__card__container}>
            {images.map((item: FurniturePhotosModal) => (
              <CardGrid
                key={item.id}
                id={item.id as string}
                title={item.name}
                images={item.photos}
                endpoint={6}
                price={0}
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
