import { VFC } from 'react'

import Stalker from './Stalker'
import styles from 'styles/components/layout/layout.module.scss'

const StalkerPc: VFC = () => (
  <div className={styles.stalker_pc}>
    <Stalker />
  </div>
)

export default StalkerPc
