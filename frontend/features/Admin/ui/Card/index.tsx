import React, {
  FC, ReactElement, useEffect, useRef, useState,
} from 'react'
import Image from 'next/image'
import cn from 'classnames'
import { slideToggle } from '@utils/slideToogle'
import { CardProps } from '@features/Admin/ui/Card/types'
import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Photo } from '@models/Products'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import styles from './index.module.scss'

const MySwal = withReactContent(Swal)

const Card: FC<CardProps> = ({
  id,
  images,
  title,
  description,
  form,
  formPhoto,
  remove,
  edit = true,
  buttonName = 'Редактировать',
}): ReactElement => {
  const hiddenElemForm = useRef<HTMLDivElement | null>(null)
  const hiddenElemPhoto = useRef<HTMLDivElement | null>(null)
  const [photos, setPhotos] = useState<[Photo]>()

  const toggle = () => {
    slideToggle(hiddenElemForm.current)
  }

  const handleRemove = async (id: string) => {
    const { isConfirmed } = await MySwal.fire({
      title: 'Вы уверены?',
      text: 'Вы действительно хотите удалить?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e23535',
      cancelButtonColor: '#24822C',
      confirmButtonText: 'Да, удалить!',
      cancelButtonText: 'Отмена',
    })

    if (isConfirmed) {
      remove?.(id)
    }
  }

  useEffect(() => {
    // @ts-ignore
    setPhotos(images?.reduce((acc, img) => [...acc, ...img.photos], []))
  }, [images])

  const toggleFormPhoto = () => {
    slideToggle(hiddenElemPhoto.current)
  }
  return (
    <div className={styles.card}>
      <div className={styles.card__inner}>
        <div className={styles.card__left}>
          {images && (
            <div className={styles.card__image}>
            <Swiper
              spaceBetween={0}
              slidesPerView={1}
              pagination={true}
              modules={[Pagination]}
            >
              {photos?.map((item) => (
                <SwiperSlide key={item.filename}>
                  <Image
                    src={item.path}
                    alt={item.filename}
                    height={120}
                    width={120}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          )}
          <div className={styles.card__left__info}>
            {title && <div className={styles.card__title}>{title}</div>}
            {description && <div className={styles.card__description}>{description}</div>}
          </div>
        </div>
        {(edit || remove) && <div className={styles.card__right}>
          {formPhoto && (
            <div
              className={cn(
                styles.card__button,
                styles.card__buttonEdit,
              )}
              onClick={toggleFormPhoto}
            >
              Добавить фото
            </div>
          )}
          {edit && form && (
            <div
              className={cn(
                styles.card__button,
                styles.card__buttonEdit,
              )}
              onClick={toggle}
            >
              {buttonName}
            </div>
          )}
          {remove && (
            <div
              className={cn(
                styles.card__button,
                styles.card__buttonRemove,
              )}
              onClick={() => handleRemove(id as string)}
            >
              Удалить
            </div>
          )}
        </div>}
      </div>

      {form && (
        <div
          className={styles.card__hidden}
          ref={hiddenElemForm}
        >
          <div className={styles.card__edit}>
            {form}
          </div>
        </div>
      )}
    </div>
  )
}

export default Card
