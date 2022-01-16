import { FC, useEffect, useRef } from 'react'

import { gsap } from 'gsap'

import styles from 'styles/components/atoms/frame.module.scss'
import { Button } from '../Buttons'

const Metaballs: FC = () => {
  const frameRef = useRef()
  useEffect(() => {
    gsap.to(frameRef.current, {
      opacity: 0,
      duration: 1,
      delay: 5,
    })
  }, [frameRef])

  return (
    <div ref={frameRef} className={styles.frame}>
      <div className={styles.frame__center}>
        <div className={styles.frame__center_ball}></div>
        <div className={styles.frame__center_bulbb_1}></div>
        <div className={styles.frame__center_bulbb_2}></div>
        <div className={styles.frame__center_bulbb_3}></div>
        <div className={styles.frame__center_bulbb_4}></div>
        <div className={styles.frame__center_bulbb_5}></div>
        <div className={styles.frame__center_bulbb_6}></div>
        <div className={styles.frame__center_bulbb_7}></div>
        <div className={styles.frame__center_bulbb_8}></div>
        <div className={styles.frame__center_bulbb_9}></div>
        <div className={styles.frame__center_bulbb_10}></div>
        <div className={styles.frame__center_sparkle_1}></div>
        <div className={styles.frame__center_sparkle_2}></div>
        <div className={styles.frame__center_sparkle_3}></div>
        <div className={styles.frame__center_sparkle_4}></div>
        <div className={styles.frame__center_sparkle_5}></div>
        <div className={styles.frame__center_sparkle_6}></div>
        <div className={styles.frame__center_sparkle_7}></div>
        <div className={styles.frame__center_sparkle_8}></div>
        <div className={styles.frame__center_sparkle_9}></div>
        <div className={styles.frame__center_sparkle_10}></div>
      </div>
    </div>
  )
}

export default Metaballs
