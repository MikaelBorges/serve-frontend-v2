import AdList from '../components/adList/adList'
import { config } from '../utils/config'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { CardType, AdsFetched } from '../types'
import type { GetServerSidePropsResult } from 'next'

const filters = [
  {
    title: 'Prix',
    type: 'text',
    childs: ['min', 'max']
  },
  {
    title: 'Lieu',
    type: 'text',
    childs: ['ville']
  },
  {
    title: 'Super user',
    type: 'radio',
    childs: ['oui', 'non']
  },
  {
    title: 'Avec photos seulement',
    type: 'radio',
    childs: ['oui', 'non']
  },
  {
    title: 'Note',
    type: 'radio',
    childs: ['1', '2', '3', '4', '5']
  }
]

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<AdsFetched>
> {
  const data: CardType[] = await fetch(config.api_url).then((r) => r.json())
  return {
    props: {
      adsFetched: data
    }
  }
}

export default function Home({ adsFetched }: AdsFetched): JSX.Element {
  const { data, isLoading, isError } = useQuery(
    ['allAds'],
    () => {
      return axios(config.api_url) as any
    },
    {
      initialData: {
        data: adsFetched
      }
    }
  )

  const { allAds } = data.data

  return (
    <>
      {/* {filters.length && (
        <aside className='bg-gray-700'>
          <h2 className='font-bold'>Filtres :</h2>
          <ul>
            {filters.map(({ title }, index) => (
              <li key={index}>{title}</li>
            ))}
          </ul>
        </aside>
      )} */}

      <h1 className='mb-2'>
        {isError
          ? 'Erreur dans la récupération des annonces'
          : isLoading
          ? 'Chargement...'
          : allAds.length
          ? 'Toutes les annonces'
          : 'Aucune annonces'}
      </h1>

      {Boolean(allAds.length) && <AdList ads={allAds} />}
    </>
  )
}
