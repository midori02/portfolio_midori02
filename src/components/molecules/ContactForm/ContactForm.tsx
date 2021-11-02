import { FC, useState, useEffect } from 'react'

import { IconArea } from 'components/atoms/Images'
import { InputArea } from 'components/atoms/Texts'
import { Button } from 'components/atoms/Buttons'
import { useStringChangeEvent } from 'lib/customHooks'
import { handleSubmit } from 'lib/slack'
import { isValidEmail, isValidFurigana, isValidTelephone } from 'lib/validation'
import styles from 'styles/components/molecules/contact_form.module.scss'

const ContactForm: FC = () => {
  const [sent, setSent] = useState<boolean>(false)
  const [name, setName] = useState('')
  const [furigana, setFurigana] = useState('')
  const [email, setEmail] = useState('')
  const [telephone, setTelephone] = useState('')
  const [textbox, setTextbox] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (sent) {
      setName('')
      setFurigana('')
      setEmail('')
      setTelephone('')
      setTextbox('')
    }
  }, [sent])

  const handleClick = (e, content) => {
    e.preventDefault()

    if (!name) {
      setError('name')
      return false
    }
    if (!furigana) {
      setError('furigana')
      return false
    } else if (!isValidFurigana(furigana)) {
      setError('furiganaValidation')
      return false
    }

    if (!email) {
      setError('email')
      return false
    } else if (!isValidEmail(email)) {
      setError('emailValidation')
      return false
    }
    if (telephone) {
      if (!isValidTelephone(telephone)) {
        setError('telephoneValidation')
        return false
      }
    }
    if (!textbox) {
      setError('textbox')
      return false
    }

    handleSubmit(content)
      .then(() => {
        setError('')
        setSent(true)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <form
      id={'contact'}
      className={styles.contact_form}
      onSubmit={(e) => {
        handleClick(e, { name: name, furigana: furigana, email: email, telephone: telephone, textbox: textbox })
      }}
    >
      <IconArea path={'title-contact.svg'} width={320} height={56} />
      <InputArea
        value={name}
        isRequired
        text={'お名前'}
        onChange={useStringChangeEvent(setName)}
        isError={error === 'name' ? true : false}
        errorMessage={'※ お名前を入力してください。'}
      />
      <br />
      <InputArea
        value={furigana}
        isRequired
        text={'フリガナ'}
        onChange={useStringChangeEvent(setFurigana)}
        isError={error === 'furigana' || error === 'furiganaValidation' ? true : false}
        errorMessage={
          error === 'furigana' ? '※ フリガナを入力してください。' : '※ 正しい形式でフリガナを入力してください。'
        }
      />
      <br />
      <InputArea
        value={email}
        isRequired
        text={'メールアドレス'}
        onChange={useStringChangeEvent(setEmail)}
        isError={error === 'email' || error === 'emailValidation' ? true : false}
        errorMessage={
          error === 'email' ? '※ メールアドレスを入力してください' : '※正しい形式でメールアドレスを入力してください'
        }
      />
      <br />
      <InputArea
        value={telephone}
        text={'お電話番号'}
        onChange={useStringChangeEvent(setTelephone)}
        isError={error === 'telephoneValidation' ? true : false}
        errorMessage={'※正しい形式で電話番号を入力してください'}
      />
      <br />
      <InputArea
        value={textbox}
        text={'お問い合わせ内容'}
        multiLine
        rows={10}
        isRequired
        onChange={useStringChangeEvent(setTextbox)}
        isError={error === 'textbox' ? true : false}
        errorMessage={'※ 内容を入力してください。'}
      />
      <br />
      <Button type={'submit'} text={'送信'} size={'sm'} value={'submit'} disabled={sent === true} />
      {sent && <p className={styles.contact_form__after_sent}>送信されました !</p>}
    </form>
  )
}

export default ContactForm
