import React, { useState } from 'react'

import SelectField from '@features/Basic/ui/SelectField'
import styles from './index.module.scss'

const PlywoodCalculator = () => {
  const [data, setData] = useState({
    name: '',
    value: 0,
  })

  const handleChange = (target: any) => {
    setData(target)
  }

  return (
    <div
      className={styles.calculator}
      id="calculator"
    >
      <div className={styles.calculator__title}>Калькулятор фанеры</div>
      <div className={styles.calculator__container}>
        <div className={styles.calculator__left}>
          <div className={styles.calculator__select__item}>
            <div className={styles.calculator__select__title}>Сорт <b>*</b></div>
            <SelectField
              name="Сорт"
              onChange={handleChange}
              value={data.value}
              options={[]}
              defaultOption="Выберите Сорт..."
            />
          </div>

          <div className={styles.calculator__select__item}>
            <div className={styles.calculator__select__title}>Вид фанеры <b>*</b></div>
            <SelectField
              name="Сорт"
              onChange={handleChange}
              value={data.value}
              options={[]}
              defaultOption="Выберите Сорт..."
            />
          </div>

          <div className={styles.calculator__select__item}>
            <div className={styles.calculator__select__title}>
              Площадь закрываемой поверхности <b>*</b>
            </div>
            <SelectField
              name="Сорт"
              onChange={handleChange}
              value={data.value}
              options={[]}
              defaultOption="Выберите Сорт..."
            />
          </div>

          <div className={styles.calculator__select__item}>
            <div className={styles.calculator__select__title}>
              Плотность покрытия<br/>(для ламинированной)
            </div>
            <SelectField
              name="Сорт"
              onChange={handleChange}
              value={data.value}
              options={[]}
              defaultOption="Выберите Сорт..."
            />
          </div>
        </div>

        <div className={styles.calculator__right}>
          <div className={styles.calculator__select__item}>
            <div className={styles.calculator__select__title}>
              Формат листа <b>*</b>
            </div>
            <SelectField
              name="Сорт"
              onChange={handleChange}
              value={data.value}
              options={[]}
              defaultOption="Выберите Сорт..."
            />
          </div>

          <div className={styles.calculator__select__item}>
            <div className={styles.calculator__select__title}>
              Тольщина листа <b>*</b>
            </div>
            <SelectField
              name="Сорт"
              onChange={handleChange}
              value={data.value}
              options={[]}
              defaultOption="Выберите Сорт..."
            />
          </div>

          <div className={styles.calculator__select__item}>
            <div className={styles.calculator__select__title}>
              Количество листов
            </div>
            <SelectField
              name="Сорт"
              onChange={handleChange}
              value={data.value}
              options={[]}
              defaultOption="Выберите Сорт..."
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlywoodCalculator
