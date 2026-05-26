import type { NextApiRequest, NextApiResponse } from 'next'

import { checkContactRateLimit, getClientIp } from 'lib/contactRateLimit'
import { ContactMailError, sendContactMail } from 'lib/mail'

type ContactBody = {
  name?: string
  furigana?: string
  email?: string
  telephone?: string
  textbox?: string
  /** ボット用ハニーポット（入力があれば送信しない） */
  website?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, furigana, email, telephone, textbox, website } = req.body as ContactBody

  if (website?.trim()) {
    return res.status(200).json({ ok: true })
  }

  const ip = getClientIp(req.headers['x-forwarded-for'])
  const rate = checkContactRateLimit(ip)
  if (rate.allowed === false) {
    res.setHeader('Retry-After', String(rate.retryAfterSec))
    const message =
      rate.reason === 'hourly_limit'
        ? '送信回数の上限に達しました。しばらくしてから再度お試しください。'
        : `送信が早すぎます。${rate.retryAfterSec}秒後に再度お試しください。`
    return res.status(429).json({ error: 'rate_limited', message, retryAfterSec: rate.retryAfterSec })
  }

  if (!name?.trim() || !email?.trim() || !textbox?.trim()) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    await sendContactMail({
      name: name.trim(),
      furigana: furigana?.trim() ?? '',
      email: email.trim(),
      telephone: telephone?.trim() ?? '',
      textbox: textbox.trim(),
    })
    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error(error)

    if (error instanceof ContactMailError) {
      const status = error.code === 'not_configured' ? 503 : 500
      return res.status(status).json({ error: error.code, message: error.message })
    }

    return res.status(500).json({
      error: 'send_failed',
      message: '送信に失敗しました。しばらくしてから再度お試しください。',
    })
  }
}
