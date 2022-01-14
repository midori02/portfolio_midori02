import { FC } from 'react'

import { Spacer } from 'components/atoms/Spacer'
import { WorkPageContainer } from 'components/containers'
import { Stalker } from 'components/atoms/Stalker'
import { Footer } from 'components/organisms'

const Works: FC = () => {
  return (
    <>
      <Stalker />
      <WorkPageContainer />
      <Spacer size={'md_h'} />
      <Footer />
      <Spacer size={'sm_h'} />
    </>
  )
}

export default Works
