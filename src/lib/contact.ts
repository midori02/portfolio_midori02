type ContactContent = {
  name: string
  furigana: string
  email: string
  telephone: string
  textbox: string
  website?: string
}

export class ContactSubmitError extends Error {
  code?: string
  retryAfterSec?: number

  constructor(message: string, code?: string, retryAfterSec?: number) {
    super(message)
    this.code = code
    this.retryAfterSec = retryAfterSec
  }
}

export const handleSubmit = (content: ContactContent): Promise<boolean> => {
  return fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    credentials: 'same-origin',
    body: JSON.stringify(content),
  }).then(async (response) => {
    const data = (await response.json().catch(() => ({}))) as {
      error?: string
      message?: string
      retryAfterSec?: number
    }
    if (!response.ok) {
      throw new ContactSubmitError(
        data.message || '送信に失敗しました。しばらくしてから再度お試しください。',
        data.error,
        data.retryAfterSec
      )
    }
    return true
  })
}
