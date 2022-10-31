import React, { FC } from 'react'
import cn from 'classnames'
import styles from './index.module.scss'

interface SelectFieldProps {
  label: string,
  value: string | number,
  onChange: any,
  error?: string,
  options: Array<Option>,
  name: string,
  defaultOption: string
}

interface Option {
  id: number | string,
  name: string
}

const Index: FC<SelectFieldProps> = ({
  label,
  value,
  onChange,
  defaultOption,
  options,
  error,
  name,
}) => {
  const handleChange = ({ target }: any) => {
    onChange({ name: target.name, value: target.value })
  }
  const getInputClasses = () => cn(styles.selectField, {
    [styles.error]: error,
  })

  return (
    <div className={styles.selectField__form}>
      <label
        htmlFor="validationCustom04"
        className={styles.selectField__title}
      >
        {label}
      </label>
      <select
        className={getInputClasses()}
        id="validationCustom04"
        name={name}
        value={value}
        onChange={handleChange}
      >
        <option
          disabled
          value=""
        >
          {defaultOption}
        </option>
        {options
          && options.map((option: any) => (
            <option
              value={option.id}
              key={option.id}
            >
              {option.name}
            </option>
          ))}
      </select>
      {error && <div className={styles.selectFieldError}>{error}</div>}
    </div>
  )
}

export default Index
