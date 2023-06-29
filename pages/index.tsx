import { CardList } from '../components/cardList/cardList'
import { config } from '../utils/config'
import { useQuery } from '@tanstack/react-query'
import { AdsFetched } from '../types'
import type { GetServerSideProps } from 'next'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

export const getServerSideProps: GetServerSideProps = async () => {
  const data: AdsFetched = await fetch(config.api_url).then((r) => r.json())
  return {
    props: {
      adsFetched: data
    }
  }
}

// Typer le useQuery
export default function HomePage({ adsFetched }: AdsFetched) {
  const { data, isError } = useQuery(
    ['allAds'],
    () => {
      return fetch(config.api_url).then((r) => r.json())
    },
    {
      initialData: adsFetched
    }
  )

  return (
    <section className='p-3'>
      {isError ? (
        <Alert variant='destructive'>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>Récupération des annonces impossible</AlertDescription>
        </Alert>
      ) : (
        <>
          <h1 className='text-3xl mb-6'>{data.allAds.length ? 'Toutes les annonces' : 'Aucune annonces'}</h1>
          {Boolean(data.allAds.length) && <CardList listAds={data.allAds} />}
        </>
      )}
    </section>
  )
}
