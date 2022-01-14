import { VFC } from 'react'

import { CommonLink } from 'components/atoms/Texts'
import styles from 'styles/components/atoms/button.module.scss'

type Props = {
  onClick?: () => void
  text: string
  value: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  size: 'sm' | 'md' | 'lg'
}

const Button: VFC<Props> = (props) => {
  const { onClick, text, size, value, type, disabled } = props
  const className = 'button__' + size
  return (
    <CommonLink path={''}>
      <button
        disabled={disabled}
        type={type}
        onClick={onClick}
        value={value}
        className={
          disabled ? `${styles[className]} ${styles.button__disabled}` : `${styles[className]} ${styles.button}`
        }
      >
        {text}
      </button>
    </CommonLink>
  )
}

export default Button
