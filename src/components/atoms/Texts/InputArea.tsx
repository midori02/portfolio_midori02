// import { errorCodes } from '@slack/events-api'
import { VFC } from 'react'

import styles from 'styles/components/atoms/input_area.module.scss'

type Props = {
  text: string
  isRequired?: boolean
  placeholder?: string
  value: string
  multiLine?: boolean
  rows?: number
  isError?: boolean
  errorMessage?: string
  type?: string
  required?: string
  disabled?: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const InputArea: VFC<Props> = (props) => {
  const {
    value,
    onChange,
    text,
    type = 'text',
    placeholder = '',
    disabled = false,
    required = false,
    isError = false,
    errorMessage = '',
    multiLine = false,
    rows = 1,
  } = props
  return (
    <div className={styles.input_area}>
      <label>
        {text}　{required && <span>[必須]</span>}
      </label>
      {multiLine ? (
        <textarea value={value} onChange={onChange} placeholder={placeholder} disabled={disabled} rows={rows}>
          {value}
        </textarea>
      ) : (
        <input type={type} value={value} onChange={onChange} placeholder={placeholder} disabled={disabled} />
      )}

      {isError && <div className={styles.error_message}>{errorMessage}</div>}
    </div>
  )
}

export default InputArea
