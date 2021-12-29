import { FC } from 'react'

import { Spacer } from 'components/atoms/Spacer'
import { WorkPageContainer } from 'components/containers'
import { Footer } from 'components/organisms'

const Works: FC = () => {
  return (
    <>
      <WorkPageContainer />
      <Spacer size={'md_h'} />
      <Footer />
      <Spacer size={'sm_h'} />
    </>
  )
}

export default Works
