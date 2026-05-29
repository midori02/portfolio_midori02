import { FC, useEffect, useRef } from 'react'

import { gsap } from 'gsap'

import styles from 'styles/components/atoms/frame.module.scss'

type Props = {
  onComplete?: () => void
}

const Metaballs: FC<Props> = ({ onComplete }) => {
  const frameRef = useRef<HTMLDivElement>(null)
  const finishedRef = useRef(false)

  useEffect(() => {
    const finish = () => {
      if (finishedRef.current) return
      finishedRef.current = true
      onComplete?.()
    }

    const fallbackTimer = window.setTimeout(finish, 6000)

    if (!frameRef.current) {
      finish()
      return () => window.clearTimeout(fallbackTimer)
    }

    try {
      gsap.to(frameRef.current, {
        opacity: 0,
        duration: 1,
        delay: 5,
        onComplete: finish,
      })
    } catch {
      finish()
    }

    return () => window.clearTimeout(fallbackTimer)
  }, [onComplete])

  return (
    <div ref={frameRef} className={styles.frame}>
      <div className={styles.frame__center}>
        <div className={styles.frame__center_ball}></div>
        <div className={styles.frame__center_blubb_1}></div>
        <div className={styles.frame__center_blubb_2}></div>
        <div className={styles.frame__center_blubb_3}></div>
        <div className={styles.frame__center_blubb_4}></div>
        <div className={styles.frame__center_blubb_5}></div>
        <div className={styles.frame__center_blubb_6}></div>
        <div className={styles.frame__center_blubb_7}></div>
        <div className={styles.frame__center_blubb_8}></div>
        <div className={styles.frame__center_blubb_9}></div>
        <div className={styles.frame__center_blubb_10}></div>
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
