import { useContext } from 'react'
import UserContext from '../../../store/userContext'
import { useRouter } from 'next/router'
import AdList from '../../../components/adList/adList'
import Link from 'next/link'
import { config } from '../../../utils/config'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

export default function UserPage({ userAdsFetched }) {
  const userPageFirstname = userAdsFetched.userFirstname
  const hour = new Date().getHours()
  const router = useRouter()
  const userIdRoute = router.query.userId
  const userCtx = useContext(UserContext)
  const { userId, userFirstname } = userCtx

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

  const handleLogout = () => {
    userCtx.disconnectUser()
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
      <h1>
        {isLoading
          ? 'Chargement...'
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
        <div className='absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center'>
          <p className='p-10 bg-slate-500'>
            Erreur dans la récupération de l&apos;utilisateur
            <Link href={'/'}>
              <a className='underline block'>
                cliquer ici pour revenir à l&apos;acceuil
              </a>
            </Link>
          </p>
        </div>
      )}
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
