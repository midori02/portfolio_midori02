import { FC } from 'react'
import Head from 'next/head'
import { Header, Footer } from 'components/organisms'
import styles from 'styles/components/layout/layout.module.scss'
import { Spacer } from 'components/atoms/Spacer'

type Props = {
  pageTitle: string
}

const Layout: FC<Props> = (props) => {
  const { pageTitle, children } = props

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Header />
      <Spacer size={'lg_h'} />
      <main className={styles.layout}>{children}</main>
      <Footer />
      <Spacer size={'sm_h'} />
    </>
  )
}

export default Layout
