import { VFC } from 'react'
import styles from 'styles/components/atoms/button.module.scss'

type Props = {
  onClick: () => void
  text: string
  size: 'sm' | 'md' | 'lg'
}

const Button: VFC<Props> = (props) => {
  const { onClick, text, size } = props
  const className = 'button__' + size
  return (
    <button onClick={onClick} className={`${styles[className]} ${styles.button__rectangle}`}>
      {text}
    </button>
  )
}

export default Button
