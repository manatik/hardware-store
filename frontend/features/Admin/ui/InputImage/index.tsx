import React from 'react'
import ImageUploading from 'react-images-uploading'
import cn from 'classnames'
import styles from './index.module.scss'

const InputImage = ({ value, onChange }: any) => {
  const maxNumber = 4

  return (
  <div className={styles.inputImage}>
    <ImageUploading
      multiple
      value={value}
      onChange={onChange}
      maxNumber={maxNumber}
    >
      {({
        imageList,
        onImageUpload,
        onImageUpdate,
        onImageRemove,
        dragProps,
      }) => (
        <>
          <button
            className={styles.inputImage__label}
            onClick={onImageUpload}
            {...dragProps}
          >
            Добавить фото
          </button>
          <div>
            {imageList.map((image, index) => (
              <div
                key={index}
                className={styles.inputImage__item}
              >
                <img
                  src={image.dataURL}
                  alt=""
                  width="180"
                />
                <div className={styles.inputImage__btns}>
                  <button
                    className={cn(styles.inputImage__btn, styles.inputImage__upload)}
                    onClick={() => onImageUpdate(index)}
                  >
                    Изменить
                  </button>
                  <button
                    className={cn(styles.inputImage__btn, styles.inputImage__remove)}
                    onClick={() => onImageRemove(index)}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </ImageUploading>
  </div>
  )
}

export default InputImage
