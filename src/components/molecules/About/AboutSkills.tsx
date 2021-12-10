import { FC } from 'react'

import { skills } from 'lib/data'
import styles from 'styles/components/molecules/about_skills.module.scss'
import { SkillButton } from 'components/atoms/Buttons'

const AboutSkills: FC = () => {
  const categories = ['software', 'programming', 'others']
  const filter = (category: string) => {
    return skills.filter((skill) => skill.category === category)
  }
  return (
    <div className={styles.about_skills}>
      {categories.map((category) => {
        const skills = filter(category)
        return (
          <>
            <h5>{category}</h5>
            <div className={styles.about_skills__category}>
              {skills.map((skill) => (
                <SkillButton key={skill.skill} skill={skill.skill} level={skill.level} />
              ))}
            </div>
          </>
        )
      })}
    </div>
  )
}

export default AboutSkills
