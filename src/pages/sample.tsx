import { Button } from 'components/atoms/Buttons'
import { InputArea } from 'components/atoms/Texts'
import { Footer, Header } from 'components/organisms'
import { ContactForm } from 'components/molecules/ContactForm'
import { NextPage } from 'next'

const Sample: NextPage = () => {
  return (
    <>
      <ContactForm />
      <Footer />
    </>
  )
}

export default Sample
