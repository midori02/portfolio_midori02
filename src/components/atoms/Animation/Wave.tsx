import { VFC } from 'react'
import styles from 'styles/components/atoms/wave_animation.module.scss'

const Wave: VFC = () => {
  return (
    <div className={styles.wave_animation}>
      <svg width={80} height={60} viewBox="5 0 80 60">
        <path
          className={styles.wave_animation__line}
          fill="none"
          stroke="#000"
          stroke-width="4"
          stroke-linecap="round"
          d="M 0 37.5 c 7.684299348848887 0 7.172012725592294 -15 15 -15 s 7.172012725592294 15 15 15 s 7.172012725592294 -15 15 -15 s 7.172012725592294 15 15 15 s 7.172012725592294 -15 15 -15 s 7.172012725592294 15 15 15 s 7.172012725592294 -15 15 -15 s 7.172012725592294 15 15 15 s 7.172012725592294 -15 15 -15 s 7.172012725592294 15 15 15 s 7.172012725592294 -15 15 -15 s 7.172012725592294 15 15 15 s 7.172012725592294 -15 15 -15 s 7.172012725592294 15 15 15 s 7.172012725592294 -15 15 -15"
        />
      </svg>
    </div>
  )
}

export default Wave
