import { VFC } from 'react'

import styles from 'styles/components/atoms/input_area.module.scss'

type Props = {
  text: string
  redText?: string
}
const TextBox: VFC<Props> = (props) => {
  const { text, redText } = props
  return (
    <div className={styles.input_area}>
      <p>
        {text}
        <span>{redText}</span>
      </p>
      <textarea></textarea>
    </div>
  )
}

export default TextBox
