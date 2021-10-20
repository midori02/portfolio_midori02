import { Button } from 'components/atoms/Buttons'
import { InputArea } from 'components/atoms/Texts'
import { Footer, Header } from 'components/organisms'
import { ContactFormContainer } from 'components/containers'
import { NextPage } from 'next'

const Sample: NextPage = () => {
  return (
    <>
      <ContactFormContainer />
      <Footer />
    </>
  )
}

export default Sample
