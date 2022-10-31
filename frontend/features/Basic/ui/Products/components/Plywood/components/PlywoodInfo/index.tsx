import React from 'react'

import Image from 'next/image'

import info from 'assets/products/plywood/info.webp'

import styles from './index.module.scss'

const PlywoodInfo = () => {
  return (
    <div
      className={styles.info}
      id="plywood"
    >
      <div className={styles.info__left}>
        При&nbsp;изготовлении применяется <b>100% берёзовый шпон</b>, который проходит
        все&nbsp;стадии обработки: от&nbsp;гидротермической
        обработки древесины до&nbsp;шлифовки готового листа.
        <br />
        <br />
        Данная фанера отличается <b>стабильно высоким качеством</b> и&nbsp;соответствует
        всем требованиям российских и&nbsp;зарубежных стандартов.
        <br />
        <br />
        Фанера имеет <b>широкий спектр применения</b> от отделки и производства мебели,
        домов и их комплектующих до сложных технических решений в области транспорта и судостроения.
      </div>
      <div className={styles.info__right}>
        <Image
          src={info}
          quality={100}
          placeholder="blur"
          alt=""
        />
      </div>
    </div>
  )
}

export default PlywoodInfo
