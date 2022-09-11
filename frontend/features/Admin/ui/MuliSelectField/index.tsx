import React from 'react'
import Select from 'react-select'

import styles from './index.module.scss'

const MultiSelectField = ({
  options, onChange, name, label, defaultValue,
}: any) => {
  const optionsArray = !Array.isArray(options) && typeof options === 'object'
    ? Object.keys(options).map((optionName) => ({
      label: options[optionName].name,
      value: options[optionName]._id,
    }))
    : options

  return (
    <div className={styles.multiSelect}>
      <label className="form-label">{label}</label>
      <Select
        isMulti
        closeMenuOnSelect={false}
        defaultValue={defaultValue}
        options={optionsArray}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={onChange}
        name={name}
      />
    </div>
  )
}

export default MultiSelectField
