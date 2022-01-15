import React, { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { BrowserRouter, Route } from 'react-router-dom'
import axios from 'axios'
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClient, QueryClientProvider } from 'react-query'
import { NextSeo } from 'next-seo'
import '../styles/globals.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
    },
  },
})

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      window.scrollTo(0, 0)
    })
  }, [])

  return (
    <QueryClientProvider client={queryClient} contextSharing>
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
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
export default MyApp
