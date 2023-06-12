import { useContext } from 'react'
import { UserContext } from '../../../contexts/userContext/userContext'
import { useRouter } from 'next/router'
import AdList from '../../../components/adList/adList'
import Link from 'next/link'
import { config } from '../../../utils/config'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import type { GetServerSidePropsResult } from 'next'
import Overlay from '../../../layout/overlay/overlay'

export async function getServerSideProps({
  params
}): Promise<GetServerSidePropsResult<unknown>> {
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

export default function UserPage({ userAdsFetched }): JSX.Element {
  const userPageFirstname = userAdsFetched.userFirstname
  const hour = new Date().getHours()
  const router = useRouter()
  const userIdRoute = router.query.userId
  const userCtx = useContext(UserContext)
  const userFirstname = userCtx.user?.firstname
  const userId = userCtx.user?._id
  //const { userId, userFirstname } = userCtx
  //const userFirstname = 'John'
  //const userId = '62fc16903edbb27f94be99cf'

  const { data, isLoading, isError } = useQuery(
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

  const { userAds } = data.data

  const handleLogout = async () => {
    await axios.post(`${config.api_url}/user/logout`)
    localStorage.removeItem('userStorage')
    userCtx.setUser(null)
    router.push('/')
  }

  return (
    <>
      {userIdRoute === userId && (
        <aside>
          <h2>
            {hour > 6 && hour < 20 ? 'Bonjour' : 'Bonsoir'} {userFirstname}
          </h2>
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
      <h1 className='mb-2'>
        {isLoading
          ? 'Chargement...'
          : userCtx.user === null
          ? ''
          : userAds.length
          ? userIdRoute === userId
            ? 'Voici vos annonces'
            : `Annonces de ${userPageFirstname}`
          : userIdRoute === userId
          ? "Vous n'avez aucune annonce"
          : "L'utilisateur n'a aucune annonce"}
      </h1>
      {Boolean(userAds.length) && <AdList ads={userAds} />}
      {isError && (
        <Overlay
          message={{
            text: "Erreur l'utilisateur n'existe plus",
            color: 'text-red-500'
          }}
          link={{
            text: "cliquez ici pour revenir à la page d'accueil",
            url: '/'
          }}
        />
      )}
    </>
  )
}
