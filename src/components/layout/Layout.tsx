import { FC } from 'react'
import Head from 'next/head'
import { Header, Footer } from 'components/organisms'
import { Spacer } from 'components/atoms/Spacer'
import { NextSeo } from 'next-seo'
import styles from 'styles/components/layout/layout.module.scss'

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
      <NextSeo
        openGraph={{
          type: 'website',
          url: 'https://portfolio-midori02-bbzgoecva-midori02.vercel.app/',
          title: 'midori02',
          description: "This Page is midori02's portfolio...",
          images: [
            {
              url: 'top-page-image.png',
              width: 800,
              height: 600,
              alt: 'Og Image Alt',
            },
          ],
        }}
      />
      <Header />
      <Spacer size={'lg_h'} />
      <main className={styles.layout}>{children}</main>
      <Footer />
      <Spacer size={'sm_h'} />
    </>
  )
}

export default Layout
