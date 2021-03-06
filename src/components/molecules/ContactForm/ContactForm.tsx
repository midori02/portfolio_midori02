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
      <IconArea path={'title-contact.svg'} width={280} height={48} />
      <InputArea
        value={name}
        isRequired
        text={'name'}
        onChange={useStringChangeEvent(setName)}
        isError={error === 'name' ? true : false}
        errorMessage={'??? ???????????????????????????????????????'}
      />
      <br />
      <InputArea
        value={furigana}
        isRequired
        text={'furigana'}
        onChange={useStringChangeEvent(setFurigana)}
        isError={error === 'furigana' || error === 'furiganaValidation' ? true : false}
        errorMessage={
          error === 'furigana' ? '??? ??????????????????????????????????????????' : '??? ????????????????????????????????????????????????????????????'
        }
      />
      <br />
      <InputArea
        value={email}
        isRequired
        text={'email'}
        type={'email'}
        onChange={useStringChangeEvent(setEmail)}
        isError={error === 'email' || error === 'emailValidation' ? true : false}
        errorMessage={
          error === 'email' ? '??? ????????????????????????????????????????????????' : '?????????????????????????????????????????????????????????????????????'
        }
      />
      <br />
      <InputArea
        value={telephone}
        text={'telephone'}
        type={'tel'}
        onChange={useStringChangeEvent(setTelephone)}
        isError={error === 'telephoneValidation' ? true : false}
        errorMessage={'????????????????????????????????????????????????????????????'}
      />
      <br />
      <InputArea
        value={textbox}
        text={'textbox'}
        multiLine
        rows={10}
        isRequired
        onChange={useStringChangeEvent(setTextbox)}
        isError={error === 'textbox' ? true : false}
        errorMessage={'??? ????????????????????????????????????'}
      />
      <br />
      <Button type={'submit'} text={'send messege'} size={'lg'} value={'submit'} disabled={sent === true} />
      {sent && <p className={styles.contact_form__after_sent}>????????????????????? !</p>}
    </form>
  )
}

export default ContactForm
