import { FC } from 'react'
import { useRouter } from 'next/dist/client/router'

import { TextArea } from 'components/atoms/Texts'
import { menu_list } from 'lib/data'
import styles from 'styles/components/molecules/menu_list.module.scss'

const MenuList: FC = () => {
  const router = useRouter()
  return (
    <div className={styles.menu_list}>
      <ul>
        <li onClick={() => router.push('/')}>works</li>
        <li onClick={() => router.push('/')}>about</li>
        <li onClick={() => router.push('/')}>contact</li>
      </ul>

      <ul>
        {menu_list.map((item) => (
          <li key={item.urlPath}>{item.list}</li>
        ))}
      </ul>
    </div>
  )
}

export default MenuList
