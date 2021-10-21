// import { errorCodes } from '@slack/events-api'
import { VFC } from 'react'

import styles from 'styles/components/atoms/input_area.module.scss'

type Props = {
  text: string
  redText?: string
  placeholder?: string
  value: string
  type?: string
  required?: string
  disabled?: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const InputArea: VFC<Props> = (props) => {
  const { value, onChange, text, redText, type = 'text', placeholder = '', disabled = false } = props
  return (
    <div className={styles.input_area}>
      <label>
        {text}
        <span>{redText}</span>
        <input type={type} value={value} onChange={onChange} placeholder={placeholder} disabled={disabled} />
      </label>
    </div>
  )
}

export default InputArea
