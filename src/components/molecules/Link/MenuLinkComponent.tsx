import { FC, useState } from 'react'
import { useRouter } from 'next/dist/client/router'

import { TextArea } from 'components/atoms/Texts'
import { MenuList } from '../Texts'
import styles from 'styles/components/molecules/link_component.module.scss'

const MenuLinkComponent: FC = () => {
  const [active, setActive] = useState<boolean>(false)
  const router = useRouter()
  return (
    <div className={styles.link_component__menu}>
      <ul className={styles.link_component__menu_pc}>
        <li onClick={() => router.push('/')}>works</li>
        <li onClick={() => router.push('/')}>about</li>
        <li onClick={() => router.push('/')}>contact</li>
      </ul>
      <div className={styles.link_component__menu_tb}>
        <div
          onClick={() => {
            setActive(!active)
          }}
          className={active ? styles.link_component__menu_tb_bar_active : styles.link_component__menu_tb_bar}
        >
          <span></span>
          <span></span>
          <span></span>
          <div className={active ? styles.link_component__menu_tb_list_active : styles.link_component__menu_tb_list}>
            <MenuList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuLinkComponent
