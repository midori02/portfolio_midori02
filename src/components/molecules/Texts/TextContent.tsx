// text area + text title
import { FC } from 'react'

import { HistoryType } from 'types/content'
import styles from 'styles/components/molecules/text_content.module.scss'

type Props = {
  history: HistoryType
}
const TextContent: FC<Props> = (props) => {
  const { history } = props
  return (
    <li key={history.history_id} className={styles.text_content}>
      <div className={styles.text_content__period}>
        <p>{history.year}年</p>
        <p>{history.month}月</p>
      </div>
      <div className={styles.text_content__event}>
        <p>{history.event}</p>
      </div>
    </li>
  )
}

export default TextContent
