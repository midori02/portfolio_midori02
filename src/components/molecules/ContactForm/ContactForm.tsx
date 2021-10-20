import { FC, useState, useEffect } from 'react'
import { NextPage } from 'next'

import { IconArea } from 'components/atoms/Images'
import { InputArea } from 'components/atoms/Texts'
import { TextBox } from 'components/atoms/Texts'
import { Button } from 'components/atoms/Buttons'
import { useStringChangeEvent } from 'lib/customHooks'
import styles from 'styles/components/molecules/contact_form.module.scss'

type Props = {
  // comment: string
  // handleChange: (e: SyntheticEvent) => void
  sent: boolean // slackに送ったかどうか
  handleSubmit: (e: any, content: any) => void
}

const ContactForm: React.FC<Props> = (props) => {
  const { sent, handleSubmit } = props

  const [name, setName] = useState('')
  const [furigana, setFurigana] = useState('')
  const [email, setEmail] = useState('')
  const [telephone, setTelephone] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    if (sent) {
      setName('')
      setFurigana('')
      setEmail('')
      setTelephone('')
      setContent('')
    }
  }, [sent])

  return (
    <form
      className={styles.contact_form}
      onSubmit={(e) => {
        console.log('submitted')
        handleSubmit(e, { name: name, furigana: furigana, email: email, telephone: telephone, content: content })
      }}
    >
      <IconArea path={'title-contact.svg'} width={320} height={56} />

      <InputArea value={name} text={'お名前'} redText={'※ 必須'} onChange={useStringChangeEvent(setName)} />
      <InputArea value={furigana} text={'フリガナ'} redText={'※ 必須'} onChange={useStringChangeEvent(setFurigana)} />
      <InputArea value={email} text={'メールアドレス'} redText={'※ 必須'} onChange={useStringChangeEvent(setEmail)} />
      <InputArea value={telephone} text={'お電話番号'} onChange={useStringChangeEvent(setTelephone)} />

      <TextBox
        value={content}
        text={'お問い合わせ内容'}
        redText={'※ 必須'}
        onChange={useStringChangeEvent(setContent)}
      />

      <Button type={'submit'} text={'送信'} size={'sm'} value={'submit'} />
      {sent && <p>送信しました.</p>}
    </form>
  )
}

export default ContactForm
