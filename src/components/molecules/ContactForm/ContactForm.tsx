import { FC } from 'react'

import { IconArea } from 'components/atoms/Images'
import { InputArea } from 'components/atoms/Texts'
import { contact } from 'lib/data'
import { Button } from 'components/atoms/Buttons'
import styles from 'styles/components/molecules/contact_form.module.scss'
import TextBox from 'components/atoms/Texts/TextBox'

const ContactForm: FC = () => {
  return (
    <div className={styles.contact_form}>
      <IconArea path={'title-contact.svg'} width={320} height={56} />
      {contact.map((item) => (
        <InputArea key={item.text} text={item.text} redText={item.redText} />
      ))}
      <TextBox text={'お問い合わせ内容'} redText={'※ 必須'} />

      <Button onClick={() => console.log('clicked')} text={'送信'} size={'sm'} />
    </div>
  )
}

export default ContactForm
