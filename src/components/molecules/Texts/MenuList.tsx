import { FC, SetStateAction, Dispatch } from 'react'
import { useRouter } from 'next/dist/client/router'
import { Link } from 'react-scroll'

// import { menu_list } from 'lib/data'
import styles from 'styles/components/molecules/menu_list.module.scss'

type Props = {
  setIsActive: Dispatch<SetStateAction<boolean>>
}

const MenuList: FC<Props> = (props) => {
  const { setIsActive } = props
  const router = useRouter()
  return (
    <div className={styles.menu_list}>
      <ul>
        <Link to={'works'} smooth={'easeInOutQuart'} duration={1600} offset={-100}>
          <li onClick={() => setIsActive(false)}>works</li>
        </Link>
        <Link to={'about'} smooth={'easeInOutQuart'} duration={1600} offset={12}>
          <li onClick={() => setIsActive(false)}>about</li>
        </Link>
        <Link to={'contact'} smooth={'easeInOutQuart'} duration={1600} offset={-100}>
          <li onClick={() => setIsActive(false)}>contact</li>
        </Link>
      </ul>
      <ul>
        <li style={{ ['--indent' as any]: 1 }} onClick={() => router.push('/websites')}>
          websites
        </li>
        <li style={{ ['--indent' as any]: 2 }} onClick={() => router.push('/lps')}>
          lps
        </li>
        <li style={{ ['--indent' as any]: 2 }} onClick={() => router.push('/apps')}>
          apps
        </li>
        <li style={{ ['--indent' as any]: 2 }} onClick={() => router.push('/graphics')}>
          graphics
        </li>
        <li style={{ ['--indent' as any]: 4 }} onClick={() => router.push('/banners')}>
          banners
        </li>
        <li style={{ ['--indent' as any]: 5 }} onClick={() => router.push('/others')}>
          others
        </li>
      </ul>
    </div>
  )
}

export default MenuList
