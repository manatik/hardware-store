import React, { FC, ReactElement } from 'react'
import { PropsInputField } from '@features/Admin/ui/InputField/types'

import cn from 'classnames'
import styles from './index.module.scss'

const InputField: FC<PropsInputField> = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  size,
  label,
  error,
  isDisabled,
  isRequired,
  withRef,
  pattern,
}): ReactElement => {
  return (
    <div className={styles.input__field__wrapper}>
      {label && <label className={styles.input__fieldLabel}>{label}</label>}
      <div
        className={cn(styles.input__field, size, {
          [styles.error]: error,
          [styles.disable]: isDisabled,
        })}
      >
        <input
          className={styles.input__fieldControl}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={isDisabled}
          required={isRequired}
          ref={withRef}
          pattern={pattern}
        />
      </div>
      {error && <div className={styles.input__fieldError}>{error}</div>}
    </div>
  )
}

export default InputField
