import { useContext } from 'react'
import UserContext from '../../../store/user-context'
import { useRouter } from 'next/router'
import AdList from '../../../components/adList/adList'
import Link from 'next/link'
import { config } from '../../../utils/config'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

export default function UserPage({ userAdsFetched }) {
  const router = useRouter()
  const userIdRoute = router.query.userId
  const userCtx = useContext(UserContext)
  const { userId } = userCtx

  const {
    data: {
      data: { userAds }
    }
  } = useQuery(
    ['userAds', userIdRoute],
    () => {
      return axios(`${config.api_url}/user/${userIdRoute}`) as any
    },
    {
      initialData: {
        data: userAdsFetched
      }
    }
  )

  console.log('userAds', userAds)

  const handleLogout = () => {
    userCtx.disconnectUser()
  }

  return (
    <>
      {userIdRoute === userId && (
        <aside>
          <h1>Bonjour utilisateur</h1>
          <ul className='flex justify-between'>
            <li className='text-orange-400'>
              <Link href={`/user/${userId}/settings`}>Modifier mon compte</Link>
            </li>
            <li>
              <button className='text-red-500' onClick={() => handleLogout()}>
                se déconnecter
              </button>
            </li>
          </ul>
        </aside>
      )}
      <h2>
        {userAds.length
          ? "Annonces de l'utilisateur"
          : "L'utilisateur n'a aucune annonce"}
      </h2>
      {Boolean(userAds.length) && <AdList ads={userAds} />}
    </>
  )
}

export async function getServerSideProps({ params }) {
  const data = await fetch(`${config.api_url}/user/${params.userId}`).then(
    (r) => r.json()
  )
  if (!data) {
    return {
      notFound: true
    }
  }
  return {
    props: {
      userAdsFetched: data
    }
  }
}
