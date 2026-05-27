import type { NextApiRequest } from 'next'

import {
  isValidEmail,
  isValidFurigana,
  isValidTelephone,
  stripHeaderUnsafe,
} from 'lib/validation'

export const CONTACT_FIELD_LIMITS = {
  name: 100,
  furigana: 100,
  email: 254,
  telephone: 20,
  textbox: 5000,
} as const

const DEFAULT_ALLOWED_ORIGINS = [
  'https://www.midori02.com',
  'https://midori02.com',
  'http://localhost:3000',
  'http://localhost:3001',
]

const LOCAL_DEV_ORIGIN = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/

const isAllowedOrigin = (origin: string, allowed: string[]): boolean => {
  if (allowed.includes(origin)) return true
  if (process.env.NODE_ENV !== 'production' && LOCAL_DEV_ORIGIN.test(origin)) return true
  return false
}

const getAllowedOrigins = (): string[] => {
  const extra = process.env.CONTACT_ALLOWED_ORIGINS?.split(',').map((o) => o.trim()).filter(Boolean)
  return extra?.length ? [...DEFAULT_ALLOWED_ORIGINS, ...extra] : DEFAULT_ALLOWED_ORIGINS
}

export type ContactInput = {
  name: string
  furigana: string
  email: string
  telephone: string
  textbox: string
}

export type ContactSecurityError = {
  status: 400 | 403 | 415
  code: string
  message: string
}

export const isJsonContentType = (req: NextApiRequest): boolean => {
  const contentType = req.headers['content-type'] ?? ''
  return contentType.includes('application/json')
}

export const validateContactOrigin = (req: NextApiRequest): ContactSecurityError | null => {
  const allowed = getAllowedOrigins()
  const origin = req.headers.origin

  if (origin) {
    if (!isAllowedOrigin(origin, allowed)) {
      return { status: 403, code: 'forbidden_origin', message: '送信元が許可されていません。' }
    }
    return null
  }

  const referer = req.headers.referer
  if (referer) {
    const allowedReferer = allowed.some((entry) => referer.startsWith(`${entry}/`) || referer === entry)
    const localDevReferer =
      process.env.NODE_ENV !== 'production' &&
      /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?\//.test(referer)
    if (!allowedReferer && !localDevReferer) {
      return { status: 403, code: 'forbidden_referer', message: '送信元が許可されていません。' }
    }
    return null
  }

  // Origin/Referer なし = curl 等。レート制限で抑止。
  return null
}

export const validateContactFetchMetadata = (req: NextApiRequest): ContactSecurityError | null => {
  const site = req.headers['sec-fetch-site']
  if (typeof site === 'string' && site === 'cross-site') {
    return { status: 403, code: 'cross_site', message: '送信元が許可されていません。' }
  }
  return null
}

export const validateContactPayload = (body: {
  name?: string
  furigana?: string
  email?: string
  telephone?: string
  textbox?: string
}): { ok: true; data: ContactInput } | { ok: false; error: ContactSecurityError } => {
  const name = stripHeaderUnsafe(body.name?.trim() ?? '')
  const furigana = stripHeaderUnsafe(body.furigana?.trim() ?? '')
  const email = stripHeaderUnsafe(body.email?.trim() ?? '')
  const telephone = stripHeaderUnsafe(body.telephone?.trim() ?? '')
  const textbox = (body.textbox ?? '').trim()

  if (!name || !email || !textbox) {
    return {
      ok: false,
      error: { status: 400, code: 'missing_fields', message: '必須項目が不足しています。' },
    }
  }

  if (name.length > CONTACT_FIELD_LIMITS.name) {
    return { ok: false, error: { status: 400, code: 'name_too_long', message: 'お名前が長すぎます。' } }
  }
  if (furigana.length > CONTACT_FIELD_LIMITS.furigana) {
    return { ok: false, error: { status: 400, code: 'furigana_too_long', message: 'フリガナが長すぎます。' } }
  }
  if (email.length > CONTACT_FIELD_LIMITS.email) {
    return { ok: false, error: { status: 400, code: 'email_too_long', message: 'メールアドレスが長すぎます。' } }
  }
  if (telephone.length > CONTACT_FIELD_LIMITS.telephone) {
    return { ok: false, error: { status: 400, code: 'telephone_too_long', message: '電話番号が長すぎます。' } }
  }
  if (textbox.length > CONTACT_FIELD_LIMITS.textbox) {
    return { ok: false, error: { status: 400, code: 'textbox_too_long', message: 'お問い合わせ内容が長すぎます。' } }
  }

  if (!isValidEmail(email)) {
    return { ok: false, error: { status: 400, code: 'invalid_email', message: 'メールアドレスの形式が正しくありません。' } }
  }
  if (furigana && !isValidFurigana(furigana)) {
    return { ok: false, error: { status: 400, code: 'invalid_furigana', message: 'フリガナの形式が正しくありません。' } }
  }
  if (telephone && !isValidTelephone(telephone)) {
    return { ok: false, error: { status: 400, code: 'invalid_telephone', message: '電話番号の形式が正しくありません。' } }
  }

  return { ok: true, data: { name, furigana, email, telephone, textbox } }
}

export const getContactRateLimitKey = (req: NextApiRequest, ip: string): string => {
  const ua = req.headers['user-agent'] ?? 'unknown'
  return `${ip}:${ua.slice(0, 120)}`
}
