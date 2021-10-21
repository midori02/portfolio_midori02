import { FC, useState, useEffect } from 'react'

import { IconArea } from 'components/atoms/Images'
import { InputArea } from 'components/atoms/Texts'
import { TextBox } from 'components/atoms/Texts'
import { Button } from 'components/atoms/Buttons'
import { useStringChangeEvent } from 'lib/customHooks'
import { handleSubmit } from 'lib/slack'
import styles from 'styles/components/molecules/contact_form.module.scss'

const ContactForm: FC = () => {
  const [sent, setSent] = useState<boolean>(false)
  const [name, setName] = useState('')
  const [furigana, setFurigana] = useState('')
  const [email, setEmail] = useState('')
  const [telephone, setTelephone] = useState('')
  const [textbox, setTextbox] = useState('')
  const [nameErrors, setNameErrors] = useState('')
  const [furiganaErrors, setFuriganaErrors] = useState('')
  const [emailErrors, setEmailErrors] = useState('')
  const [telephoneErrors, setTelephoneErrors] = useState('')
  const [textboxErrors, setTextboxErrors] = useState('')

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
      setNameErrors('※ お名前を入力してください。')
      setSent(false)
      return
    }
    if (!furigana) {
      setFuriganaErrors('※ フリガナを入力してください。')
      setSent(false)
      return
    } else {
      const regex = /^[ア-ン゛゜ァ-ォャ-ョー]+$/
      if (!regex.test(furigana)) {
        setFuriganaErrors('※ 正しい形式でフリガナを入力してください。')
        setSent(false)
        return
      }
    }
    if (!email) {
      setEmailErrors('メールアドレスを入力してください')
      setSent(false)
      return
    } else {
      const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      if (!regex.test(email)) {
        setEmailErrors('※正しい形式でメールアドレスを入力してください')
        setSent(false)
        return
      }
    }
    if (telephone) {
      const regex =
        /\A(((0(\d{1}[-(]?\d{4}|\d{2}[-(]?\d{3}|\d{3}[-(]?\d{2}|\d{4}[-(]?\d{1}|[5789]0[-(]?\d{4})[-)]?)|\d{1,4}\-?)\d{4}|0120[-(]?\d{3}[-)]?\d{3})\z/
      if (!regex.test(telephone)) {
        setTelephoneErrors('※正しい形式で電話番号を入力してください')
        setSent(false)
        return
      }
    }
    if (!textbox) {
      setTextboxErrors('※ 内容を入力してください。')
      setSent(false)
      return
    }

    handleSubmit(content)
      .then(() => {
        setNameErrors('')
        setFuriganaErrors('')
        setEmailErrors('')
        setTelephoneErrors('')
        setTextboxErrors('')
        setSent(true)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <form
      className={styles.contact_form}
      onSubmit={(e) => {
        handleClick(e, { name: name, furigana: furigana, email: email, telephone: telephone, textbox: textbox })
      }}
    >
      <IconArea path={'title-contact.svg'} width={320} height={56} />
      <InputArea value={name} text={'お名前'} redText={'※ 必須'} onChange={useStringChangeEvent(setName)} />
      {nameErrors && <div className={styles.error_message}>{nameErrors}</div>} <br />
      <InputArea value={furigana} text={'フリガナ'} redText={'※ 必須'} onChange={useStringChangeEvent(setFurigana)} />
      {furiganaErrors && <div className={styles.error_message}>{furiganaErrors}</div>}
      <br />
      <InputArea value={email} text={'メールアドレス'} redText={'※ 必須'} onChange={useStringChangeEvent(setEmail)} />
      {emailErrors && <div className={styles.error_message}>{emailErrors}</div>}
      <br />
      <InputArea value={telephone} text={'お電話番号'} onChange={useStringChangeEvent(setTelephone)} />
      {telephoneErrors && <div className={styles.error_message}>{telephoneErrors}</div>}
      <br />
      <TextBox
        value={textbox}
        text={'お問い合わせ内容'}
        redText={'※ 必須'}
        onChange={useStringChangeEvent(setTextbox)}
      />
      {textboxErrors && <div className={styles.error_message}>{textboxErrors}</div>}
      <Button type={'submit'} text={'送信'} size={'sm'} value={'submit'} disabled={sent === true} />
      {sent && <p className={styles.contact_form__after_sent}>送信されました !</p>}
    </form>
  )
}

export default ContactForm
