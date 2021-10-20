import { VFC } from 'react'
import styles from 'styles/components/atoms/button.module.scss'

type Props = {
  onClick?: () => void
  text: string
  value: string
  type?: 'button' | 'submit' | 'reset'
  size: 'sm' | 'md' | 'lg'
}

const Button: VFC<Props> = (props) => {
  const { onClick, text, size, value, type } = props
  const className = 'button__' + size
  return (
    <button type={type} onClick={onClick} value={value} className={`${styles[className]} ${styles.button__rectangle}`}>
      {text}
    </button>
  )
}

export default Button
