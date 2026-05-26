import { FC, useState, useEffect, useRef } from 'react'

import { IconArea } from 'components/atoms/Images'
import { InputArea } from 'components/atoms/Texts'
import { Button } from 'components/atoms/Buttons'
import { useStringChangeEvent } from 'lib/customHooks'
import { handleSubmit, ContactSubmitError } from 'lib/contact'
import { isValidEmail, isValidFurigana, isValidTelephone } from 'lib/validation'
import styles from 'styles/components/molecules/contact_form.module.scss'

const SUBMIT_COOLDOWN_MS = 30_000

const ContactForm: FC = () => {
  const [sent, setSent] = useState<boolean>(false)
  const [name, setName] = useState('')
  const [furigana, setFurigana] = useState('')
  const [email, setEmail] = useState('')
  const [telephone, setTelephone] = useState('')
  const [textbox, setTextbox] = useState('')
  const [website, setWebsite] = useState('')
  const [error, setError] = useState('')
  const [sendError, setSendError] = useState('')
  const [sending, setSending] = useState(false)
  const [cooldownSec, setCooldownSec] = useState(0)
  const lastSubmitAtRef = useRef(0)
  const cooldownTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startCooldown = (seconds: number) => {
    const sec = Math.max(seconds, 1)
    setCooldownSec(sec)
    if (cooldownTimerRef.current) clearInterval(cooldownTimerRef.current)
    cooldownTimerRef.current = setInterval(() => {
      setCooldownSec((prev) => {
        if (prev <= 1) {
          if (cooldownTimerRef.current) clearInterval(cooldownTimerRef.current)
          cooldownTimerRef.current = null
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  useEffect(() => {
    return () => {
      if (cooldownTimerRef.current) clearInterval(cooldownTimerRef.current)
    }
  }, [])

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

    if (sending || cooldownSec > 0) {
      return false
    }

    const elapsed = Date.now() - lastSubmitAtRef.current
    if (lastSubmitAtRef.current > 0 && elapsed < SUBMIT_COOLDOWN_MS) {
      startCooldown(Math.ceil((SUBMIT_COOLDOWN_MS - elapsed) / 1000))
      setSendError(`送信が早すぎます。${Math.ceil((SUBMIT_COOLDOWN_MS - elapsed) / 1000)}秒後に再度お試しください。`)
      return false
    }

    if (!name) {
      setError('name')
      return false
    }
    if (furigana && !isValidFurigana(furigana)) {
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

    setSending(true)
    setSendError('')
    lastSubmitAtRef.current = Date.now()

    handleSubmit(content)
      .then(() => {
        setError('')
        setSent(true)
        startCooldown(Math.ceil(SUBMIT_COOLDOWN_MS / 1000))
      })
      .catch((err: ContactSubmitError) => {
        console.error(err)
        setSendError(err.message || '送信に失敗しました。しばらくしてから再度お試しください。')
        if (err.code === 'rate_limited' && err.retryAfterSec) {
          startCooldown(err.retryAfterSec)
        }
      })
      .finally(() => {
        setSending(false)
      })
  }

  return (
    <form
      id={'contact'}
      className={styles.contact_form}
      onSubmit={(e) => {
        handleClick(e, {
          name,
          furigana,
          email,
          telephone,
          textbox,
          website,
        })
      }}
    >
      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className={styles.contact_form__honeypot}
      />
      <IconArea path={'title-contact.svg'} width={280} height={48} />
      <InputArea
        value={name}
        isRequired
        text={'name'}
        onChange={useStringChangeEvent(setName)}
        isError={error === 'name' ? true : false}
        errorMessage={'※ お名前を入力してください。'}
      />
      <br />
      <InputArea
        value={furigana}
        text={'furigana'}
        onChange={useStringChangeEvent(setFurigana)}
        isError={error === 'furiganaValidation' ? true : false}
        errorMessage={'※ 正しい形式でフリガナを入力してください。'}
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
          error === 'email' ? '※ メールアドレスを入力してください' : '※正しい形式でメールアドレスを入力してください'
        }
      />
      <br />
      <InputArea
        value={telephone}
        text={'telephone'}
        type={'tel'}
        onChange={useStringChangeEvent(setTelephone)}
        isError={error === 'telephoneValidation' ? true : false}
        errorMessage={'※正しい形式で電話番号を入力してください'}
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
        errorMessage={'※ 内容を入力してください。'}
      />
      <br />
      <Button
        type={'submit'}
        text={sending ? 'sending...' : cooldownSec > 0 ? `wait ${cooldownSec}s` : 'send messege'}
        size={'lg'}
        value={'submit'}
        disabled={sent || sending || cooldownSec > 0}
      />
      {sendError && <p className={styles.contact_form__send_error}>{sendError}</p>}
      {sent && <p className={styles.contact_form__after_sent}>送信されました !</p>}
    </form>
  )
}

export default ContactForm
