import { FC, useState, memo } from 'react'

import { ImageArea } from 'components/atoms/Images'
import { ContentType } from 'types/content'
import styles from 'styles/components/molecules/works_card.module.scss'

type Props = {
  content: ContentType
}
const WorksCard: FC<Props> = (props) => {
  const { content } = props
  const [modal, setModal] = useState<boolean>(false)

  return (
    <div className={styles.works_card}>
      <div className={styles.works_card__content} onClick={() => setModal(true)}>
        <ImageArea path={content.image[0].path} width={200} height={200} />
        <h1>{content.title}</h1>
        <p>
          {content.period.start_year}.{content.period.start_month} ~ {content.period.end_year}.
          {content.period.end_month}
        </p>

        {content.skills.map((skill) => (
          <span>
            {skill}
            {content.skills.length > 1 && skill !== content.skills[content.skills.length - 1] && '/'}
          </span>
        ))}
      </div>
      {modal && (
        <div className={styles.modal}>
          <div className={styles.modal__container}>
            <div className={styles.modal__close} onClick={() => setModal(false)}>
              <div className={styles.modal__close_bar}></div>
              <div className={styles.modal__close_bar}></div>
            </div>
            <div className={styles.modal__inner}>
              <ImageArea path={content.image[0].path} width={200} height={200} />
              <div className={styles.modal__inner_contents}>
                <h1>{content.title}</h1>
                <p>
                  {content.period.start_year}.{content.period.start_month} ~ {content.period.end_year}.
                  {content.period.end_month}
                </p>
                {content.skills.map((skill) => (
                  <span>
                    {skill}
                    {content.skills.length > 1 && skill !== content.skills[content.skills.length - 1] && '/'}
                  </span>
                ))}
                <p>{content.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WorksCard
