import { FC, useState } from 'react'
import { useRouter } from 'next/router'
import { Link } from 'react-scroll'

import { useAtom } from 'jotai'
import { cursorActive } from 'contexts/CursorContext'

import { MenuList } from '../Texts'
import styles from 'styles/components/molecules/link_component.module.scss'

const MenuLinkComponent: FC = () => {
  const [active, setActive] = useState<boolean>(false)
  const [_, setCursorHover] = useAtom(cursorActive)

  const router = useRouter()
  return (
    <div className={styles.link_component__menu}>
      <ul className={styles.link_component__menu_pc}>
        <Link
          onMouseEnter={() => setCursorHover(true)}
          onMouseLeave={() => setCursorHover(false)}
          to={'works'}
          smooth={'easeInOutQuart'}
          duration={1600}
          offset={-100}
        >
          <li id="link">works</li>
        </Link>
        <Link
          onMouseEnter={() => setCursorHover(true)}
          onMouseLeave={() => setCursorHover(false)}
          to={'about'}
          smooth={'easeInOutQuart'}
          duration={1600}
          offset={12}
        >
          <li id="link">about</li>
        </Link>
        <Link
          onMouseEnter={() => setCursorHover(true)}
          onMouseLeave={() => setCursorHover(false)}
          to={'contact'}
          smooth={'easeInOutQuart'}
          duration={1600}
          offset={-100}
        >
          <li id="link">contact</li>
        </Link>
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
            <MenuList setIsActive={setActive} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuLinkComponent
