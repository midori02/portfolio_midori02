import { FC, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/dist/TextPlugin'

const TextAnimation: FC = () => {
  useEffect(() => {
    gsap.registerPlugin(TextPlugin)

    gsap.to(`#animation-text`, {
      duration: 5,
      text: ` My name is midori02, I was born in 1993, in the face of the Internet. 
          \n\
         At the beginning of May in 2021, I started to design websites. I gambled and lost, but I learned a lot from it.
          \n\
          This site to share my experiences, learnings.`,
      ease: 'none',
    })
  }, [])

  return <p id="animation-text"></p>
}

export default TextAnimation
