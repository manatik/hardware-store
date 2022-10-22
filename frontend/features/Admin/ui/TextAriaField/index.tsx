import React, { FC, ReactElement } from 'react'
import { TextAria } from '@features/Admin/ui/TextAriaField/types'

import cn from 'classnames'
import styles from './index.module.scss'

const TextAriaField: FC<TextAria> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
}): ReactElement => {
  return (
    <div className={styles.textAria}>
      {label
        && <label
          className={styles.textAria__label}
          htmlFor={name}
           >{label}</label>
      }
      <div>
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={cn(styles.textAria__input, {
            [styles.error]: error,
          })}
        />
      </div>
      {error && <div className={styles.textAriaError}>{error}</div>}
    </div>
  )
}

export default TextAriaField
