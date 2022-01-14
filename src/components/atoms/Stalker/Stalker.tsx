import { useState, useRef, useEffect, VFC } from 'react'
import gsap from 'gsap'
import styles from 'styles/components/atoms/stalker.module.scss'

import { useAtom } from 'jotai'
import { cursorActive } from 'contexts/CursorContext'

const Stalker: VFC = () => {
  const [active] = useAtom(cursorActive)
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const [posX, setPosX] = useState(0)
  const [posY, setPosY] = useState(0)

  let cWidth = 8,
    fWidth = 40 //カーソルの大きさ

  const followerRef = useRef(null)
  const cursorRef = useRef(null)

  useEffect(() => {
    window.addEventListener('mousemove', (e) => {
      setMouseX(e.pageX)
      setMouseY(e.pageY)
      setPosX(e.pageX)
      setPosY(e.pageY)
    })
  }, [])

  useEffect(() => {
    gsap
      .timeline()
      .to(cursorRef.current, {
        css: {
          left: mouseX - cWidth / 2,
          top: mouseY - cWidth / 2,
        },
      })
      .to(
        followerRef.current,
        {
          css: {
            left: posX - fWidth / 2,
            top: posY - fWidth / 2,
          },
        },
        '<+=0.04'
      )
  }, [posX, posY, mouseX, mouseY])

  return (
    <>
      <div ref={cursorRef} className={styles.cursor}></div>
      <div ref={followerRef} className={active ? `${styles.follower__active}` : `${styles.follower}`}></div>
    </>
  )
}

export default Stalker
