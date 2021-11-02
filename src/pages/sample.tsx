import { Button } from 'components/atoms/Buttons'
import { InputArea } from 'components/atoms/Texts'
import { Footer, Header } from 'components/organisms'
import { ContactForm } from 'components/molecules/ContactForm'
import { NextPage } from 'next'
import { AboutContainer, WorksContainer } from 'components/containers'
import WorksLinkComponent from 'components/molecules/Link/ WorksLinkComponent '
import AutoSlideAnimation from 'components/molecules/Works/AutoSlideAnimation'

const Sample: NextPage = () => {
  return (
    <>
      <Header />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <WorksContainer />
    </>
  )
}

export default Sample
