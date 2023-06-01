import AdList from '../components/adList/adList'
import { config } from '../utils/config'

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

export default function Home({ posts }) {
  return (
    <>
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

      {posts.length && <AdList ads={posts} />}
    </>
  )
}

export async function getStaticProps() {
  const posts = await fetch(config.api_url).then((r) => r.json())
  return {
    props: {
      posts
    }
  }
}
