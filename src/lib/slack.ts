export const handleSubmit = (content): Promise<boolean | undefined> => {
  return new Promise((resolve, reject) => {
    const url = process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        text: `お問い合わせがありました\nお名前：${content.name} \nフリガナ:${content.furigana}\nEmail：${content.email}\nPhone Number：${content.telephone}\nContent： ${content.textbox}`,
      }),
    })
      .then((response) => {
        if (response.ok) {
          resolve(true)
        } else {
          console.error(response.status, response.statusText)
          reject(undefined)
        }
      })
      .catch((error) => {
        console.error(error)
        reject(undefined)
      })
  })
}
