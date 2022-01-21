import { FC, useState, memo } from 'react'

import { ImageArea, IconArea } from 'components/atoms/Images'
import { useAtom } from 'jotai'
import { cursorActive } from 'contexts/CursorContext'
import { ContentType } from 'types/content'
import styles from 'styles/components/molecules/works_card.module.scss'

type Props = {
  content: ContentType
  works: string
}
const WorksCard: FC<Props> = (props) => {
  const { content, works } = props
  const [modal, setModal] = useState<boolean>(false)
  const [_, setCursorHover] = useAtom(cursorActive)

  return (
    <div className={styles.works_card}>
      <div
        className={styles.works_card__content}
        onClick={() => setModal(true)}
        onMouseEnter={() => setCursorHover(true)}
        onMouseLeave={() => setCursorHover(false)}
      >
        <ImageArea path={content.image[0].path} width={336} height={204} />
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
            <div
              className={styles.modal__close}
              onClick={() => setModal(false)}
              onMouseEnter={() => setCursorHover(true)}
              onMouseLeave={() => setCursorHover(false)}
            >
              <div className={styles.modal__close_bar}></div>
              <div className={styles.modal__close_bar}></div>
            </div>
            <div className={styles.modal__inner}>
              <div className={styles.modal__inner_banner}>
                <ImageArea path={content.image[0].path} width={800} height={500} />
              </div>
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
                {/(websites|apps|lps)/.test(works) && (
                  <div
                    className={styles.modal__inner_contents_link}
                    onMouseEnter={() => setCursorHover(true)}
                    onMouseLeave={() => setCursorHover(false)}
                  >
                    <IconArea
                      onClick={() => window.open(`${content.url}`, '_blank', 'noopener noreferrer')}
                      path={'/open_in_new.svg'}
                      width={24}
                      height={24}
                    />
                    <p>go to link</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WorksCard
