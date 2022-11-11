import React, { useEffect, useState } from 'react'

import SelectField from '@features/Basic/ui/SelectField'
import { useAppSelector } from '@store/hooks'
import { getFormats, getWidthPlywood } from '@store/calc/selector'
import InputField from '@features/Basic/ui/InputField'
import { InputType } from '@features/Admin/ui/InputField/types'
import styles from './index.module.scss'

const PlywoodCalculator = () => {
  const formats = useAppSelector(getFormats)
  // const sorts = useAppSelector(getSorts)
  // const types = useAppSelector(getTypes)
  const widthPlywoods = useAppSelector(getWidthPlywood)
  // const coatingDensity = useAppSelector(getCoatingDensity)
  const initData = {
    // sorts,
    // types,
    // coatingDensity,
    formats,
    widthPlywoods,
  }
  const [data, setData] = useState({
    // sorts: sorts[0],
    // types: types[0],
    // coatingDensity: coatingDensity[0],
    formats: formats ? formats[0] : null,
    widthPlywoods: widthPlywoods ? widthPlywoods[0] : null,
    count: '',
    square: '',
  })
  const [volume, setValume] = useState<number>(0)
  const [mass, setMass] = useState<number>(0)

  const handleChange = (target: { name: string, value: string }) => {
    // @ts-ignore
    const result = Array.from(initData[target.name]).filter((item) => {
      // @ts-ignore
      return item.id === target.value
    })
    setData((prevState) => ({
      ...prevState,
      [target.name]: result[0],
    }))
  }

  const handleChangeInput = ({ target }: any) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: Number(target.value),
    }))
  }

  const results = () => {
    if (data.count && data.formats && data.widthPlywoods) {
      const width = Number(data.formats.name.split('x')[0]) / 1000
      const height = Number(data.formats.name.split('x')[1]) / 1000
      const depth = Number(data.widthPlywoods.name) / 1000

      const resultVolume = width * height * depth * Number(data.count)

      setValume(resultVolume)
      setMass(resultVolume * 750)
    } else {
      setValume(0)
      setMass(0)
    }
  }

  const returnCount = (count: number): string => {
    if (count >= 5 || count === 0) return ' штук'
    if (count === 1) return ' штука'
    if (count > 1 || count < 5) return ' штуки'

    return ''
  }

  useEffect(() => {
    results()
  }, [data])

  return (
    <div
      className={styles.calculator}
      id="calculator"
    >
      <div className={styles.calculator__title}>Калькулятор фанеры</div>
      <div className={styles.calculator__container}>
        <div className={styles.calculator__left}>
          {/* <div className={styles.calculator__select__item}> */}
          {/*  <div className={styles.calculator__select__title}>Сорт <b>*</b></div> */}
          {/*  <SelectField */}
          {/*    name="sorts" */}
          {/*    onChange={handleChange} */}
          {/*    value={data.sorts.id} */}
          {/*    options={sorts} */}
          {/*    defaultOption="Выберите Сорт..." */}
          {/*  /> */}
          {/* </div> */}

          {/* <div className={styles.calculator__select__item}> */}
          {/*  <div className={styles.calculator__select__title}>Вид фанеры <b>*</b></div> */}
          {/*  <SelectField */}
          {/*    name="types" */}
          {/*    onChange={handleChange} */}
          {/*    value={data.types.id} */}
          {/*    options={types} */}
          {/*    defaultOption="Выберите Вид фанеры..." */}
          {/*  /> */}
          {/* </div> */}

          {/* <div className={styles.calculator__select__item}> */}
          {/*  <div className={styles.calculator__select__title}> */}
          {/*    Площадь закрываемой поверхности <b>*</b> */}
          {/*  </div> */}
          {/*  <InputField */}
          {/*    type={InputType.Number} */}
          {/*    name="square" */}
          {/*    value={data.square} */}
          {/*    placeholder="100 м2" */}
          {/*    size='md' */}
          {/*    onChange={handleChangeInput} */}
          {/*  /> */}
          {/* </div> */}

          {/* <div className={styles.calculator__select__item}> */}
          {/*  <div className={styles.calculator__select__title}> */}
          {/*    Плотность покрытия<br />(для ламинированной) */}
          {/*  </div> */}
          {/*  <SelectField */}
          {/*    name="coatingDensity" */}
          {/*    onChange={handleChange} */}
          {/*    value={data.coatingDensity.id} */}
          {/*    options={coatingDensity} */}
          {/*    defaultOption="Выберите Плотность покрытия..." */}
          {/*  /> */}
          {/* </div> */}
          <div className={styles.calculator__select__item}>
            <div className={styles.calculator__select__title}>
              Формат листа <b>*</b>
            </div>
            <SelectField
              name="formats"
              onChange={handleChange}
              value={data.formats?.id || ''}
              options={formats}
              defaultOption="Выберите Формат листа..."
            />
          </div>

          <div className={styles.calculator__select__item}>
            <div className={styles.calculator__select__title}>
              Толщина листа <b>*</b>
            </div>
            <SelectField
              name="widthPlywoods"
              onChange={handleChange}
              value={data.widthPlywoods?.id || ''}
              options={widthPlywoods}
              defaultOption="Выберите Толщину листа..."
            />
          </div>
        </div>

        <div className={styles.calculator__right}>
          <div className={styles.calculator__select__item}>
            <div className={styles.calculator__select__title}>
              Количество листов <b>*</b>
            </div>
            <InputField
              type={InputType.Number}
              name="count"
              value={data.count}
              placeholder="5"
              size='md'
              onChange={handleChangeInput}
            />
          </div>

          <div className={styles.calculator__result}>
            <div className={styles.calculator__result__left}>
              <div className={styles.calculator__result__item}>
                Кол-во листов: <b>{Number(data.count)}</b>
                {returnCount(Number(data.count))}
              </div>
            </div>
            <div className={styles.calculator__result__right}>
              <div className={styles.calculator__result__item}>
                Общий объём: <b>{Number(volume).toFixed(1)}</b> м3
              </div>
              <div className={styles.calculator__result__item}>
                Общая масса: <b>{Number(mass).toFixed(1)}</b> кг
              </div>
              {/* <div className={styles.calculator__result__item}> */}
              {/*  Стоимость: <b>15000</b> руб */}
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlywoodCalculator
