const comments = async (req, res) => {
  const { text } = req.body

  if (typeof text === undefined) {
    res.writeHead(400).end('Invalid body: message')
  }

  if (req.method === 'POST') {
    // Slackのチャンネルにテキストを通知する
    const url = process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL

    await fetch(url, {
      method: 'POST',
      body: req.body,
    })
      .then((response) => {
        res.statusCode = 200
        res.end(JSON.stringify(response))
      })
      .catch((error) => {
        console.error(error)
        res.json(error)
        res.status(405).end
      })
  } else {
    // POST以外のメソッドは受け付けない
    res.writeHead(405).end('Method Not Allowed')
  }
}

export default comments
