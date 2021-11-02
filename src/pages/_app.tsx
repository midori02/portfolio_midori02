import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClient, QueryClientProvider } from 'react-query'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
export default MyApp
