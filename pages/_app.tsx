import 'styles/tailwind.css'
import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        staleTime: 60 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
      },
    },
  })
  return (
    <QueryClientProvider client={queryClient}>
      <NextNProgress color="#6366f1" />
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default MyApp
