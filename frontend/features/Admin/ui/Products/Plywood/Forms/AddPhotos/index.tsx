import React, { FC } from 'react'
import InputImage from '@features/Admin/ui/InputImage'
import { ImageType } from 'react-images-uploading'

interface AddPhotosProps {
  onChange: (imageList: any, addUpdateIndex: any) => void;
  images: ImageType[];
  onChangeColor?: (target: any) => void;
  color?: string;
}

const AddPhotos: FC<AddPhotosProps> = ({
  onChange,
  images,
  color,
  onChangeColor,
}) => {
  return (
    <>
      <InputImage
        value={images}
        onChange={onChange}
      />
      {color && onChangeColor && (
        <div>
          Цвет:{' '}
          <input
            onChange={(e) => onChangeColor(e.target.value)}
            style={{ marginBottom: '16px', marginTop: '16px' }}
            value={color}
            type="color"
          />
        </div>
      )}
    </>
  )
}

export default AddPhotos
