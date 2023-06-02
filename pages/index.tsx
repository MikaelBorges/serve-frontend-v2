import AdList from '../components/adList/adList'
import { config } from '../utils/config'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

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

export default function Home({ allAds }) {
  /* const {
    data: {
      data: { ads }
    }
  } = useQuery(
    ['ads'],
    () => {
      return axios(config.api_url) as any
    },
    {
      initialData: {
        data: allAds
      }
    }
  ) */

  //console.log('allAds', allAds)
  //console.log('ads', ads)

  return (
    <>
      {/* {allAds.ads.map(({ _id, title }) => (
        <p key={_id}>{title}</p>
      ))} */}

      {filters.length && (
        <aside className='bg-gray-700'>
          <h2 className='font-bold'>Filtres :</h2>
          <ul>
            {filters.map(({ title }, index) => (
              <li key={index}>{title}</li>
            ))}
          </ul>
        </aside>
      )}
      <h1 className='my-2'>Toutes les annonces</h1>

      <AdList ads={allAds.ads} />
    </>
  )
}
