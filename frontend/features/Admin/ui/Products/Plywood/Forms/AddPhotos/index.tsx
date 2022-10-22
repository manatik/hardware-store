import React, { FC } from 'react'
import InputImage from '@features/Admin/ui/InputImage'
import cn from 'classnames'
import { ImageType } from 'react-images-uploading'

interface AddPhotosProps {
  onChange: (imageList: any, addUpdateIndex: any) => void;
  onClick: (id: number) => void;
  images: ImageType[];
  id: number,
}
const AddPhotos: FC<AddPhotosProps> = ({
  onChange,
  onClick,
  images,
  id,
}) => {
  return (
    <>
      <InputImage
        value={images}
        onChange={onChange}
      />
      {images.length !== 0 && (
        <button
          className={cn('button', 'buttonEdit')}
          onClick={() => onClick(id)}
        >
          Сохранить
        </button>
      )}
    </>
  )
}

export default AddPhotos
