import { FC, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/dist/TextPlugin'

const TextAnimation: FC = () => {
  useEffect(() => {
    gsap.registerPlugin(TextPlugin)

    gsap.to(`#animation-text`, {
      duration: 5,
      text: ` Lorem ipsum dolor,sit amet consectetur adipisicing elit.
         \n
      Perferendis deserunt quas placeat asperioresculpa officiis,
        \n
      iusto officia veniam vitae quae maxime distinctio nobis.
        \n
      Quidem neque eius corrupti
        \n
      pariatur temporibus similique.`,
      ease: 'none',
    })
  }, [])

  return <p id="animation-text"></p>
}

export default TextAnimation
