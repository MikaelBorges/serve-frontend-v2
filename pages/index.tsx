import { CardList } from '../components/cardList/cardList'
import { config } from '../utils/config'
import { useQuery } from '@tanstack/react-query'
import { AdsFetched } from '../types'
import type { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async () => {
  const data: AdsFetched = await fetch(config.api_url).then((r) => r.json())
  return {
    props: {
      adsFetched: data
    }
  }
}

// Typer le useQuery
export default function Home({ adsFetched }: AdsFetched) {
  const { data, isLoading, isError } = useQuery(
    ['allAds'],
    () => {
      return fetch(config.api_url).then((r) => r.json())
    },
    {
      initialData: adsFetched
    }
  )

  const voitures = [
    {
      marque: 'ford',
      modele: 'mustang',
      passagers: ['mika', 'ornella', 'papa']
    },
    {
      marque: 'opel',
      modele: 'astra',
      passagers: ['pierre', 'paul', 'jack']
    }
  ]

  return (
    <>
      <h1 className='text-3xl'>
        {isError
          ? 'Erreur dans la récupération des annonces'
          : isLoading
          ? 'Chargement...'
          : data.allAds.length
          ? 'Toutes les annonces'
          : 'Aucune annonces'}
      </h1>

      {Boolean(data.allAds.length) && <CardList listAds={data.allAds} />}
    </>
  )
}
