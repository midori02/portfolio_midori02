import { FC } from 'react'

import styles from 'styles/components/atoms/spacer.module.scss'

type SpacerProps = {
  size: 'sm_h' | 'md_h' | 'lg_h'
}
const Spacer: FC<SpacerProps> = ({ size }) => {
  const spacerClass = 'spacer-' + size
  return <div className={styles[spacerClass]} />
}

export default Spacer
