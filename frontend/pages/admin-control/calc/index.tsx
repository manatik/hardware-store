import React, { useState } from 'react'
import { NextPage } from 'next'
import AdminLayout from '@features/Admin/common/Admin-Layout'
import ContainerProduct from '@features/Admin/common/ContainerProduct'
import { wrapper } from '@store/store'
import { ProjectPage, useServerSideProps } from '@hooks'

import SelectField from '@features/Admin/ui/SelectField'
import CoatingDensity from '@features/Admin/ui/Calc/CoatingDensity'
import Formats from '@features/Admin/ui/Calc/Formats'
import Sort from '@features/Admin/ui/Calc/Sort'
import WidthPlywood from '@features/Admin/ui/Calc/WidthPlywood'
import Type from '@features/Admin/ui/Calc/Type'
import Photos from '@features/Admin/ui/Calc/Photos'

import { features } from '@features/Admin/ui/Calc/mockData'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import {
  getCoatingDensity,
  getFormats, getPhotos,
  getSorts,
  getTypes,
  getWidthPlywood,
} from '@store/calc/selector'
import CardGrid from '@features/Admin/ui/CardGrid'
import { CalcData } from '@models/Calc'
import { toast } from 'react-toastify'
import { fetchCalcRemoveParamsAsync, fetchCalcUpdateParamsAsync } from '@store/calc/calcSlice'
import { PhotosModal } from '@models/Products'
import styles from './index.module.scss'

const Calc: NextPage = () => {
  const formats = useAppSelector(getFormats)
  const sorts = useAppSelector(getSorts)
  const types = useAppSelector(getTypes)
  const widthPlywoods = useAppSelector(getWidthPlywood)
  const coatingDensity = useAppSelector(getCoatingDensity)
  const images = useAppSelector(getPhotos)

  const dispatch = useAppDispatch()

  const [data, setData] = useState({
    name: '',
    value: 1,
  })

  const handleRemoveItem = async (id: number, endpoint: number) => {
    try {
      dispatch(fetchCalcRemoveParamsAsync({ id, endpoint }))
      toast.success('Успешно удалено')
    } catch (e) {
      toast.error('Ошибка сервера')
    }
  }

  const handleUpdateItem = async (id: number, endpoint: number, data: CalcData) => {
    try {
      dispatch(fetchCalcUpdateParamsAsync({ id, endpoint, values: data }))
      toast.success('Успешно обновлено')
    } catch (e) {
      toast.error('Ошибка сервера')
    }
  }

  const handleChange = (target: any) => {
    setData(target)
  }
  return (
    <AdminLayout>
      <ContainerProduct
        title="Калькулятор"
        buttonName="Добавить характеристику"
        form={
          <>
            <SelectField
              name="Характеристики"
              onChange={handleChange}
              value={data.value}
              label="Характеристики"
              options={features}
              defaultOption="Выберите характеристику..."
            />

            {Number(data.value) === 1 && <CoatingDensity />}
            {Number(data.value) === 2 && <Formats />}
            {Number(data.value) === 3 && <Sort />}
            {Number(data.value) === 4 && <WidthPlywood />}
            {Number(data.value) === 5 && <Type />}
            {Number(data.value) === 6 && <Photos />}
          </>
        }
      />
      <div className={styles.feature}>
        {coatingDensity && (
          <div className={styles.feature__container}>
            <div className={styles.feature__title}>Плотность покрытия</div>
            <div className={styles.feature__card__container}>
              {coatingDensity.map((item: CalcData) => (
                <CardGrid
                  key={item.id}
                  id={item.id as number}
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
                  id={item.id as number}
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
                  id={item.id as number}
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
                  id={item.id as number}
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
                  id={item.id as number}
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
            {images.map((item: PhotosModal) => (
              <CardGrid
                key={item.id}
                id={item.id as number}
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
    </AdminLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => useServerSideProps(ProjectPage.Calc, context, store),
)

export default Calc
