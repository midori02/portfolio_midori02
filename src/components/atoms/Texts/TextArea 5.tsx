import { VFC } from 'react'

type Props = {
  text: string
}
const TextArea: VFC<Props> = (props) => {
  const { text } = props

  return <p>{text}</p>
}

export default TextArea
