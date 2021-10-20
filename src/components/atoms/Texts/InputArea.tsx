import { VFC } from 'react'

import styles from 'styles/components/atoms/input_area.module.scss'

type Props = {
  text: string
  redText?: string
  placeholder?: string
  value: string
  type?: string
  required?: boolean
  disabled?: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}
const InputArea: VFC<Props> = (props) => {
  const { value, onChange, text, redText, type = 'text', placeholder = '', disabled = false, required = false } = props
  return (
    <div className={styles.input_area}>
      <label>
        {text}
        <span>{redText}</span>
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
      />
    </div>
  )
}

export default InputArea
