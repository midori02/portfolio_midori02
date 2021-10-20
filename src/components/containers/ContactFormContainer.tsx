import { FC, useState, useCallback } from 'react'

import { ContactForm } from 'components/molecules/ContactForm'

const ContactFormContainer: FC = () => {
  // content = {
  //  name: string,
  //  furigana: string,
  //  email: string
  //  phone: string,
  //  content: string
  // }
  const [sent, setSent] = useState<boolean>(false)

  const handleSubmit = (e, content) => {
    e.preventDefault()

    //入力されてない場合 -> return
    if (content === undefined) return

    fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        text: `お問い合わせがありました\nお名前：${content.name}\nEmail：${content.email}\nPhone Number：${content.telephone}\nContent： ${content.content}`,
      }),
    })
      .then(() => {
        setSent(true)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return <ContactForm handleSubmit={handleSubmit} sent={sent} />
}

export default ContactFormContainer
