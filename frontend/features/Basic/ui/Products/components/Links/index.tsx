import React, { FC, useState } from 'react'
import cn from 'classnames'
import { MockLinksTypes } from '@features/Basic/ui/Products/types'
import { ProductLinks } from '@features/Basic/ui/Products/mockData'

import styles from './index.module.scss'

interface LinksProps {
  links: MockLinksTypes;
  defaultLink: ProductLinks;
}

const Links: FC<LinksProps> = ({ links, defaultLink }) => {
  const [active, setActive] = useState<ProductLinks>(defaultLink)

  const toggleLink = (link: ProductLinks): void => setActive(link)

  return (
    <div className={styles.links}>
      {links && links.map((item) => (
        <a
          key={item.link}
          href={item.link}
          className={cn(styles.links__item, {
            [styles.links__itemActive]: active === item.link,
          })}
          onClick={() => toggleLink(item.link as ProductLinks)}
        >
          {item.title}
        </a>
      ))}
    </div>
  )
}

export default Links
