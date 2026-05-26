import { FC, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/dist/TextPlugin'

const TextAnimation: FC = () => {
  useEffect(() => {
    gsap.registerPlugin(TextPlugin)

    gsap.to(`#animation-text`, {
      duration: 5,
      text: ` My name is midori02, I studied art and design in France, then worked in design at an architectural office in Fukuoka.
         \n\
         Now working as a PM/PdM, bridging design, product, and user experience.`,
      ease: 'none',
    })
  }, [])

  return <p id="animation-text"></p>
}

export default TextAnimation
