import { VFC } from 'react'
import styles from 'styles/components/atoms/button.module.scss'
type Props = {
  skill: string
  level: string
}
const SkillButton: VFC<Props> = (props) => {
  const { skill, level } = props
  return (
    <div className={styles.button__skill}>
      <p>{skill}</p>
      <div className={styles.button__skill_tooltip}>{level}</div>
    </div>
  )
}

export default SkillButton
