import { VFC, useEffect } from 'react'

import styles from 'styles/components/atoms/metaballs.module.scss'

const Metaballs: VFC = () => {
  //   useEffect(() => {
  //     let element = document.getElementById('ball')
  //     for (let i = 1; i < 8; i++) {
  //       //add div tag
  //       const new_element_bulbb = document.createElement('div')
  //       const div_element = document.getElementById('sparkle_0')
  //       new_element_bulbb.className = 'blubb_' + i
  //       element.insertBefore(new_element_bulbb, div_element)
  //     }
  //     for (let i = 1; i < 10; i++) {
  //       //add div tag
  //       const new_element_sparkle = document.createElement('div')
  //       new_element_sparkle.className = 'sparkle_' + i
  //       element.appendChild(new_element_sparkle)
  //     }
  //   })

  return (
    <div className={styles.frame}>
      {/* <div id="center">
        <div id="ball">
          <div className={styles.blubb}></div>
          <div id="sparkle_0" className={styles.sparkle}></div>
        </div>
      </div> */}
    </div>
  )
}

export default Metaballs
