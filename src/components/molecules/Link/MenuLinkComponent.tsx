import { FC, useState } from 'react'

import { TextArea } from 'components/atoms/Texts'
import { MenuList } from '../Texts'
import styles from 'styles/components/molecules/link_component.module.scss'

const MenuLinkComponent: FC = () => {
  const [active, setActive] = useState<boolean>(false)
  return (
    <div className={styles.link_component__menu}>
      <div className={styles.link_component__menu_pc}>
        <TextArea text={'works'} />
        <TextArea text={'about'} />
        <TextArea text={'contact'} />
      </div>
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
