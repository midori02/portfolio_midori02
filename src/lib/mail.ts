import nodemailer from 'nodemailer'

import { CONTACT_TO_EMAIL } from 'lib/constants'

type ContactPayload = {
  name: string
  furigana: string
  email: string
  telephone: string
  textbox: string
}

export class ContactMailError extends Error {
  code: 'not_configured' | 'send_failed'

  constructor(code: ContactMailError['code'], message: string) {
    super(message)
    this.code = code
  }
}

const getSmtpConfig = () => {
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || 587)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS?.trim()
  const to = process.env.CONTACT_TO_EMAIL || CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL || user

  if (!host || !user || !pass || !from) {
    return null
  }

  return { host, port, user, pass, to, from }
}

export const isMailConfigured = (): boolean => getSmtpConfig() !== null

export const sendContactMail = async (payload: ContactPayload): Promise<void> => {
  const config = getSmtpConfig()
  if (!config) {
    throw new ContactMailError('not_configured', 'メール送信の設定が未完了です。')
  }

  const { host, port, user, pass, to, from } = config
  const { name, furigana, email, telephone, textbox } = payload

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })

  const body = [
    'ポートフォリオサイトからお問い合わせがありました。',
    '',
    `お名前：${name}`,
    `フリガナ：${furigana || '（未入力）'}`,
    `Email：${email}`,
    `電話番号：${telephone || '（未入力）'}`,
    '',
    '--- お問い合わせ内容 ---',
    textbox,
  ].join('\n')

  try {
    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject: `【midori02 portfolio】お問い合わせ from ${name}`,
      text: body,
    })
  } catch (error) {
    console.error('SMTP send failed:', error)
    throw new ContactMailError('send_failed', 'メールの送信に失敗しました。')
  }
}
