import type { NextApiRequest, NextApiResponse } from 'next'

import { ContactMailError, sendContactMail } from 'lib/mail'

type ContactBody = {
  name?: string
  furigana?: string
  email?: string
  telephone?: string
  textbox?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, furigana, email, telephone, textbox } = req.body as ContactBody
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
