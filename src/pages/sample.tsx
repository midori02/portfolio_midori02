import { Button } from 'components/atoms/Buttons'
import { InputArea } from 'components/atoms/Texts'
import { ContactForm } from 'components/molecules/ContactForm'
import { Footer, Header } from 'components/organisms'
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
