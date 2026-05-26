type ContactContent = {
  name: string
  furigana: string
  email: string
  telephone: string
  textbox: string
}

export class ContactSubmitError extends Error {
  code?: string

  constructor(message: string, code?: string) {
    super(message)
    this.code = code
  }
}

export const handleSubmit = (content: ContactContent): Promise<boolean> => {
  return fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(content),
  }).then(async (response) => {
    const data = (await response.json().catch(() => ({}))) as { error?: string; message?: string }
    if (!response.ok) {
      throw new ContactSubmitError(
        data.message || '送信に失敗しました。しばらくしてから再度お試しください。',
        data.error
      )
    }
    return true
  })
}
