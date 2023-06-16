import { useContext } from 'react'
import { UserContext } from '../../../contexts/userContext/userContext'
import { useRouter } from 'next/router'
import CardList from '../../../components/cardList/cardList'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { config } from '../../../utils/config'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import type { GetServerSidePropsResult } from 'next'
import { telescopeIcon, lightIcon } from '@/assets/icons/icons'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

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
      {isError ? (
        <Alert variant='destructive'>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>
            L&apos;utilisateur n&apos;existe plus
          </AlertDescription>
        </Alert>
      ) : (
        <div>
          {userIdRoute === userId && (
            <aside>
              <h2 className='text-2xl mb-6'>
                {hour > 6 && hour < 20 ? 'Bonjour' : 'Bonsoir'} {userFirstname}{' '}
                {hour > 6 && hour < 20 ? lightIcon : telescopeIcon}
              </h2>
              <Link href={`/user/${userId}/settings`}>
                <a className='mb-6 inline-flex items-center justify-center bg-black text-white dark:bg-slate-200 dark:text-black h-10 py-2 px-4 rounded-full text-lg dark:hover:bg-slate-300'>
                  Modifier mon compte
                </a>
              </Link>
            </aside>
          )}
          <h1 className='text-3xl'>
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
          {Boolean(userAds.length) && <CardList ads={userAds} />}
          {userIdRoute === userId && (
            <div className='flex justify-end'>
              <Button
                size='sm'
                variant='warnDestructive'
                onClick={() => handleLogout()}
              >
                Se déconnecter
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  )
}
