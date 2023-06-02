import '../styles/globals.css'
import Layout from '../layout/layout'
import Head from 'next/head'
import { UserContextProvider } from '../store/user-context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

export default function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <Layout>
          <Head>
            <title>Serve</title>
            <meta name='description' content='Generated by create next app' />
            <link rel='icon' href='/favicon.ico' />
          </Head>
          <Component {...pageProps} />
          <ReactQueryDevtools />
        </Layout>
      </UserContextProvider>
    </QueryClientProvider>
  )
}
