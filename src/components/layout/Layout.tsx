import { FC, useState } from 'react'
import Head from 'next/head'
import { Header, Footer } from 'components/organisms'
import { Spacer } from 'components/atoms/Spacer'
import { Stalker } from 'components/atoms/Stalker'
import { NextSeo } from 'next-seo'
import styles from 'styles/components/layout/layout.module.scss'

type Props = {
  pageTitle: string
}

const Layout: FC<Props> = (props) => {
  const { pageTitle, children } = props
  const [hovFlag, setHovFlag] = useState<boolean>(false)

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <title>{pageTitle}</title>
        <meta name="keywords" content="midori02, midori yabu, portfolio, design site" />
        <meta
          name="description"
          content="My name is midori02. At the beginning of May in 2021, I started to design websites..."
        />
      </Head>
      <NextSeo
        title="midori02--portfolio"
        description="This Page is midori02's portfolio..."
        openGraph={{
          type: 'website',
          url: 'https://www.midori02.com/',
          title: 'midori02',
          description: "This Page is midori02's portfolio...",
          images: [
            {
              url: 'https://i.imgur.com/eIFttvZ.png',
              width: 800,
              height: 600,
              alt: 'Og Image Alt',
            },
          ],
          profile: {
            firstName: 'midori02',
            username: 'midori02',
          },
        }}
      />
      <Stalker />
      <Header />
      <Spacer size={'lg_h'} />
      <main className={styles.layout}>{children}</main>
      <Footer />
      <Spacer size={'sm_h'} />
    </>
  )
}

export default Layout
