import { NextPage } from 'next'

import { AboutContainer, WorksContainer } from 'components/containers'
import { ContactForm } from 'components/molecules/ContactForm'
import { Layout } from 'components/layout'
import { Spacer } from 'components/atoms/Spacer'
import { TopImage } from 'components/molecules/Top'

const Home: NextPage = () => {
  return (
    <Layout pageTitle={'/'}>
      <TopImage />
      <Spacer size={'lg_h'} />
      <Spacer size={'lg_h'} />
      <WorksContainer />
      <Spacer size={'lg_h'} />
      <AboutContainer />
      <Spacer size={'lg_h'} />
      <Spacer size={'lg_h'} />
      <ContactForm />
      <Spacer size={'md_h'} />
    </Layout>
  )
}

export default Home
