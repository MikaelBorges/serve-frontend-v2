import Link from 'next/link'
import { useContext } from 'react'
import UserContext from '../store/user-context'

export default function Header() {
  const userCtx = useContext(UserContext)
  const { userId, userIsLogged } = userCtx

  return (
    <header className='flex justify-between bg-gray-700'>
      <Link href='/'>logo</Link>
      {userIsLogged !== null &&
        (userIsLogged ? (
          <Link href={`/user/${userId}`}>profil</Link>
        ) : (
          <Link href='/identity'>s&apos;identifier</Link>
        ))}
    </header>
  )
}
